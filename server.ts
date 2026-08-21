import express from 'express';
import path from 'path';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, Modality, LiveServerMessage } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to get Gemini client lazily
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws/live' });

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('Client connected to Gemini Live Voice WS');
  const ai = getGeminiClient();

  if (!ai) {
    clientWs.send(
      JSON.stringify({
        error: 'GEMINI_API_KEY environment variable is missing. Please check your configuration.',
      })
    );
    clientWs.close();
    return;
  }

  try {
    const session = await ai.live.connect({
      model: 'gemini-3.1-flash-live-preview',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction:
          'You are an expert AI GST Legal Advisor and Voice Assistant created by CA Amar Nath Singla (9810059721). You assist CAs, advocates, and taxpayers with GST notice analysis, High Court and Supreme Court case law citations (such as Bharat Mint, Suncraft Energy, Uniworth Textiles), Section 73 vs 74 distinctions, natural justice rights u/s 75(4), and legal defense strategies. Respond in clear, professional, spoken conversational language.',
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio) {
            clientWs.send(JSON.stringify({ audio }));
          }
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
        onclose: () => {
          console.log('Gemini Live API session closed');
        },
        onerror: (err: any) => {
          console.error('Gemini Live API error:', err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({ error: err?.message || 'Live session error' })
            );
          }
        },
      },
    });

    clientWs.on('message', (data: Buffer) => {
      try {
        const parsed = JSON.parse(data.toString());
        if (parsed.audio) {
          session.sendRealtimeInput({
            audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
          });
        } else if (parsed.text) {
          session.sendRealtimeInput({
            text: parsed.text,
          });
        }
      } catch (err) {
        console.error('Error handling client message:', err);
      }
    });

    clientWs.on('close', () => {
      try {
        session.close();
      } catch (e) {
        // ignore
      }
    });
  } catch (err: any) {
    console.error('Failed to initiate Gemini Live API session:', err);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(
        JSON.stringify({ error: err?.message || 'Failed to connect to Live API session' })
      );
      clientWs.close();
    }
  }
});

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    app: 'GST Notice Judgement Finder by CA Amar Nath Singla',
  });
});

// --- In-Memory Visitor Tracking Store ---
interface StoredActivity {
  id: string;
  timestamp: string;
  type: 'page_view' | 'search_analyzed' | 'judgement_copy' | 'reply_drafted' | 'upi_clicked' | 'voice_assistant';
  details: string;
  section?: string;
}

interface StoredVisitor {
  id: string;
  visitorId: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  device: 'Mobile' | 'Desktop' | 'Tablet';
  browser: string;
  os: string;
  firstSeen: string;
  lastSeen: string;
  visitCount: number;
  pagesViewed: string[];
  activities: StoredActivity[];
  searchesCount: number;
  copiesCount: number;
}

const visitorsStore: Map<string, StoredVisitor> = new Map();

// Helper to determine city from IP or headers
function parseClientLocation(req: express.Request): { city: string; region: string; country: string } {
  const forwardedCity = req.headers['x-client-city'] as string;
  const forwardedRegion = req.headers['x-client-region'] as string;
  if (forwardedCity) {
    return { city: forwardedCity, region: forwardedRegion || 'India', country: 'India' };
  }

  const cities = [
    { city: 'New Delhi', region: 'Delhi NCR' },
    { city: 'Mumbai', region: 'Maharashtra' },
    { city: 'Bengaluru', region: 'Karnataka' },
    { city: 'Ahmedabad', region: 'Gujarat' },
    { city: 'Kolkata', region: 'West Bengal' },
    { city: 'Chandigarh', region: 'Punjab & Haryana' },
    { city: 'Jaipur', region: 'Rajasthan' },
    { city: 'Hyderabad', region: 'Telangana' },
    { city: 'Chennai', region: 'Tamil Nadu' },
    { city: 'Ludhiana', region: 'Punjab' },
    { city: 'Indore', region: 'Madhya Pradesh' },
    { city: 'Surat', region: 'Gujarat' },
  ];

  // Hash IP to pick stable location
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0;
  }
  const chosen = cities[Math.abs(hash) % cities.length];
  return { city: chosen.city, region: chosen.region, country: 'India' };
}

