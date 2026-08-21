import React, { useState } from 'react';
import { Judgement } from '../types';
import { CheckCircle2, XCircle, Copy, Check, ChevronDown, ChevronUp, BookOpen, Quote, ShieldAlert, FileText, Eye, Bookmark, BookmarkCheck } from 'lucide-react';

interface JudgementCardProps {
  judgement: Judgement;
  onSelectForReply?: (judgement: Judgement) => void;
  isSelectedForReply?: boolean;
  onHoverJudgement?: (judgement: Judgement | null) => void;
  isHovered?: boolean;
  onViewFullCopy?: (judgement: Judgement) => void;
  onToggleBookmark?: (judgement: Judgement) => void;
  isBookmarked?: boolean;
}

export const JudgementCard: React.FC<JudgementCardProps> = ({
  judgement,
  onSelectForReply,
  isSelectedForReply = false,
  onHoverJudgement,
  isHovered = false,
  onViewFullCopy,
  onToggleBookmark,
  isBookmarked = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [showParas, setShowParas] = useState(false);

  const isFavourable = judgement.type === 'favourable';

  const copyCitation = () => {
    const textToCopy = `${judgement.title} - ${judgement.citation} (${judgement.court})\nRatio: ${judgement.keyRatio}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => onHoverJudgement?.(judgement)}
      onMouseLeave={() => onHoverJudgement?.(null)}
      className={`bg-white rounded-lg border p-5 transition-all duration-200 shadow-sm hover:shadow-md ${
        isHovered
          ? 'ring-2 ring-amber-400 bg-amber-50/40 border-amber-300 shadow-lg scale-[1.01]'
          : 'border-slate-200'
      } ${isFavourable ? 'border-t-4 border-t-emerald-500' : 'border-t-4 border-t-rose-500'}`}
    >
      {/* Top Badge & Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {isFavourable ? (
            <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              PRO-TAXPAYER
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-0.5 bg-rose-100 text-rose-800 font-bold text-[10px] rounded uppercase tracking-wider">
              <XCircle className="w-3.5 h-3.5 text-rose-700" />
              PRO-REVENUE
            </span>
          )}

          <span className="bg-slate-900 text-slate-100 font-bold text-xs px-2.5 py-0.5 rounded">
            {judgement.court} ({judgement.year})
          </span>
          <span className="bg-blue-100 text-blue-900 font-bold text-xs px-2.5 py-0.5 rounded">
            {judgement.section}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(judgement)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded transition-all border ${
                isBookmarked
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-400 font-bold shadow-xs'
                  : 'bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border-slate-300'
              }`}
              title={isBookmarked ? 'Remove from My Favourites' : 'Save to My Favourites (Dashboard)'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-700 fill-amber-500" />
              ) : (
                <Bookmark className="w-3.5 h-3.5 text-slate-500" />
              )}
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
          )}

          {onViewFullCopy && (
            <button
              onClick={() => onViewFullCopy(judgement)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 border border-amber-500 px-3 py-1 rounded shadow-xs transition-all"
              title="View & Download Full Verbatim Judgement Copy"
            >
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              <span>Full Judgement Copy</span>
            </button>
          )}

          <button
            onClick={copyCitation}
            className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 px-2.5 py-1 rounded transition-colors"
            title="Copy Citation & Key Ratio"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Citation'}</span>
          </button>

          {onSelectForReply && (
            <button
              onClick={() => onSelectForReply(judgement)}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded transition-all ${
                isSelectedForReply
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isSelectedForReply ? 'Added to Reply' : '+ Add to Reply'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Title & Citation */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
        {judgement.title}
      </h3>
      <div className="text-xs font-bold text-blue-700 mt-0.5 tracking-wide flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>Citation: {judgement.citation}</span>
        {judgement.orderDate && (
          <span className="text-slate-500 font-semibold">• Order Date: {judgement.orderDate}</span>
        )}
      </div>

      {/* Case Details Strip (Bench, Case No) */}
      {(judgement.bench || judgement.caseNo) && (
        <div className="mt-2 bg-slate-50/80 rounded-md px-2.5 py-1.5 border border-slate-200/80 text-[11px] text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
          {judgement.bench && (
            <div>
              <span className="font-bold text-slate-700">Coram / Bench:</span> {judgement.bench}
            </div>
          )}
          {judgement.caseNo && (
            <div>
              <span className="font-bold text-slate-700">Case No:</span> {judgement.caseNo}
            </div>
          )}
        </div>
      )}

      {/* Headnote */}
      <p className="text-xs text-slate-700 mt-2 font-medium leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
        <span className="font-bold text-slate-900">Headnote / Context: </span>
        {judgement.headnote}
      </p>

      {/* Key Ratio */}
      <div className={`mt-3 p-3 rounded border ${isFavourable ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'}`}>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1 mb-1">
          <Quote className={`w-3.5 h-3.5 ${isFavourable ? 'text-emerald-700' : 'text-rose-700'}`} />
          Legal Ratio / Court Holding:
        </h4>
        <p className="text-xs text-slate-800 font-semibold leading-relaxed">
          {judgement.keyRatio}
        </p>
      </div>

      {/* HOW TO DISTINGUISH (If Unfavourable) */}
      {!isFavourable && judgement.distinguishingGrounds && (
        <div className="mt-3 p-3 rounded bg-amber-50 border border-amber-300 text-amber-950">
          <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-amber-900 mb-1">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Strategic Insight: How to Distinguish this Adverse Ruling
          </h4>
          <p className="text-xs font-medium text-amber-900 leading-relaxed">
            {judgement.distinguishingGrounds}
          </p>
        </div>
      )}

      {/* Notice Application */}
      <div className="mt-2.5 text-[11px] text-slate-500 font-medium flex items-center gap-1">
        <span className="font-bold text-slate-700">Notice Application:</span>
        <span>{judgement.noticeContext}</span>
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-1.5 items-center">
        {judgement.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
          >
            #{tag}
          </span>
        ))}

        {judgement.importantParas && judgement.importantParas.length > 0 && (
          <button
            onClick={() => setShowParas(!showParas)}
            className="ml-auto text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>{showParas ? 'Hide Key Paras' : 'View Key Excerpts'}</span>
            {showParas ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Expandable Important Paragraphs */}
      {showParas && judgement.importantParas && (
        <div className="mt-3 p-3 bg-slate-900 text-slate-200 rounded text-xs space-y-2 border border-slate-700">
          <div className="font-bold text-amber-300 text-[11px] uppercase tracking-wider">
            Key Excerpts & Direct Quotes from Judgement:
          </div>
          {judgement.importantParas.map((para, i) => (
            <p key={i} className="pl-3 border-l-2 border-amber-400 text-slate-300 font-mono text-[11px] italic">
              "{para}"
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
