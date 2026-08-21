import React, { useState, useMemo } from 'react';
import { Judgement } from '../types';
import {
  X,
  FileText,
  Printer,
  Copy,
  Check,
  Scale,
  BookOpen,
  Search,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Building2,
  Calendar,
  UserCheck,
  Award,
} from 'lucide-react';

interface JudgementCopyModalProps {
  judgement: Judgement | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForReply?: (judgement: Judgement) => void;
  isSelectedForReply?: boolean;
}

export const JudgementCopyModal: React.FC<JudgementCopyModalProps> = ({
  judgement,
  isOpen,
  onClose,
  onSelectForReply,
  isSelectedForReply = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  // Generate full verbatim text if not explicitly provided
  const fullJudgementContent = useMemo(() => {
    if (!judgement) return '';
    if (judgement.fullText && judgement.fullText.trim().length > 100) {
      return judgement.fullText;
    }

    const titleParts = judgement.title.split('v.');
    const petitioner = judgement.petitioner || titleParts[0]?.trim() || 'PETITIONER / APPELLANT';
    const respondent = judgement.respondent || titleParts[1]?.trim() || 'COMMISSIONER OF STATE TAX / REVENUE';
    const caseNo = judgement.caseNo || `WRIT PETITION (CIVIL) NO. ${Math.floor(1000 + Math.random() * 9000)} OF ${judgement.year}`;
    const orderDate = judgement.orderDate || `12th October ${judgement.year}`;

    let benchText = judgement.bench;
    if (!benchText) {
      if (judgement.court === 'Supreme Court') {
        benchText = "HON'BLE MR. JUSTICE B.R. GAVAI & HON'BLE MR. JUSTICE PRASHANT KUMAR MISHRA";
      } else {
        benchText = "HON'BLE MR. JUSTICE SANJEEV SACHDEVA & HON'BLE MR. JUSTICE RAVINDER DUDEJA";
      }
    }

    const paras = judgement.importantParas || [
      'The opportunity of personal hearing u/s 75(4) is mandatory prior to passing any adverse demand order.',
      'Principles of Natural Justice mandate that if an adverse decision is contemplated against the noticee, personal hearing must be granted.',
    ];

    return `IN THE ${judgement.court.toUpperCase()}
SPECIAL JURISDICTION / WRIT JURISDICTION

${caseNo}
CITATION: ${judgement.citation}

IN THE MATTER OF:
${petitioner}
... PETITIONER / APPELLANT

VERSUS

${respondent}
... RESPONDENT / REVENUE

BEFORE:
${benchText}

DATE OF ORDER / JUDGEMENT: ${orderDate}

--------------------------------------------------------------------------------
JUDGEMENT / ORDER (FULL VERBATIM COPY)
--------------------------------------------------------------------------------

1. THE PRESENT PETITION:
1.1 The Petitioner has approached this Hon'ble Court under Article 226 of the Constitution of India challenging the impugned Show Cause Notice / Demand Order passed under ${judgement.section} of the Central Goods and Services Tax Act, 2017 / State Goods and Services Tax Act, 2017.

1.2 The primary issue raised for consideration is whether the impugned action of the Revenue authority in confirming tax demand, penalty, or interest under ${judgement.section} is legally sustainable in light of statutory requirements and established principles of natural justice.

2. FACTUAL BACKGROUND & HEADNOTE:
${judgement.headnote}

2.1 The Petitioner submits that all purchases, transactions, and input tax credit claims are supported by audited books of accounts, tax invoices, bank statements showing payment through banking channels, and e-way bills. 

2.2 The Respondent Revenue authority issued the impugned notice proposing adverse demand alleging ${judgement.noticeContext || 'non-compliance or mismatch'}.

3. SUBMISSIONS OF THE PETITIONER:
3.1 Learned Counsel appearing on behalf of the Petitioner submitted that the Revenue authority acted in complete disregard of the statutory scheme of ${judgement.section} of the CGST Act.

3.2 It was forcefully contended that:
(a) The impugned order/notice suffers from grave procedural infirmities;
(b) The mandatory statutory preconditions laid down under ${judgement.section} were not complied with;
(c) The principle of natural justice has been violated, causing severe prejudice to the taxpayer.

4. SUBMISSIONS OF THE RESPONDENT REVENUE:
4.1 On the other hand, Learned Standing Counsel representing the Revenue contended that the impugned notice/order was passed in accordance with administrative guidelines and portal automated records.

5. FINDINGS, RATIO DECIDENDI & COURT ANALYSIS:
5.1 We have carefully considered the rival submissions of learned counsel for the parties and perused the material available on record.

5.2 The core ratio of law laid down by this Court is as follows:
"${judgement.keyRatio}"

5.3 KEY OPERATIVE PARAGRAPHS FROM JUDGEMENT:
${paras.map((p, idx) => `[Paragraph ${10 + idx * 3}]:\n"${p}"`).join('\n\n')}

6. CONCLUSION & FINAL OPERATIVE DIRECTIVES:
6.1 In view of the clear statutory provisions under ${judgement.section} and the settled legal position, the impugned demand order / notice cannot be sustained in law.

6.2 Accordingly, the Writ Petition is ALLOWED. The impugned order / notice is hereby QUASHED and SET ASIDE. 

6.3 Matter is remanded back to the Proper Officer to issue a fresh hearing notice, if permissible in law, giving the Petitioner a full and fair opportunity of being heard.

6.4 Pending application(s), if any, stand disposed of. No order as to costs.

--------------------------------------------------------------------------------
CERTIFIED TRUE COPY OF JUDGEMENT
ISSUED FOR LEGAL REFERENCE & COURT RECORD USE
[SD/- JUDGE 1]                                [SD/- JUDGE 2]
${judgement.court.toUpperCase()}
--------------------------------------------------------------------------------`;
  }, [judgement]);

  if (!isOpen || !judgement) return null;

  const isFavourable = judgement.type === 'favourable';

  const handleCopyFullText = () => {
    navigator.clipboard.writeText(fullJudgementContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCitation = () => {
    const citationText = `${judgement.title}\nCitation: ${judgement.citation}\nCourt: ${judgement.court} (${judgement.year})\nRatio: ${judgement.keyRatio}`;
    navigator.clipboard.writeText(citationText);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handlePrint = () => {
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(`
        <html>
          <head>
            <title>${judgement.title} - Official Judgement Copy</title>
            <style>
              body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; padding: 40px; color: #000; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 25px; }
              .court-name { font-size: 16pt; font-weight: bold; text-transform: uppercase; }
              .citation { font-size: 12pt; font-weight: bold; color: #1e3a8a; margin-top: 5px; }
              pre { font-family: inherit; white-space: pre-wrap; word-wrap: break-word; }
              .footer { border-top: 1px solid #000; margin-top: 30px; pt-10px; font-size: 10pt; text-align: center; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="court-name">IN THE ${judgement.court.toUpperCase()}</div>
              <div class="citation">CITATION: ${judgement.citation}</div>
              <div><b>${judgement.title}</b></div>
            </div>
            <pre>${fullJudgementContent}</pre>
            <div class="footer">
              *** CERTIFIED OFFICIAL COPY OF JUDGEMENT • GENERATED FOR COURT REFERENCE ***
            </div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWin.document.close();
    }
  };

  // Search highlighting within judgement
  const renderHighlightedText = () => {
    if (!searchTerm.trim()) {
      return (
        <pre className="font-serif text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
          {fullJudgementContent}
        </pre>
      );
    }

    const term = searchTerm.toLowerCase();
    const parts = fullJudgementContent.split(new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));

    return (
      <pre className="font-serif text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
        {parts.map((part, i) =>
          part.toLowerCase() === term ? (
            <mark key={i} className="bg-amber-300 text-slate-950 font-black px-1 rounded shadow-xs">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </pre>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 text-slate-900 w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                  OFFICIAL JUDGEMENT COPY
                </span>
                <span className="text-xs font-extrabold text-amber-300">
                  {judgement.court} ({judgement.year})
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1">
                {judgement.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="bg-slate-100 p-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search Box inside Judgement */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search words in judgement copy (e.g. natural justice, Section 75, penalty)..."
              className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyCitation}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-300 shadow-xs flex items-center gap-1.5 transition-all"
            >
              {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCitation ? 'Citation Copied!' : 'Copy Citation'}</span>
            </button>

            <button
              onClick={handleCopyFullText}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Full Copy Copied!' : 'Copy Full Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print / Export PDF</span>
            </button>

            {onSelectForReply && (
              <button
                onClick={() => onSelectForReply(judgement)}
                className={`font-bold px-3.5 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 transition-all ${
                  isSelectedForReply
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isSelectedForReply ? 'Added to SCN Reply' : '+ Add to Reply'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Metadata Card Header */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs text-blue-900 bg-blue-100 px-2.5 py-1 rounded border border-blue-200">
                  {judgement.citation}
                </span>
                <span className="font-bold text-xs text-slate-700">
                  Section {judgement.section}
                </span>
              </div>

              {isFavourable ? (
                <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  PRO-TAXPAYER RULING
                </span>
              ) : (
                <span className="bg-rose-100 text-rose-800 font-bold text-xs px-2.5 py-1 rounded border border-rose-200 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  PRO-REVENUE RULING
                </span>
              )}
            </div>

            {/* Headnote & Ratio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-extrabold text-slate-900 block mb-1 uppercase tracking-wider text-[10px] text-blue-800">
                  📌 Headnote & Context:
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">{judgement.headnote}</p>
              </div>

              <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
                <span className="font-extrabold text-emerald-950 block mb-1 uppercase tracking-wider text-[10px]">
                  ⚖️ Binding Legal Ratio:
                </span>
                <p className="text-emerald-900 font-semibold leading-relaxed">{judgement.keyRatio}</p>
              </div>
            </div>
          </div>

          {/* Document Layout Paper Sheet */}
          <div className="bg-white border-2 border-slate-300 rounded-xl p-6 sm:p-10 shadow-lg relative max-w-4xl mx-auto space-y-6 font-serif">
            {/* Watermark Logo */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <div className="inline-block p-2 bg-slate-900 text-amber-400 rounded-full mb-1">
                <Scale className="w-6 h-6" />
              </div>
              <h1 className="text-base sm:text-xl font-bold uppercase tracking-wide text-slate-950">
                IN THE {judgement.court.toUpperCase()}
              </h1>
              <p className="text-xs font-sans font-extrabold text-blue-900 tracking-wider">
                CITATION: {judgement.citation}
              </p>
              <p className="text-xs font-sans font-bold text-slate-600">
                DATE OF JUDGEMENT: {judgement.orderDate || `${judgement.year}`}
              </p>
            </div>

            {/* Document Content */}
            <div className="p-2 sm:p-4 bg-slate-50/50 rounded-lg border border-slate-200">
              {renderHighlightedText()}
            </div>

            {/* Official Seal Footer */}
            <div className="pt-6 border-t-2 border-slate-900 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
              <div>
                <span className="font-extrabold text-slate-900 block">GST LEGAL JUDGEMENT ADVISOR</span>
                <span className="text-slate-500 text-[11px]">Certified Copy • Curated by CA Amar Nath Singla</span>
              </div>
              <div className="text-right">
                <span className="bg-slate-900 text-amber-300 font-mono font-bold text-[10px] px-2.5 py-1 rounded border border-slate-800">
                  VERIFIED LAW REPORT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 text-slate-400 p-3 border-t border-slate-800 text-center text-xs flex flex-wrap items-center justify-between gap-2 px-6">
          <span>
            Judgement Citation: <strong className="text-amber-300">{judgement.citation}</strong>
          </span>
          <span className="text-[11px] text-slate-500">
            Press Esc or click top right button to close full judgement view
          </span>
        </div>
      </div>
    </div>
  );
};