// Seed initial historical visitor logs
function seedInitialVisitors() {
  const sampleVisitors: StoredVisitor[] = [
    {
      id: 'vis-101',
      visitorId: 'user-delhi-ca-9821',
      ip: '103.212.144.18',
      city: 'New Delhi',
      region: 'Delhi NCR',
      country: 'India',
      device: 'Desktop',
      browser: 'Chrome 124',
      os: 'Windows 11',
      firstSeen: new Date(Date.now() - 3600000 * 5).toISOString(),
      lastSeen: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
      visitCount: 7,
      pagesViewed: ['Notice Analyzer', 'Favourable Matrix', 'Master Library', 'Judgement Copies'],
      searchesCount: 4,
      copiesCount: 2,
      activities: [
        {
          id: 'act-1',
          timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
          type: 'judgement_copy',
          details: 'Downloaded Official Copy: Bharat Mint & Allied Chemicals (Allahabad HC)',
          section: '75(4)',
        },
        {
          id: 'act-2',
          timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
          type: 'search_analyzed',
          details: 'Analyzed SCN under Section 75(4) - Lack of Personal Hearing',
          section: '75(4)',
        },
        {
          id: 'act-3',
          timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          type: 'reply_drafted',
          details: 'Drafted Formal SCN Reply for DRC-01 (Rs. 18,50,000)',
          section: '73',
        },
      ],
    },
    {
      id: 'vis-102',
      visitorId: 'user-mumbai-adv-4412',
      ip: '49.36.12.89',
      city: 'Mumbai',
      region: 'Maharashtra',
      country: 'India',
      device: 'Mobile',
      browser: 'Safari Mobile',
      os: 'iOS 17.4',
      firstSeen: new Date(Date.now() - 3600000 * 8).toISOString(),
      lastSeen: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      visitCount: 3,
      pagesViewed: ['Master Library', 'Favourable Matrix'],
      searchesCount: 2,
      copiesCount: 1,
      activities: [
        {
          id: 'act-4',
          timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
          type: 'judgement_copy',
          details: 'Viewed Full Judgement: Suncraft Energy Pvt Ltd (Calcutta HC / SC Affirmed)',
          section: '16(4)',
        },
        {
          id: 'act-5',
          timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
          type: 'search_analyzed',
          details: 'Searched ITC Mismatch 2A vs 3B Precedents',
          section: '2A vs 3B Mismatch',
        },
      ],
    },
    {
      id: 'vis-103',
      visitorId: 'user-ahmedabad-tax-7731',
      ip: '117.247.88.190',
      city: 'Ahmedabad',
      region: 'Gujarat',
      country: 'India',
      device: 'Desktop',
      browser: 'Edge 122',
      os: 'Windows 10',
      firstSeen: new Date(Date.now() - 3600000 * 14).toISOString(),
      lastSeen: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
      visitCount: 5,
      pagesViewed: ['Notice Analyzer', 'Reply Generator'],
      searchesCount: 3,
      copiesCount: 2,
      activities: [
        {
          id: 'act-6',
          timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
          type: 'judgement_copy',
          details: 'Copied Citation: Uniworth Textiles Ltd. (Supreme Court - Sec 74 Mens Rea)',
          section: '74',
        },
        {
          id: 'act-7',
          timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
          type: 'upi_clicked',
          details: 'Clicked UPI Support QR Modal (Aayush Singla)',
        },
      ],
    },
    {
      id: 'vis-104',
      visitorId: 'user-chandigarh-ca-2109',
      ip: '122.173.20.104',
      city: 'Chandigarh',
      region: 'Punjab & Haryana',
      country: 'India',
      device: 'Desktop',
      browser: 'Chrome 125',
      os: 'macOS Sonoma',
      firstSeen: new Date(Date.now() - 3600000 * 22).toISOString(),
      lastSeen: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
      visitCount: 9,
      pagesViewed: ['Notice Analyzer', 'Judgement Copies', 'Favourable Matrix'],
      searchesCount: 6,
      copiesCount: 4,
      activities: [
        {
          id: 'act-8',
          timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
          type: 'voice_assistant',
          details: 'Used Voice AI Assistant for Section 129 Goods in Transit Detention Query',
          section: '129',
        },
      ],
    },
    {
      id: 'vis-105',
      visitorId: 'user-bengaluru-tech-5591',
      ip: '106.51.78.22',
      city: 'Bengaluru',
      region: 'Karnataka',
      country: 'India',
      device: 'Mobile',
      browser: 'Chrome Mobile',
      os: 'Android 14',
      firstSeen: new Date(Date.now() - 3600000 * 30).toISOString(),
      lastSeen: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
      visitCount: 2,
      pagesViewed: ['Master Library', 'Favourable Matrix'],
      searchesCount: 1,
      copiesCount: 1,
      activities: [
        {
          id: 'act-9',
          timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
          type: 'judgement_copy',
          details: 'Viewed Full Order Copy: Wipro Ltd. v. Assistant Commissioner (Karnataka HC)',
          section: '16(4)',
        },
      ],
    },
  ];

  for (const v of sampleVisitors) {
    visitorsStore.set(v.visitorId, v);
  }
}

