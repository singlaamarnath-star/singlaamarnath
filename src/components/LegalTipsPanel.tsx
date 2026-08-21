import React, { useState, useEffect } from 'react';
import {
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldCheck,
  FileCheck2,
  Scale,
  Copy,
  Check,
  PlusCircle,
  FileText,
  AlertTriangle,
  Info,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { getLegalTipsForSection, GST_LEGAL_TIPS, LegalTipItem } from '../data/legalTipsData';
import { GstSection } from '../types';

interface LegalTipsPanelProps {
  section: GstSection | string;
  onApplyClause?: (clauseText: string) => void;
  onSelectSection?: (newSection: string) => void;
  initialCollapsed?: boolean;
}

export const LegalTipsPanel: React.FC<LegalTipsPanelProps> = ({
  section,
  onApplyClause,
  onSelectSection,
  initialCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(initialCollapsed);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedMaxims, setCopiedMaxims] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'defenses' | 'circulars' | 'case-law'>('defenses');
  const [selectedTipKey, setSelectedTipKey] = useState<string>('');

  // Sync selected section with legal tips data
  useEffect(() => {
    const tip = getLegalTipsForSection(section);
    setSelectedTipKey(tip.sectionKey);
  }, [section]);

  const currentTip: LegalTipItem = GST_LEGAL_TIPS[selectedTipKey] || getLegalTipsForSection(section);

  const handleCopyClause = () => {
    if (!currentTip.keyDraftingClause) return;
    navigator.clipboard.writeText(currentTip.keyDraftingClause);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2000);
  };

  const handleCopyMaxims = () => {
    const text = currentTip.keyMaximsAndDoctrines.map((m, idx) => `${idx + 1}. ${m}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedMaxims(true);
    setTimeout(() => setCopiedMaxims(false), 2000);
  };

  const handleInsertIntoForm = () => {
    if (onApplyClause && currentTip.keyDraftingClause) {
      onApplyClause(currentTip.keyDraftingClause);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Natural Justice':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'ITC & Scrutiny':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Limitation & Fraud':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'Transit & E-Way':
        return 'bg-teal-100 text-teal-900 border-teal-300';
      case 'Recovery & Attachment':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Notices & Service':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Appeals & Refunds':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden transition-all duration-300">
      {/* Header Bar */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-slate-200">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
              <Lightbulb className="w-4 h-4 fill-slate-950" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Legal Tips & Statutory Reminders
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(
                    currentTip.category
                  )}`}
                >
                  {currentTip.category}
                </span>
              </div>
              <p className="text-xs text-slate-600 truncate mt-0.5">
                Statutory guardrails for <span className="font-bold text-blue-700">{currentTip.sectionKey}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
              title={isCollapsed ? 'Expand Legal Tips' : 'Collapse Legal Tips'}
              aria-label={isCollapsed ? 'Expand Legal Tips' : 'Collapse Legal Tips'}
            >
              <span className="hidden sm:inline text-[11px] text-slate-600">
                {isCollapsed ? 'Expand' : 'Collapse'}
              </span>
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Quick Section Switcher Bar */}
        {!isCollapsed && (
          <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap mr-1">Switch:</span>
            {['75(4)', '73', '74', '16(4)', '2A vs 3B Mismatch', '129', '83', '169', '54', '50', '29', '107', '67', '86A'].map(
              (secKey) => (
                <button
                  key={secKey}
                  onClick={() => {
                    setSelectedTipKey(secKey);
                    if (onSelectSection) onSelectSection(secKey);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold whitespace-nowrap transition-colors border ${
                    selectedTipKey === secKey
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {secKey}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Collapsed Compact State Preview */}
      {isCollapsed && (
        <div className="p-3.5 bg-slate-50 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-slate-800">
              <strong>Quick Tip ({currentTip.sectionKey}):</strong> {currentTip.keyMaximsAndDoctrines[0]}
            </span>
          </div>
          <button
            onClick={() => setIsCollapsed(false)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 whitespace-nowrap underline"
          >
            Show full tips →
          </button>
        </div>
      )}

      {/* Expanded Main Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4 text-xs">
          {/* Statutory Rule Banner */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 relative">
            <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>Statutory Rule & Mandate:</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11.5px]">{currentTip.statutoryRule}</p>
          </div>

          {/* Quick Metrics Grid (Limitation & Burden) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Limitation & Deadlines */}
            <div className="bg-amber-50/70 rounded-lg p-2.5 border border-amber-200">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Limitation & Deadlines</span>
              </div>
              <p className="text-amber-950 text-[11px] leading-relaxed font-medium">
                {currentTip.timeLimitOrLimitation}
              </p>
            </div>

            {/* Burden of Proof */}
            <div className="bg-blue-50/70 rounded-lg p-2.5 border border-blue-200">
              <div className="flex items-center gap-1.5 text-blue-900 font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>Evidentiary Burden</span>
              </div>
              <p className="text-blue-950 text-[11px] leading-relaxed font-medium">
                {currentTip.burdenOfProof}
              </p>
            </div>
          </div>

          {/* Key Legal Maxims & Doctrines */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                <BookOpen className="w-3.5 h-3.5 text-slate-700" />
                <span>Key Maxims & Judicial Doctrines:</span>
              </div>
              <button
                onClick={handleCopyMaxims}
                className="text-[10px] text-slate-500 hover:text-blue-600 flex items-center gap-1 font-semibold"
                title="Copy all maxims"
              >
                {copiedMaxims ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedMaxims ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="space-y-1.5">
              {currentTip.keyMaximsAndDoctrines.map((maxim, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-slate-50/90 rounded p-2 border border-slate-200/80 text-[11px] text-slate-800"
                >
                  <span className="font-bold text-blue-600 shrink-0">{idx + 1}.</span>
                  <span className="leading-snug">{maxim}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Tabs: Procedural Defenses vs Circulars vs Landmark Case Laws */}
          <div>
            <div className="flex items-center border-b border-slate-200 gap-2 mb-2.5">
              <button
                onClick={() => setActiveSubTab('defenses')}
                className={`pb-1.5 text-[11px] font-bold transition-colors border-b-2 flex items-center gap-1 ${
                  activeSubTab === 'defenses'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileCheck2 className="w-3 h-3" />
                <span>Procedural Defenses ({currentTip.proceduralDefenses.length})</span>
              </button>
              <button
                onClick={() => setActiveSubTab('circulars')}
                className={`pb-1.5 text-[11px] font-bold transition-colors border-b-2 flex items-center gap-1 ${
                  activeSubTab === 'circulars'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>CBIC Circulars ({currentTip.mandatoryCirculars.length})</span>
              </button>
              <button
                onClick={() => setActiveSubTab('case-law')}
                className={`pb-1.5 text-[11px] font-bold transition-colors border-b-2 flex items-center gap-1 ${
                  activeSubTab === 'case-law'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Scale className="w-3 h-3" />
                <span>Key Precedents ({currentTip.landmarkPrecedents.length})</span>
              </button>
            </div>

            {/* Sub-Tab 1: Procedural Defenses */}
            {activeSubTab === 'defenses' && (
              <div className="space-y-1.5">
                {currentTip.proceduralDefenses.map((def, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-emerald-50/50 border border-emerald-200/80 rounded p-2 text-[11px] text-emerald-950"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                    <span className="leading-snug">{def}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-Tab 2: Circulars */}
            {activeSubTab === 'circulars' && (
              <div className="space-y-2">
                {currentTip.mandatoryCirculars.map((circ, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded p-2.5 space-y-1 text-[11px]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-blue-700">{circ.number}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">
                        {circ.title}
                      </span>
                    </div>
                    <p className="text-slate-700 text-[10.5px] leading-relaxed">{circ.keyPoint}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-Tab 3: Landmark Precedents */}
            {activeSubTab === 'case-law' && (
              <div className="space-y-2">
                {currentTip.landmarkPrecedents.map((precedent, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded p-2.5 space-y-1 text-[11px]"
                  >
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <h5 className="font-bold text-slate-900 text-xs">{precedent.caseTitle}</h5>
                      <span className="text-[10px] bg-purple-100 text-purple-900 border border-purple-200 px-1.5 py-0.5 rounded font-bold">
                        {precedent.court}
                      </span>
                    </div>
                    <div className="text-[10.5px] font-semibold text-blue-700">{precedent.citation}</div>
                    <p className="text-slate-700 text-[10.5px] leading-relaxed font-medium bg-white p-1.5 rounded border border-slate-100">
                      <strong>Ratio:</strong> {precedent.ratio}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Copyable Legal Defense Ground Excerpt */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-lg p-3 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Proven Legal Ground Clause:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyClause}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold rounded flex items-center gap-1 border border-slate-700 transition-colors"
                >
                  {copiedClause ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Clause</span>
                    </>
                  )}
                </button>

                {onApplyClause && (
                  <button
                    onClick={handleInsertIntoForm}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded flex items-center gap-1 transition-colors"
                    title="Insert this clause into Notice Allegation Details in the form"
                  >
                    <PlusCircle className="w-3 h-3" />
                    <span>Insert in Form</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed italic bg-slate-800/60 p-2 rounded border border-slate-700/50">
              "{currentTip.keyDraftingClause}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
