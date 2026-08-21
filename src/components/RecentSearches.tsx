import React, { useState } from 'react';
import { RecentSearchItem } from '../types';
import { Clock, RotateCcw, Trash2, ChevronRight, X, Sparkles, Check, FileText } from 'lucide-react';

interface RecentSearchesProps {
  recentSearches: RecentSearchItem[];
  onSelectSearch: (item: RecentSearchItem) => void;
  onDeleteSearch: (id: string) => void;
  onClearAll: () => void;
  currentActiveId?: string;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  recentSearches,
  onSelectSearch,
  onDeleteSearch,
  onClearAll,
  currentActiveId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [restoredId, setRestoredId] = useState<string | null>(null);

  const handleSelect = (item: RecentSearchItem) => {
    onSelectSearch(item);
    setRestoredId(item.id);
    setIsOpen(false);
    setTimeout(() => setRestoredId(null), 2500);
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-xs px-3 py-2 rounded-lg transition-all shadow-sm group"
        title="View Recent Analysis & Search Sessions"
      >
        <Clock className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Recent Searches</span>
        <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
          {recentSearches.length}
        </span>
      </button>

      {/* Dropdown Menu / Sidebar Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Panel */}
          <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Header */}
            <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Recent Analysis Sessions (Last 5)
                </h4>
              </div>
              <div className="flex items-center gap-2">
                {recentSearches.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-[10px] text-slate-400 hover:text-rose-400 font-medium transition-colors flex items-center gap-1"
                    title="Clear all search history"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List Body */}
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1.5">
              {recentSearches.length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold">No recent searches saved yet.</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Select sections or run notice analysis to store sessions here.
                  </p>
                </div>
              ) : (
                recentSearches.map((item) => {
                  const isActive = currentActiveId === item.id;
                  const isJustRestored = restoredId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`group p-3 rounded-lg border transition-all ${
                        isActive || isJustRestored
                          ? 'bg-blue-50/90 border-blue-300 ring-1 ring-blue-400'
                          : 'bg-slate-50/60 hover:bg-white hover:border-slate-300 border-slate-200/80 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => handleSelect(item)}
                        >
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <span className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">
                              Sec {item.section}
                            </span>
                            <span className="bg-slate-200 text-slate-800 font-semibold text-[10px] px-1.5 py-0.5 rounded">
                              {item.noticeForm}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">
                              {item.financialYear}
                            </span>
                            <span className="text-[10px] text-slate-400 ml-auto font-medium">
                              {formatTimeAgo(item.timestamp)}
                            </span>
                          </div>

                          <p className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {item.primaryIssue || 'GST Notice Session'}
                          </p>

                          {item.disputeAmount && (
                            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                              Amount: <span className="text-slate-800 font-semibold">{item.disputeAmount}</span>
                            </p>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            onClick={() => handleSelect(item)}
                            className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-xs"
                            title="Restore session state"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteSearch(item.id);
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete this history entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Clickable footer bar */}
                      <div
                        onClick={() => handleSelect(item)}
                        className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline"
                      >
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>Load Section & Analysis Data</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer summary */}
            <div className="bg-slate-50 p-2.5 text-center border-t border-slate-200 text-[11px] text-slate-500">
              Click any item above to reload that analysis session instantly.
            </div>
          </div>
        </>
      )}
    </div>
  );
};