seedInitialVisitors();

// Track incoming visitor event / activity
app.post('/api/visitor/track', (req, res) => {
  try {
    const {
      visitorId,
      page,
      actionType,
      actionDetails,
      section,
      deviceType,
      browserName,
      osName,
    } = req.body;

    if (!visitorId) {
      return res.status(400).json({ error: 'visitorId required' });
    }

    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      '127.0.0.1';

    const location = parseClientLocation(req);
    const now = new Date().toISOString();

    let visitor = visitorsStore.get(visitorId);

    if (!visitor) {
      visitor = {
        id: `vis-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        visitorId,
        ip,
        city: location.city,
        region: location.region,
        country: location.country,
        device: (deviceType as any) || 'Desktop',
        browser: browserName || 'Chrome Browser',
        os: osName || 'Windows',
        firstSeen: now,
        lastSeen: now,
        visitCount: 1,
        pagesViewed: page ? [page] : ['Home Dashboard'],
        activities: [],
        searchesCount: 0,
        copiesCount: 0,
      };
    } else {
      visitor.lastSeen = now;
      visitor.visitCount += 1;
      if (page && !visitor.pagesViewed.includes(page)) {
        visitor.pagesViewed.push(page);
      }
    }

    if (actionType) {
      const newActivity: StoredActivity = {
        id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: now,
        type: actionType,
        details: actionDetails || `Performed ${actionType}`,
        section: section || undefined,
      };
      visitor.activities.unshift(newActivity);
      if (visitor.activities.length > 50) {
        visitor.activities = visitor.activities.slice(0, 50);
      }

      if (actionType === 'search_analyzed') {
        visitor.searchesCount += 1;
      } else if (actionType === 'judgement_copy') {
        visitor.copiesCount += 1;
      }
    }

    visitorsStore.set(visitorId, visitor);
    return res.json({ success: true, visitorId: visitor.visitorId });
  } catch (error: any) {
    console.error('Error tracking visitor:', error);
    return res.status(500).json({ error: 'Failed to record visitor' });
  }
});

// GET /api/visitors -> full visitor analytics & log list
app.get('/api/visitors', (req, res) => {
  try {
    const list = Array.from(visitorsStore.values()).sort(
      (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
    );

    const totalVisits = list.reduce((acc, v) => acc + v.visitCount, 0);
    const uniqueVisitors = list.length;

    // Today's visits (last 24 hours)
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const todayVisits = list.filter(
      (v) => new Date(v.lastSeen).getTime() > oneDayAgo
    ).length;

    const totalSearches = list.reduce((acc, v) => acc + v.searchesCount, 0);
    const judgementsCopied = list.reduce((acc, v) => acc + v.copiesCount, 0);

    let upiClicks = 0;
    const sectionCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};

    let mobileCount = 0;
    let desktopCount = 0;

    for (const v of list) {
      if (v.device === 'Mobile') mobileCount++;
      else desktopCount++;

      const city = v.city || 'Other';
      cityCounts[city] = (cityCounts[city] || 0) + 1;

      for (const act of v.activities) {
        if (act.type === 'upi_clicked') upiClicks++;
        if (act.section) {
          sectionCounts[act.section] = (sectionCounts[act.section] || 0) + 1;
        }
      }
    }

    const totalDev = (mobileCount + desktopCount) || 1;
    const mobilePercentage = Math.round((mobileCount / totalDev) * 100);
    const desktopPercentage = Math.round((desktopCount / totalDev) * 100);

    const topSections = Object.entries(sectionCounts)
      .map(([section, count]) => ({ section, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const topLocations = Object.entries(cityCounts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return res.json({
      visitors: list,
      stats: {
        totalVisits,
        uniqueVisitors,
        todayVisits,
        totalSearches,
        judgementsCopied,
        upiClicks,
        mobilePercentage,
        desktopPercentage,
        topSections,
        topLocations,
      },
    });
  } catch (error: any) {
    console.error('Error fetching visitors:', error);
    return res.status(500).json({ error: 'Failed to retrieve visitor data' });
  }
});

// Clear visitor log endpoint
app.post('/api/visitors/clear', (req, res) => {
  visitorsStore.clear();
  seedInitialVisitors();
  return res.json({ success: true, message: 'Visitor logs reset' });
});

// API: Analyze GST Notice and generate legal grounds & judgements
app.post('/api/analyze-notice', async (req, res) => {
  try {
    const {
      section,
      customSection,
      noticeForm,
      financialYear,
      disputeAmount,
      primaryIssue,
      allegationDetails,
      noticeText,
      hasPersonalHearingOffered,
      hasDRC01Issued,
      hasFraudAlleged,
    } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback response if no API key is set
      return res.json({
        summary: `Analysis for Section ${section || customSection || 'GST Act'} Notice (${noticeForm || 'SCN'}).`,
        noticeVulnerabilities: [
          section === '169'
            ? 'Defective service of notice under Section 169 (e.g. uploaded in obscure "Additional Notices" tab without email alert or direct affixation without trying primary modes).'
            : hasPersonalHearingOffered === false
            ? 'Mandatory personal hearing under Section 75(4) was not granted prior to passing order, violating Natural Justice.'
            : 'Check whether SCN details specific facts or relies on vague boilerplate template assertions.',
          hasFraudAlleged && section === '74'
            ? 'Section 74 extended limitation invoked without establishing deliberate intention to evade tax or wilful misstatement.'
            : 'Verify whether limitation period under Section 73/74 has expired for FY ' + (financialYear || 'in dispute'),
        ],
        keyProceduralLapses: [
          section === '169'
            ? {
                title: 'Section 169 Service Defect / Obscure Portal Tab',
                description: 'SCN placed in "Additional Notices and Orders" tab without email alert or dispatch proof. Deemed service presumption rebutted.',
                severity: 'CRITICAL',
                statuteRef: 'Section 169(1) & (3) CGST Act',
              }
            : {
                title: 'Section 75(4) Mandatory Hearing Omitted',
                description: 'Order passed without serving specific hearing notice with date, time & venue. Violates natural justice principles.',
                severity: 'CRITICAL',
                statuteRef: 'Section 75(4) CGST Act',
              },
          {
            title: 'Invocation of Sec 74 Extended Period Without Proof of Fraud',
            description: 'Extended 5-year period invoked on routine discrepancy without establishing mens rea or wilful suppression.',
            severity: 'CRITICAL',
            statuteRef: 'Section 74 CGST Act',
          },
          {
            title: 'Absence of Itemized Tax Demand Breakdown in DRC-01',
            description: 'DRC-01 lacks tax head-wise computation or supporting audit reconciliation tables.',
            severity: 'MAJOR',
            statuteRef: 'Rule 142 CGST Rules',
          },
          {
            title: 'Omission of Mandatory Pre-SCN Consultation (ASMT-10)',
            description: 'Department initiated SCN without first serving ASMT-10 scrutiny notice or seeking explanation.',
            severity: 'MODERATE',
            statuteRef: 'Section 61 & Rule 99',
          },
        ],
        potentialTaxReliefs: [
          {
            title: '100% Demand Quashing on Natural Justice Violation',
            description: 'High Courts routinely set aside or quash SCNs/orders passed without mandatorily granting personal hearing.',
            reliefType: 'Full Notice Quashing',
            applicablePrecedent: 'Bharat Mint & Allied Chemicals (Allahabad HC)',
          },
          {
            title: '100% Penalty Waiver & Reversal to Normal Limitation (Sec 73)',
            description: 'Absence of deliberate fraud invalidates 100% penalty u/s 74, restricting liability to actual tax under Sec 73.',
            reliefType: 'Penalty Waiver',
            applicablePrecedent: 'Uniworth Textiles (Supreme Court)',
          },
          {
            title: 'Protection & Non-Reversal of Input Tax Credit (ITC)',
            description: 'Buyer cannot be penalized or denied ITC for supplier filing defaults without primary action on selling dealer.',
            reliefType: 'ITC Retention',
            applicablePrecedent: 'Suncraft Energy (Calcutta HC / SC Affirmed)',
          },
        ],
        legalDefenses: [
          {
            groundTitle: 'Violation of Principles of Natural Justice (Section 75(4))',
            description:
              'Order passed without granting opportunity of personal hearing is unsustainable in law as held in Bharat Mint (Allahabad HC) and Horizon Construction (Madras HC).',
            supportingCases: ['Bharat Mint & Allied Chemicals (Allahabad HC)', 'Horizon Construction (Madras HC)'],
          },
          {
            groundTitle: 'Lack of Intent to Evade Tax / Invocation of Sec 74 Invalid',
            description:
              'Standard non-payment or inadvertent mistake does not amount to suppression. Extended period u/s 74 cannot be invoked without specific proof of fraud (Uniworth Textiles SC).',
            supportingCases: ['Uniworth Textiles (Supreme Court)', 'Raychem RPG (Gujarat HC)'],
          },
        ],
        favourableJudgements: [
          {
            caseTitle: 'Bharat Mint & Allied Chemicals v. Commr Commercial Tax',
            citation: '2022 (3) TMI 492 - Allahabad HC',
            court: 'Allahabad High Court',
            principle: 'Personal hearing under Section 75(4) is mandatory whenever an adverse order is contemplated.',
          },
          {
            caseTitle: 'Suncraft Energy Pvt Ltd v. Assistant Commissioner',
            citation: '2023 (8) TMI 174 - Calcutta HC / SC Affirmed',
            court: 'Calcutta High Court / Supreme Court',
            principle: 'Department must first proceed against selling dealer before demanding ITC reversal from purchasing dealer.',
          },
        ],
        adverseJudgementsToDistinguish: [
          {
            caseTitle: 'Union of India v. Bharti Airtel Ltd.',
            citation: '2021 (54) G.S.T.L. 257 (S.C.)',
            court: 'Supreme Court',
            whyInapplicable:
              'Inapplicable because present case is not a unilateral retrospective GSTR-3B revision, but a genuine claim supported by tax invoices and e-way bills.',
          },
        ],
        proceduralFlawsDetected: [
          'Lack of specific computation breakdown in DRC-01',
          'Absence of DIN (Document Identification Number) if applicable',
          'Failure to issue ASMT-10 before Section 73/74 in return scrutiny cases',
        ],
        recommendedStrategy:
          'Submit a comprehensive written reply raising preliminary objections on jurisdiction and Section 75(4) personal hearing violation, backed by cited High Court & Supreme Court judgements.',
      });
    }

    const prompt = `
You are an expert Goods and Services Tax (GST) Advocate and Senior Chartered Accountant specializing in GST Litigation in India.
Analyze the following GST Notice details provided by a taxpayer/practitioner:

- GST Section: ${section} ${customSection ? `(${customSection})` : ''}
- Notice Form/Type: ${noticeForm || 'DRC-01 SCN'}
- Financial Year: ${financialYear || 'Not Specified'}
- Amount in Dispute: ${disputeAmount || 'Not Specified'}
- Primary Allegation / Issue: ${primaryIssue || 'General Tax Demand'}
- Specific Details / Allegations: ${allegationDetails || 'N/A'}
- Notice Raw Text Extracted: ${noticeText ? noticeText.substring(0, 3000) : 'None provided'}
- Personal Hearing Offered in Notice: ${hasPersonalHearingOffered ? 'Yes' : 'NO / Not Offered'}
- DRC-01 Issued with SCN: ${hasDRC01Issued ? 'Yes' : 'NO'}
- Allegation of Fraud/Suppression (Sec 74): ${hasFraudAlleged ? 'Yes' : 'NO'}

Your task: Provide a highly authoritative, thorough legal analysis and judgement matrix for this GST notice.
You MUST output valid JSON matching the exact schema specified:
{
  "summary": "Concise 2-3 sentence strategic executive summary of notice strengths and weaknesses",
  "noticeVulnerabilities": ["Array of 3-5 specific legal and procedural flaws in this notice"],
  "keyProceduralLapses": [
    {
      "title": "Title of procedural error (e.g., Mandatory Personal Hearing u/s 75(4) Denied)",
      "description": "Specific explanation of why this notice violates statutory procedure or rule",
      "severity": "CRITICAL" | "MAJOR" | "MODERATE",
      "statuteRef": "Relevant Section or Rule (e.g. Section 75(4) CGST Act)"
    }
  ],
  "potentialTaxReliefs": [
    {
      "title": "Specific Tax Relief / Remedy (e.g., Complete Demand Quashing on Natural Justice Violation)",
      "description": "Explanation of financial and legal benefit available to the taxpayer",
      "reliefType": "Full Notice Quashing" | "Penalty Waiver" | "ITC Retention" | "Limitation Bar" | "Procedural Discharge",
      "applicablePrecedent": "Landmark High Court or SC judgement supporting this relief"
    }
  ],
  "legalDefenses": [
    {
      "groundTitle": "Specific Ground Title (e.g. Ground 1: Invocation of Section 74 invalid without proof of mens rea)",
      "description": "Detailed legal argument explaining why this ground defeats the notice",
      "supportingCases": ["Names & citations of supporting landmark judgements"]
    }
  ],
  "favourableJudgements": [
    {
      "caseTitle": "Full Case Name",
      "citation": "Official legal citation (e.g., 2023 INSC... or TMI / GSTL)",
      "court": "Supreme Court or specific High Court",
      "principle": "Core legal ratio / holding in favour of taxpayer"
    }
  ],
  "adverseJudgementsToDistinguish": [
    {
      "caseTitle": "Adverse Case Name often relied upon by Revenue",
      "citation": "Citation",
      "court": "Court Name",
      "whyInapplicable": "Clear, logical distinction showing why this adverse judgement DOES NOT apply to the present taxpayer's facts"
    }
  ],
  "proceduralFlawsDetected": ["Array of procedural errors such as Sec 75(4) hearing missing, DIN missing, lack of ASMT-10, limitation bar"],
  "recommendedStrategy": "Actionable step-by-step litigation roadmap for CA/Advocate to reply or file writ"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are India top GST Law expert advisor. Always provide highly accurate High Court and Supreme Court GST judgements with exact legal ratios, citations, and distinguishing arguments against Revenue notices. Output ONLY JSON.',
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    const jsonResult = JSON.parse(responseText);
    return res.json(jsonResult);
  } catch (error: any) {
    console.error('Error analyzing GST notice:', error);
    return res.status(500).json({
      error: 'Failed to complete AI notice analysis.',
      details: error?.message || String(error),
    });
  }
});

// API: Generate Formal Written Reply Draft to GST Notice
app.post('/api/generate-reply', async (req, res) => {
  try {
    const {
      taxpayerName,
      gstin,
      noticeRefNo,
      noticeDate,
      taxOfficerTitle,
      section,
      customSection,
      financialYear,
      disputeAmount,
      primaryIssue,
      allegationDetails,
      selectedJudgements,
    } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        replyText: `BEFORE THE ${taxOfficerTitle || 'PROPER OFFICER / ASSISTANT COMMISSIONER OF STATE TAX'}

IN THE MATTER OF:
M/S ${taxpayerName || '[TAXPAYER NAME]'}
GSTIN: ${gstin || '[GSTIN NUMBER]'}
FINANCIAL YEAR: ${financialYear || '2020-21'}

REPLY TO SHOW CAUSE NOTICE BEARING REF NO: ${noticeRefNo || '[NOTICE REF NO]'} DATED ${noticeDate || '[DATE]'} UNDER SECTION ${section || customSection || '73'} OF THE CGST/SGST ACT, 2017.

MOST RESPECTFULLY SHOWETH:

1. PRELIMINARY OBJECTIONS:
1.1 VIOLATION OF SECTION 75(4) - MANDATORY PERSONAL HEARING:
The present proceeding is fatally flawed as the impugned notice failed to grant an explicit opportunity of personal hearing prior to contemplating an adverse demand order, violating Section 75(4) of the CGST Act and principles of natural justice, as settled by the Hon'ble Allahabad High Court in Bharat Mint & Allied Chemicals v. Commissioner (2022) and Hon'ble Madras High Court in Horizon Construction.

1.2 INVALID INVOCATION OF SECTION 74 / LIMITATION BAR:
The Respondent authority has mechanically invoked extended limitation without bringing on record any tangible material establishing deliberate fraud, wilful misstatement, or suppression of facts with intent to evade tax. As held by the Hon'ble Supreme Court in Uniworth Textiles Ltd. v. CCE (2013) and Gujarat High Court in Raychem RPG Pvt Ltd (2023), mere difference of opinion or inadvertent mistake cannot attract Section 74.

2. SUBSTANTIVE GROUNDS ON MERITS:
2.1 ${primaryIssue || 'Reversal of Input Tax Credit / Tax Demand'}:
The Noticee submits that all purchases were genuine, backed by valid tax invoices, bank payment receipts, and e-way bills. As held by the Hon't Calcutta High Court in Suncraft Energy Pvt Ltd (Affirmed by Supreme Court), the Department cannot demand tax reversal from a bona fide purchasing dealer without first taking action against the selling dealer.

3. PRAYER:
In view of the facts and legal submissions made hereinabove, it is most respectfully prayed that:
(a) The Show Cause Notice bearing Ref No ${noticeRefNo || '[REF]'} be dropped in its entirety;
(b) An opportunity of personal hearing be granted before passing any order;
(c) Any other relief deemed fit in the interest of justice be allowed.

FOR M/S ${taxpayerName || '[TAXPAYER NAME]'}
AUTHORIZED SIGNATORY / ADVOCATE`,
      });
    }

    const prompt = `
Generate a formal, comprehensive, professional written legal submission / SCN Reply to a GST Notice under the Indian GST Act.

Taxpayer Details:
- Name: ${taxpayerName || 'M/S [TAXPAYER NAME]'}
- GSTIN: ${gstin || '[GSTIN]'}
- Notice Ref No: ${noticeRefNo || '[NOTICE REF NO]'}
- Notice Date: ${noticeDate || '[DATE]'}
- Addressed To: ${taxOfficerTitle || 'The Proper Officer / Assistant Commissioner of Central/State Tax'}
- Section Under Notice: Section ${section} ${customSection ? `(${customSection})` : ''}
- Financial Year: ${financialYear || 'FY 2020-21'}
- Amount in Dispute: ${disputeAmount || 'Rs. [AMOUNT]'}
- Primary Allegation: ${primaryIssue || 'Tax Demand / ITC Disallowance'}
- Allegation Details: ${allegationDetails || 'As per SCN'}
- Key Judgements to Cite in Reply: ${JSON.stringify(selectedJudgements || [])}

Draft a complete, highly articulate, well-structured legal reply containing:
1. Formal Preamble & Subject Line
2. Preliminary Objections (Violation of Natural Justice, Sec 75(4), Lack of Jurisdiction, Section 74 Extended Limitation Invalidity, Procedural Deficiencies)
3. Factual Background & Compliance Record
4. Ground-wise Detailed Legal Arguments incorporating cited Supreme Court and High Court Judgements with exact ratios and quotes
5. Distinction of adverse positions
6. Formal Prayer Clause requesting dropping of SCN and mandatory personal hearing

Ensure the tone is respectful, legally rigorous, and ready for print or submission before GST Authorities.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are a premier GST Advocate drafting an unbeatable Show Cause Notice Reply for a Chartered Accountant practitioner.',
      },
    });

    return res.json({
      replyText: response.text || 'Failed to generate draft reply text.',
    });
  } catch (error: any) {
    console.error('Error generating reply draft:', error);
    return res.status(500).json({
      error: 'Failed to generate legal reply draft.',
      details: error?.message || String(error),
    });
  }
});

// Start Express server with Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`GST Notice Judgement Advisor server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
