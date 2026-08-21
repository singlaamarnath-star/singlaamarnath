import React, { useState } from 'react';
import { Judgement, GstSection } from '../types';
import { JudgementCard } from './JudgementCard';
import { ShieldCheck, ShieldAlert, Search, Filter, Scale } from 'lucide-react';

interface ComparisonMatrixProps {
  judgements: Judgement[];
  selectedSection: GstSection;
  onSelectForReply: (judgement: Judgement) => void;
  selectedReplyJudgementIds: string[];
  onHoverJudgement?: (judgement: Judgement | null) => void;
  hoveredJudgementId?: string | null;
  onViewFullCopy?: (judgement: Judgement) => void;
  bookmarkedJudgementIds?: string[];
  onToggleBookmark?: (judgement: Judgement) => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  judgements,
  selectedSection,
  onSelectForReply,
  selectedReplyJudgementIds,
  onHoverJudgement,
  hoveredJudgementId,
  onViewFullCopy,
  bookmarkedJudgementIds = [],
  onToggleBookmark,
}) => {
  const [courtFilter, setCourtFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredJudgements = judgements.filter((j) => {
    const matchesCourt =
      courtFilter === 'ALL'
        ? true
        : courtFilter === 'SC'
        ? j.court === 'Supreme Court'
        : j.court !== 'Supreme Court';
    const matchesSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.keyRatio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.section.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourt && matchesSearch;
  });

  const favourableList = filteredJudgements.filter((j) => j.type === 'favourable');
  const unfavourableList = filteredJudgements.filter((j) => j.type === 'unfavourable');

  return (
    <div className="space-y-5">
      {/* Search & Filter Header */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Judgement Comparison Matrix for {selectedSection === 'OTHER' ? 'Custom Section' : `Section ${selectedSection}`}
            </h3>
            <p className="text-xs text-slate-500">
              Side-by-side analysis of Favourable judgements to cite vs Adverse precedents to distinguish
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-52">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search case title or keyword..."
              className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded-md bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Court Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md border border-slate-200 text-xs">
            <Filter className="w-3 h-3 text-slate-500" />
            <button
              onClick={() => setCourtFilter('ALL')}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition-all ${
                courtFilter === 'ALL' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              All Courts ({filteredJudgements.length})
            </button>
            <button
              onClick={() => setCourtFilter('SC')}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition-all ${
                courtFilter === 'SC' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Supreme Court
            </button>
            <button
              onClick={() => setCourtFilter('HC')}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition-all ${
                courtFilter === 'HC' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              High Courts
            </button>
          </div>
        </div>
      </div>

      {/* Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAVOURABLE COLUMN */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between bg-slate-900 text-white p-3.5 rounded-t-xl border-b-2 border-emerald-500">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded uppercase tracking-wider">
                PRO-TAXPAYER
              </span>
              <h4 className="font-bold text-sm">Favourable Judgements</h4>
            </div>
            <span className="bg-emerald-950 text-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded border border-emerald-800">
              {favourableList.length} Cases
            </span>
          </div>

          <div className="flex-1 bg-emerald-50/30 border border-slate-200 rounded-b-xl p-4 space-y-4">
            {favourableList.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center border border-slate-200 text-slate-500">
                <p className="text-sm font-semibold">No favourable judgements found matching current filter.</p>
                <p className="text-xs mt-1">Try switching to "All Courts" or clearing the search box.</p>
              </div>
            ) : (
              favourableList.map((j) => (
                <JudgementCard
                  key={j.id}
                  judgement={j}
                  onSelectForReply={onSelectForReply}
                  isSelectedForReply={selectedReplyJudgementIds.includes(j.id)}
                  onHoverJudgement={onHoverJudgement}
                  isHovered={hoveredJudgementId === j.id}
                  onViewFullCopy={onViewFullCopy}
                  onToggleBookmark={onToggleBookmark}
                  isBookmarked={bookmarkedJudgementIds.includes(j.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* UNFAVOURABLE COLUMN */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between bg-slate-900 text-white p-3.5 rounded-t-xl border-b-2 border-rose-500">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold text-[10px] rounded uppercase tracking-wider">
                PRO-REVENUE
              </span>
              <h4 className="font-bold text-sm">Adverse Precedents (To Distinguish)</h4>
            </div>
            <span className="bg-rose-950 text-rose-200 text-xs font-bold px-2.5 py-0.5 rounded border border-rose-800">
              {unfavourableList.length} Cases
            </span>
          </div>

          <div className="flex-1 bg-rose-50/30 border border-slate-200 rounded-b-xl p-4 space-y-4">
            {unfavourableList.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center border border-slate-200 text-slate-500">
                <p className="text-sm font-semibold">No adverse precedents recorded for this section.</p>
                <p className="text-xs mt-1">This section is heavily settled in favour of taxpayers!</p>
              </div>
            ) : (
              unfavourableList.map((j) => (
                <JudgementCard
                  key={j.id}
                  judgement={j}
                  onSelectForReply={onSelectForReply}
                  isSelectedForReply={selectedReplyJudgementIds.includes(j.id)}
                  onHoverJudgement={onHoverJudgement}
                  isHovered={hoveredJudgementId === j.id}
                  onViewFullCopy={onViewFullCopy}
                  onToggleBookmark={onToggleBookmark}
                  isBookmarked={bookmarkedJudgementIds.includes(j.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
