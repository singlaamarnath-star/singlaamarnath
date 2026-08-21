import React from 'react';
import { RecentSearchItem } from '../types';
import { Clock, RotateCcw, Sparkles, ChevronRight, History } from 'lucide-react';

interface RecentSearchesBarProps {
  recentSearches: RecentSearchItem[];
  onSelectSearch: (item: RecentSearchItem) => void;
  activeSearchId?: string;
}

export const RecentSearchesBar: React.FC<RecentSearchesBarProps> = ({
  recentSearches,
  onSelectSearch,
  activeSearchId,
}) => {
  if (!recentSearches || recentSearches.length === 0) return null;

  return (
    <div className="bg-slate-900 text-white rounded-xl p-3 shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2 shrink-0">
        <div className="p-1.5 bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/30">
          <History className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-200 block">Recent Analysis Sessions:</span>
          <span className="text-[10px] text-slate-400">Click any chip to reload previous section & notice parameters</span>
        </div>
      </div>

      {/* Chips list */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {recentSearches.slice(0, 5).map((item) => {
          const isActive = activeSearchId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectSearch(item)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-blue-400/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/80 hover:text-white'
              }`}
            >
              <span className="bg-slate-950/50 text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                Sec {item.section}
              </span>
              <span className="truncate max-w-[140px] font-medium">
                {item.noticeForm}
              </span>
              <RotateCcw className="w-3 h-3 text-slate-400 hover:text-white shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
