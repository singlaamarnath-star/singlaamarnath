import React, { useState } from 'react';
import { Judgement } from '../types';
import { JudgementCard } from './JudgementCard';
import { Library, Search, X, Sparkles, Filter, RefreshCw, Bookmark } from 'lucide-react';

interface MasterLibraryProps {
  judgements: Judgement[];
  onSelectForReply: (judgement: Judgement) => void;
  selectedReplyJudgementIds: string[];
  onHoverJudgement?: (judgement: Judgement | null) => void;
  hoveredJudgementId?: string | null;
  onViewFullCopy?: (judgement: Judgement) => void;
  bookmarkedJudgementIds?: string[];
  onToggleBookmark?: (judgement: Judgement) => void;
}

export const MasterLibrary: React.FC<MasterLibraryProps> = ({
  judgements,
  onSelectForReply,
  selectedReplyJudgementIds,
  onHoverJudgement,
  hoveredJudgementId,
  onViewFullCopy,
  bookmarkedJudgementIds = [],
  onToggleBookmark,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourt, setSelectedCourt] = useState<string>('ALL');
  const [selectedSection, setSelectedSection] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [favouritesOnly, setFavouritesOnly] = useState<boolean>(false);

  const filtered = judgements.filter((j) => {
    if (favouritesOnly && !bookmarkedJudgementIds.includes(j.id)) {
      return false;
    }

    const query = searchTerm.trim().toLowerCase();
    
    // Real-time text match across title, court name, legal subject/section, citation, key ratio, headnote & tags
    const matchesSearch =
      !query ||
      j.title.toLowerCase().includes(query) ||
      j.court.toLowerCase().includes(query) ||
      j.section.toLowerCase().includes(query) ||
      j.citation.toLowerCase().includes(query) ||
      j.keyRatio.toLowerCase().includes(query) ||
      j.headnote.toLowerCase().includes(query) ||
      j.noticeContext.toLowerCase().includes(query) ||
      j.tags.some((t) => t.toLowerCase().includes(query));

    const matchesCourt =
      selectedCourt === 'ALL'
        ? true
        : selectedCourt === 'SC'
        ? j.court === 'Supreme Court'
        : selectedCourt === 'HC'
        ? j.court !== 'Supreme Court' && !j.court.includes('GSTAT') && !j.court.includes('AAR')
        : j.court === selectedCourt;

    const matchesSection = selectedSection === 'ALL' || j.section.toLowerCase().includes(selectedSection.toLowerCase());

    const matchesType =
      selectedType === 'ALL' || (selectedType === 'FAV' ? j.type === 'favourable' : j.type === 'unfavourable');

    return matchesSearch && matchesCourt && matchesSection && matchesType;
  });

  const handleClearAll = () => {
    setSearchTerm('');
    setSelectedCourt('ALL');
    setSelectedSection('ALL');
    setSelectedType('ALL');
    setFavouritesOnly(false);
  };

  const quickFilterChips = [
    { label: '🔥 Daily Digest (Aug 2026)', query: 'GSTIndiaPathway' },
    { label: '🏛️ Supreme Court', query: 'Supreme Court' },
    { label: '⚖️ Delhi High Court', query: 'Delhi High Court' },
    { label: 'Madras High Court', query: 'Madras High Court' },
    { label: 'Orissa High Court', query: 'Orissa High Court' },
    { label: 'Sec 169 Notice Service', query: '169' },
    { label: 'Sec 75(4) Natural Justice', query: '75(4)' },
    { label: 'Sec 17(5) Safari Retreats', query: 'Safari Retreats' },
    { label: 'Sec 128A Amnesty', query: '128A' },
    { label: 'GSTR-2A/3B Mismatch', query: '2A' },
    { label: 'E-Way Bill Sec 129', query: '129' },
  ];

  return (
    <div className="space-y-5">
      {/* Search Bar & Filters Header */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg shrink-0">
              <Library className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Master GST Judgements Library (Supreme Court & High Courts)
              </h3>
              <p className="text-xs text-slate-500">
                Real-time legal database containing landmark precedents on GST SCNs, Natural Justice, Extended Limitation & ITC.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* My Favourites Toggle Button */}
            <button
              onClick={() => setFavouritesOnly((prev) => !prev)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md border transition-all ${
                favouritesOnly
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
              }`}
              title="Filter by My Saved Favourites"
            >
              <Bookmark className={`w-3.5 h-3.5 ${favouritesOnly ? 'fill-slate-950' : 'fill-amber-400 text-amber-600'}`} />
              <span>My Favourites ({bookmarkedJudgementIds.length})</span>
            </button>

            <span className="bg-slate-900 text-white font-bold text-xs px-3 py-1.5 rounded-md">
              Showing {filtered.length} of {judgements.length} Judgements
            </span>
            {(searchTerm || selectedCourt !== 'ALL' || selectedSection !== 'ALL' || selectedType !== 'ALL' || favouritesOnly) && (
              <button
                onClick={handleClearAll}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Real-time Text Filter Field */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-blue-600" />
              Real-time Judgment Filter (Title, Court Name, or Legal Subject)
            </span>
            {searchTerm && (
              <span className="text-[11px] font-semibold text-blue-600 lowercase">
                filtering for &quot;{searchTerm}&quot;
              </span>
            )}
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type case title (e.g., Safari Retreats), court name (e.g., Delhi High Court), or legal topic (e.g., Section 75(4)..."
              className="w-full text-sm pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium transition-all shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Quick Search:
            </span>
            {quickFilterChips.map((chip) => {
              const isActive = searchTerm.toLowerCase() === chip.query.toLowerCase();
              return (
                <button
                  key={chip.label}
                  onClick={() => setSearchTerm(isActive ? '' : chip.query)}
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          {/* Court Dropdown Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Filter by Court Forum:</label>
            <select
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="ALL">All Courts (Supreme & High Courts)</option>
              <option value="SC">Supreme Court of India Only</option>
              <option value="HC">All High Courts</option>
              <option value="Allahabad High Court">Allahabad High Court</option>
              <option value="Bombay High Court">Bombay High Court</option>
              <option value="Calcutta High Court">Calcutta High Court</option>
              <option value="Delhi High Court">Delhi High Court</option>
              <option value="Gujarat High Court">Gujarat High Court</option>
              <option value="Karnataka High Court">Karnataka High Court</option>
              <option value="Kerala High Court">Kerala High Court</option>
              <option value="Madras High Court">Madras High Court</option>
              <option value="Orissa High Court">Orissa High Court</option>
              <option value="Patna High Court">Patna High Court</option>
              <option value="Rajasthan High Court">Rajasthan High Court</option>
              <option value="Telangana High Court">Telangana High Court</option>
              <option value="Other High Court">Uttarakhand & Other High Courts</option>
            </select>
          </div>

          {/* Section Dropdown Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Filter by Statutory Section:</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="ALL">All GST Statutory Sections</option>
              <option value="169">Section 169 Service of Notice</option>
              <option value="75(4)">Section 75(4) Personal Hearing</option>
              <option value="74">Section 74 Extended Limitation</option>
              <option value="16(4)">Section 16(4) ITC Time Limit</option>
              <option value="128A">Section 128A Amnesty Scheme</option>
              <option value="129">Section 129/130 E-way Bill</option>
              <option value="83">Section 83 Provisional Attachment</option>
              <option value="67">Section 67/70 Search & Summons</option>
              <option value="17(5)">Section 17(5) Blocked Credit</option>
              <option value="2A">2A vs 3B / Suncraft</option>
              <option value="Cancellation">Registration Cancellation</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Filter by Ruling Outcome:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="ALL">All Precedents (Favourable & Adverse)</option>
              <option value="FAV">Favourable Judgements Only 🟢</option>
              <option value="ADV">Adverse Precedents Only 🔴</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Judgement Cards or Empty State */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((j) => (
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
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-10 border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            {favouritesOnly ? <Bookmark className="w-6 h-6 text-amber-500" /> : <Search className="w-6 h-6" />}
          </div>
          <h4 className="text-base font-bold text-slate-800">
            {favouritesOnly ? 'No Saved Favourites Yet' : 'No Judgments Found'}
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {favouritesOnly
              ? 'You have not saved any judgements to your favourites yet. Click the "Save" bookmark button on any judgement card to add it to your favourites list.'
              : `No precedents matched your search query "${searchTerm}" or filter criteria. Try searching for broader terms like "Delhi", "Supreme", "75(4)", or "ITC".`}
          </p>
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

