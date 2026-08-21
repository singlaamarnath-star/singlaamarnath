import React, { useState, useMemo } from 'react';
import { Judgement, NoticeInputState } from '../types';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Sparkles,
  Building2,
  User,
  RefreshCw,
  BookOpen,
  Quote,
  Eye,
  Edit3,
  Scale,
  Zap,
  Info,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { RAW_MASTER_JUDGEMENTS } from '../data/judgementsData';

interface ReplyDraftModalProps {
  inputState: NoticeInputState;
  selectedJudgements: Judgement[];
  onGenerateAIReply: (params: any) => Promise<string>;
  hoveredJudgement?: Judgement | null;
  onHoverJudgement?: (judgement: Judgement | null) => void;
}

export const ReplyDraftModal: React.FC<ReplyDraftModalProps> = ({
  inputState,
  selectedJudgements,
  onGenerateAIReply,
  hoveredJudgement: externalHoveredJudgement,
  onHoverJudgement: externalOnHoverJudgement,
}) => {
  const [internalHoveredJudgement, setInternalHoveredJudgement] = useState<Judgement | null>(null);
  const activeHoveredJudgement =
    externalHoveredJudgement !== undefined ? externalHoveredJudgement : internalHoveredJudgement;

  const handleSetHovered = (j: Judgement | null) => {
    if (externalOnHoverJudgement) {
      externalOnHoverJudgement(j);
    }
    setInternalHoveredJudgement(j);
  };

  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');
  const [taxpayerName, setTaxpayerName] = useState('M/S ABC ENTERPRISES PVT LTD');
  const [gstin, setGstin] = useState('07AAAAA0000A1Z5');
  const [noticeRefNo, setNoticeRefNo] = useState('ZA0703240123456');
  const [noticeDate, setNoticeDate] = useState('15-03-2024');
  const [taxOfficerTitle, setTaxOfficerTitle] = useState('THE ASSISTANT COMMISSIONER OF STATE TAX');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [replyText, setReplyText] = useState<string>(() => {
    return generateDefaultReplyText({
      taxpayerName: 'M/S ABC ENTERPRISES PVT LTD',
      gstin: '07AAAAA0000A1Z5',
      noticeRefNo: 'ZA0703240123456',
      noticeDate: '15-03-2024',
      taxOfficerTitle: 'THE ASSISTANT COMMISSIONER OF STATE TAX',
      inputState,
      selectedJudgements,
    });
  });

  function generateDefaultReplyText(params: any) {
    const sectionName = inputState.section === 'OTHER' ? inputState.customSection : `Section ${inputState.section}`;

    const casesText = selectedJudgements
      .map(
        (j, i) =>
          `2.${i + 1} ${j.title} [${j.citation}] (${j.court}) [Para 12-18]:\n   Ratio: ${j.keyRatio}\n   ${
            j.importantParas && j.importantParas.length > 0 ? `Key Excerpt [Para 12]: "${j.importantParas[0]}"` : ''
          }\n`
      )
      .join('\n');

    return `BEFORE ${params.taxOfficerTitle || 'THE PROPER OFFICER / ASSISTANT COMMISSIONER OF STATE TAX'}

IN THE MATTER OF:
M/S ${params.taxpayerName || '[TAXPAYER NAME]'}
GSTIN: ${params.gstin || '[GSTIN]'}
FINANCIAL YEAR: ${inputState.financialYear || 'FY 2020-21'}

REPLY TO SHOW CAUSE NOTICE BEARING REF NO: ${params.noticeRefNo || '[REF NO]'} DATED ${params.noticeDate || '[DATE]'} UNDER ${sectionName.toUpperCase()} OF THE CGST/SGST ACT, 2017.

MOST RESPECTFULLY SHOWETH:

1. PRELIMINARY OBJECTIONS:

1.1 VIOLATION OF SECTION 75(4) - MANDATORY PERSONAL HEARING:
The Noticee submits that the impugned notice fails to afford an explicit, reasonable opportunity of personal hearing prior to contemplating an adverse demand order against the Noticee. Section 75(4) of the CGST Act strictly mandates that an opportunity of hearing SHALL be granted where an adverse decision is contemplated. 

As held by the Hon'ble Allahabad High Court in Bharat Mint & Allied Chemicals v. Commissioner (2022) [Para 12-14] and Hon'ble Madras High Court in Horizon Construction (2023) [Para 8], passing an order without personal hearing violates the principles of natural justice and renders the proceeding unsustainable.

1.2 INVALID INVOCATION OF EXTENDED LIMITATION PERIOD (SECTION 74):
The Respondent authority has mechanically alleged 'suppression of facts' without bringing on record any tangible evidence establishing deliberate intent, mens rea, or fraud to evade tax. 

As settled by the Hon'ble Supreme Court in Uniworth Textiles Ltd. v. Commissioner of Central Excise (2013) [Para 18] and Gujarat High Court in Raychem RPG Pvt Ltd (2023) [Para 24], mere non-payment, bonafide error, or statutory interpretation difference cannot constitute suppression. The extended limitation period u/s 74 cannot be invoked in routine cases.

2. SUBSTANTIVE LEGAL GROUNDS & HIGH COURT / SUPREME COURT PRECEDENTS:

${casesText || `2.1 LANDMARK PRECEDENTS ON PROCEDURAL & SUBSTANTIVE PROTECTION:\nThe Noticee places reliance on binding judgements of the Hon'ble High Court / Supreme Court establishing that the action proposed in the impugned SCN is contrary to the scheme of the GST Act.`}

2.2 GENUINENESS OF TRANSACTIONS & PROOFS:
All purchases and input tax credit claims are supported by valid tax invoices, e-way bills, bank account statements showing full payment of tax through banking channels, and audited financial records. 

As held by the Hon'ble Calcutta High Court in Suncraft Energy Pvt Ltd (Affirmed by the Hon'ble Supreme Court in SLP 27850/2023) [Para 15], the Revenue cannot directly demand tax recovery or ITC reversal from a bona fide purchasing dealer without first exhausting remedies against the selling dealer.

3. PRAYER:
In view of the facts, statutory provisions, and binding judicial precedents cited hereinabove, it is most respectfully prayed that:
(a) The Show Cause Notice Ref No ${params.noticeRefNo || '[REF NO]'} dated ${params.noticeDate || '[DATE]'} be dropped in its entirety;
(b) An opportunity of personal hearing be granted to the Noticee prior to passing any final order;
(c) Any other relief deemed fit and proper in the interest of justice be granted.

DATED: ${new Date().toLocaleDateString('en-IN')}
PLACE: DELHI / NEW DELHI

FOR M/S ${params.taxpayerName || '[TAXPAYER NAME]'}

AUTHORIZED SIGNATORY / CA / ADVOCATE`;
  }

  // Consolidate all cited judgements in the reply (selected + default landmark cases)
  const activeCitedJudgements = useMemo(() => {
    const list = [...selectedJudgements];
    const defaultIds = ['sec75-1', 'sec75-2', 'sec74-1', 'sec74-2', 'sec16-1'];
    defaultIds.forEach((id) => {
      if (!list.some((j) => j.id === id)) {
        const found = RAW_MASTER_JUDGEMENTS.find((m) => m.id === id);
        if (found) list.push(found);
      }
    });
    return list;
  }, [selectedJudgements]);

  const handleAIRefine = async () => {
    setIsGenerating(true);
    try {
      const generated = await onGenerateAIReply({
        taxpayerName,
        gstin,
        noticeRefNo,
        noticeDate,
        taxOfficerTitle,
        section: inputState.section,
        customSection: inputState.customSection,
        financialYear: inputState.financialYear,
        disputeAmount: inputState.disputeAmount,
        primaryIssue: inputState.primaryIssue,
        allegationDetails: inputState.allegationDetails,
        selectedJudgements,
      });
      if (generated) {
        setReplyText(generated);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(replyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>GST Notice Written Reply - M/S ${taxpayerName}</title>
            <style>
              body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.6; padding: 40px; color: #000; }
              pre { font-family: inherit; whitespace: pre-wrap; word-wrap: break-word; }
            </style>
          </head>
          <body>
            <pre>${replyText}</pre>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const renderAnnotatedLine = (line: string) => {
    const matchRules: { term: string; judgement: Judgement; isPara: boolean }[] = [];

    activeCitedJudgements.forEach((j) => {
      const shortTitle = j.title.split('v.')[0].trim();
      matchRules.push({ term: j.title, judgement: j, isPara: false });
      if (shortTitle && shortTitle.length > 3) {
        matchRules.push({ term: shortTitle, judgement: j, isPara: false });
      }
      if (j.citation) {
        matchRules.push({ term: j.citation, judgement: j, isPara: false });
      }

      const paraPatterns = [
        '[Para 12-14]',
        '[Para 18]',
        '[Para 8]',
        '[Para 15]',
        '[Para 24]',
        'Para 12-14',
        'Para 18',
        'Para 8',
        'Para 15',
        'Para 24',
        'Paragraph 12',
        'Paragraph 18',
        'Paragraph 8',
        'Paragraph 15',
        'Paragraph 24',
        'SLP 27850/2023',
      ];

      paraPatterns.forEach((p) => {
        if (
          (j.id === 'sec75-1' && p.includes('12')) ||
          (j.id === 'sec75-2' && p.includes('8')) ||
          (j.id === 'sec74-1' && p.includes('18')) ||
          (j.id === 'sec74-2' && p.includes('24')) ||
          (j.id === 'sec16-1' && (p.includes('15') || p.includes('27850'))) ||
          (selectedJudgements.some((sj) => sj.id === j.id) && (p.includes('12') || p.includes('18')))
        ) {
          matchRules.push({ term: p, judgement: j, isPara: true });
        }
      });
    });

    matchRules.sort((a, b) => b.term.length - a.term.length);

    if (matchRules.length === 0) return line;

    const regexPattern = new RegExp(
      `(${matchRules.map((r) => r.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'gi'
    );

    const parts = line.split(regexPattern);

    return parts.map((part, pIdx) => {
      const match = matchRules.find((r) => r.term.toLowerCase() === part.toLowerCase());

      if (!match) {
        return <span key={pIdx}>{part}</span>;
      }

      const isHovered = activeHoveredJudgement?.id === match.judgement.id;

      if (isHovered) {
        return (
          <mark
            key={pIdx}
            className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 text-slate-950 font-black px-2 py-0.5 rounded border-2 border-amber-500 shadow-lg ring-4 ring-amber-400/50 scale-105 inline-flex items-center gap-1 mx-0.5 my-0.5 transition-all duration-200 animate-pulse cursor-pointer"
            title={`Highlighted Para / Citation for ${match.judgement.title}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-900 shrink-0" />
            <span>{part}</span>
            <span className="text-[9px] bg-amber-950 text-amber-100 font-extrabold px-1.5 py-0.2 rounded uppercase shrink-0">
              {match.isPara ? 'Para Match' : 'Citation'}
            </span>
          </mark>
        );
      }

      return (
        <span
          key={pIdx}
          onMouseEnter={() => handleSetHovered(match.judgement)}
          onMouseLeave={() => handleSetHovered(null)}
          className="bg-blue-100/90 hover:bg-amber-200 text-blue-900 hover:text-amber-950 font-semibold px-1.5 py-0.5 rounded border border-blue-300 hover:border-amber-400 cursor-pointer transition-all inline-flex items-center gap-1 mx-0.5"
          title={`Hover to highlight citations & paras for ${match.judgement.title}`}
        >
          <BookOpen className="w-3 h-3 text-blue-700 hover:text-amber-900 shrink-0" />
          <span>{part}</span>
        </span>
      );
    });
  };

  const renderTextWithHighlights = (text: string) => {
    if (!text) return null;

    const paragraphs = text.split('\n');

    return (
      <div className="space-y-3 font-serif text-slate-900 leading-relaxed text-sm">
        {paragraphs.map((line, lIdx) => {
          if (!line.trim()) return <div key={lIdx} className="h-2" />;

          const isHeader =
            /^(BEFORE|IN THE MATTER OF|REPLY TO|MOST RESPECTFULLY|1\.|2\.|3\.|FOR M\/S|DATED:|PLACE:)/i.test(
              line.trim()
            );

          if (isHeader) {
            return (
              <h4
                key={lIdx}
                className={`font-sans font-bold uppercase tracking-wide text-xs my-2 ${
                  line.startsWith('BEFORE') || line.startsWith('REPLY TO')
                    ? 'text-blue-900 border-b-2 border-blue-200 pb-1.5 text-sm bg-blue-50/50 p-2 rounded'
                    : 'text-slate-950 mt-4 border-l-4 border-amber-500 pl-2 py-0.5'
                }`}
              >
                {line}
              </h4>
            );
          }

          return (
            <p key={lIdx} className="text-slate-800 text-xs sm:text-sm leading-relaxed tracking-wide text-justify">
              {renderAnnotatedLine(line)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Show Cause Notice (SCN) Written Reply Builder
          </h3>
          <p className="text-xs text-slate-500">
            Generate, customize, and print a formal legal reply with interactive High Court & Supreme Court citation highlighting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setViewMode('formatted')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                viewMode === 'formatted'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Formatted Pleading</span>
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                viewMode === 'raw'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Raw Text Editor</span>
            </button>
          </div>

          <button
            onClick={handleAIRefine}
            disabled={isGenerating}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-md flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span>AI Draft Refinement</span>
          </button>

          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-md flex items-center gap-1.5 shadow-xs transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-md flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Notice Inputs Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Taxpayer Name:</label>
          <input
            type="text"
            value={taxpayerName}
            onChange={(e) => setTaxpayerName(e.target.value)}
            className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">GSTIN:</label>
          <input
            type="text"
            value={gstin}
            onChange={(e) => setGstin(e.target.value)}
            className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Notice Ref No:</label>
          <input
            type="text"
            value={noticeRefNo}
            onChange={(e) => setNoticeRefNo(e.target.value)}
            className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Notice Date:</label>
          <input
            type="text"
            value={noticeDate}
            onChange={(e) => setNoticeDate(e.target.value)}
            className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Adjudicating Officer:</label>
          <input
            type="text"
            value={taxOfficerTitle}
            onChange={(e) => setTaxOfficerTitle(e.target.value)}
            className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>
      </div>

      {/* CITED JUDGEMENTS & PARAGRAPH TRACKER PANEL */}
      <div className="bg-slate-900 text-white rounded-xl p-4 space-y-3 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500 text-slate-950 rounded font-black text-xs">
              <Scale className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-sm text-amber-300">
                Cited Precedents & Paragraph Highlighter Panel
              </h4>
              <p className="text-[11px] text-slate-400">
                Hover over any judgement card below to highlight its specific paragraph numbers and legal citations in real-time inside the reply draft!
              </p>
            </div>
          </div>
          <span className="bg-amber-950 text-amber-200 text-[10px] font-extrabold px-2.5 py-1 rounded border border-amber-700 uppercase tracking-wider self-start sm:self-auto">
            {activeCitedJudgements.length} Precedents Loaded
          </span>
        </div>

        {/* Hoverable Judgement Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeCitedJudgements.map((j) => {
            const isHovered = activeHoveredJudgement?.id === j.id;
            const shortTitle = j.title.split('v.')[0].trim();

            let samplePara = '[Para 12-14]';
            if (j.id === 'sec75-2') samplePara = '[Para 8]';
            if (j.id === 'sec74-1') samplePara = '[Para 18]';
            if (j.id === 'sec74-2') samplePara = '[Para 24]';
            if (j.id === 'sec16-1') samplePara = '[Para 15]';

            return (
              <div
                key={j.id}
                onMouseEnter={() => handleSetHovered(j)}
                onMouseLeave={() => handleSetHovered(null)}
                className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? 'bg-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-300 shadow-lg scale-[1.02]'
                    : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                      isHovered
                        ? 'bg-slate-950 text-amber-300'
                        : 'bg-blue-900/80 text-blue-200 border border-blue-700'
                    }`}
                  >
                    {j.court}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isHovered ? 'bg-amber-950 text-amber-100' : 'bg-slate-900 text-amber-300'
                    }`}
                  >
                    {samplePara}
                  </span>
                </div>

                <p className="font-bold text-xs truncate" title={j.title}>
                  {shortTitle}
                </p>

                <p
                  className={`text-[10px] mt-0.5 truncate font-mono ${
                    isHovered ? 'text-slate-900 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {j.citation}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTIVE HOVER STATUS INDICATOR BANNER */}
      {activeHoveredJudgement && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 p-3 rounded-lg border border-amber-600 shadow-md flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-slate-950 shrink-0" />
            <div>
              <span className="font-black text-xs uppercase tracking-wider block">
                🎯 REAL-TIME PARAGRAPH & CITATION HIGHLIGHTING ACTIVE
              </span>
              <span className="text-xs font-bold">
                Highlighting citations and paragraph numbers for:{' '}
                <u className="font-black">{activeHoveredJudgement.title}</u> ({activeHoveredJudgement.court})
              </span>
            </div>
          </div>
          <span className="text-[10px] font-black bg-slate-950 text-amber-300 px-2.5 py-1 rounded uppercase">
            Scroll To View
          </span>
        </div>
      )}

      {/* DRAFT REPLY DISPLAY AREA */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <span>Written Legal Submission / SCN Reply Document:</span>
            {viewMode === 'formatted' ? (
              <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                Formatted Interactive Mode
              </span>
            ) : (
              <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                Raw Textarea Mode
              </span>
            )}
          </label>
        </div>

        {viewMode === 'formatted' ? (
          <div className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-300 shadow-inner max-h-[550px] overflow-y-auto space-y-4 font-serif text-slate-900">
            {renderTextWithHighlights(replyText)}
          </div>
        ) : (
          <textarea
            rows={18}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full font-mono text-xs leading-relaxed p-4 bg-slate-900 text-amber-100 rounded-lg border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        )}
      </div>
    </div>
  );
};
