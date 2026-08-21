export type GstSection =
  | '73'
  | '74'
  | '16(4)'
  | '75(4)'
  | '169'
  | '129'
  | '130'
  | '83'
  | '70'
  | '61'
  | '67'
  | '107'
  | '17(5)'
  | '50'
  | '54'
  | 'Retrospective Cancellation'
  | '2A vs 3B Mismatch'
  | 'OTHER';

export type CourtType =
  | 'Supreme Court'
  | 'Delhi High Court'
  | 'Bombay High Court'
  | 'Calcutta High Court'
  | 'Madras High Court'
  | 'Gujarat High Court'
  | 'Allahabad High Court'
  | 'Punjab & Haryana High Court'
  | 'Karnataka High Court'
  | 'Kerala High Court'
  | 'Patna High Court'
  | 'Telangana High Court'
  | 'Orissa High Court'
  | 'Jharkhand High Court'
  | 'Rajasthan High Court'
  | 'Gauhati High Court'
  | 'Other High Court'
  | 'GSTAT'
  | 'AAR / AAAR'
  | 'CESTAT';

export interface RecentSearchItem {
  id: string;
  section: GstSection;
  customSection?: string;
  noticeForm: string;
  primaryIssue: string;
  financialYear: string;
  disputeAmount?: string;
  timestamp: number;
  inputState: NoticeInputState;
}

export interface Judgement {
  id: string;
  title: string;
  citation: string;
  court: CourtType;
  year: number;
  section: string;
  type: 'favourable' | 'unfavourable';
  headnote: string;
  keyRatio: string;
  noticeContext: string; // What specific notice allegation this applies to
  distinguishingGrounds?: string; // If unfavourable, how to distinguish it from taxpayer's notice
  importantParas?: string[];
  tags: string[];
  fullText?: string;
  bench?: string;
  caseNo?: string;
  orderDate?: string;
  petitioner?: string;
  respondent?: string;
}

export interface NoticeInputState {
  section: GstSection;
  customSection: string;
  noticeForm: string; // e.g. SCN DRC-01, ASMT-10, MOV-07, INS-01, DRC-22
  financialYear: string;
  disputeAmount: string;
  primaryIssue: string;
  allegationDetails: string;
  noticeText: string;
  hasPersonalHearingOffered: boolean;
  hasDRC01Issued: boolean;
  hasFraudAlleged: boolean;
}

export interface ProceduralLapseItem {
  title: string;
  description: string;
  severity: 'CRITICAL' | 'MAJOR' | 'MODERATE';
  statuteRef?: string;
}

export interface VisitorActivity {
  id: string;
  timestamp: string;
  type: 'page_view' | 'search_analyzed' | 'judgement_copy' | 'reply_drafted' | 'upi_clicked' | 'voice_assistant';
  details: string;
  section?: string;
}

export interface VisitorRecord {
  id: string;
  visitorId: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  device: 'Mobile' | 'Desktop' | 'Tablet';
  browser: string;
  os: string;
  firstSeen: string;
  lastSeen: string;
  visitCount: number;
  pagesViewed: string[];
  activities: VisitorActivity[];
  searchesCount: number;
  copiesCount: number;
}

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  totalSearches: number;
  judgementsCopied: number;
  upiClicks: number;
  mobilePercentage: number;
  desktopPercentage: number;
  topSections: { section: string; count: number }[];
  topLocations: { city: string; count: number }[];
}

export interface TaxReliefItem {
  title: string;
  description: string;
  reliefType: 'Full Notice Quashing' | 'Penalty Waiver' | 'ITC Retention' | 'Limitation Bar' | 'Procedural Discharge';
  applicablePrecedent?: string;
}

export interface AIAnalysisResponse {
  summary: string;
  noticeVulnerabilities: string[];
  keyProceduralLapses?: ProceduralLapseItem[];
  potentialTaxReliefs?: TaxReliefItem[];
  legalDefenses: {
    groundTitle: string;
    description: string;
    supportingCases: string[];
  }[];
  favourableJudgements: {
    caseTitle: string;
    citation: string;
    court: string;
    principle: string;
  }[];
  adverseJudgementsToDistinguish: {
    caseTitle: string;
    citation: string;
    court: string;
    whyInapplicable: string;
  }[];
  proceduralFlawsDetected: string[];
  recommendedStrategy: string;
}
