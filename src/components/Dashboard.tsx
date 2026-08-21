import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { Judgement } from '../types';
import { JudgementCard } from './JudgementCard';
import {
  Scale,
  TrendingUp,
  Award,
  ShieldCheck,
  ShieldAlert,
  Building2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Sparkles,
  Info,
  BookOpen,
  ArrowUpRight,
  Gavel,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Trash2,
  Search,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface DashboardProps {
  judgements: Judgement[];
  onSelectJudgementForReply?: (judgement: Judgement) => void;
  selectedReplyJudgementIds?: string[];
  onViewFullCopy?: (judgement: Judgement) => void;
  bookmarkedJudgementIds?: string[];
  onToggleBookmark?: (judgement: Judgement) => void;
  onClearAllBookmarks?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  judgements,
  onSelectJudgementForReply,
  selectedReplyJudgementIds = [],
  onViewFullCopy,
  bookmarkedJudgementIds = [],
  onToggleBookmark,
  onClearAllBookmarks,
}) => {
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('ALL');
  const [selectedForumFilter, setSelectedForumFilter] = useState<string>('ALL');
  const [forumViewMode, setForumViewMode] = useState<'category' | 'detailed_hc'>('category');

  // My Favourites state within Dashboard
  const [favSearchQuery, setFavSearchQuery] = useState<string>('');
  const [favTypeFilter, setFavTypeFilter] = useState<'ALL' | 'FAV' | 'ADV'>('ALL');
  const [copiedAllFavs, setCopiedAllFavs] = useState<boolean>(false);

  // Filtered favourites
  const favouriteJudgements = useMemo(() => {
    return judgements.filter((j) => bookmarkedJudgementIds.includes(j.id));
  }, [judgements, bookmarkedJudgementIds]);

  const filteredFavourites = useMemo(() => {
    return favouriteJudgements.filter((j) => {
      const q = favSearchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.court.toLowerCase().includes(q) ||
        j.section.toLowerCase().includes(q) ||
        j.citation.toLowerCase().includes(q) ||
        j.keyRatio.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q));

      const matchesType =
        favTypeFilter === 'ALL' || (favTypeFilter === 'FAV' ? j.type === 'favourable' : j.type === 'unfavourable');

      return matchesQuery && matchesType;
    });
  }, [favouriteJudgements, favSearchQuery, favTypeFilter]);

  // Copy all favourites citations to clipboard
  const handleCopyAllFavourites = () => {
    if (favouriteJudgements.length === 0) return;
    const text = favouriteJudgements
      .map(
        (j, index) =>
          `${index + 1}. ${j.title} - ${j.citation} (${j.court}, ${j.year})\n   [Section ${j.section}] [${j.type === 'favourable' ? 'Taxpayer Favourable' : 'Adverse Precedent'}]\n   Key Holding: ${j.keyRatio}\n`
      )
      .join('\n');

    navigator.clipboard.writeText(text);
    setCopiedAllFavs(true);
    setTimeout(() => setCopiedAllFavs(false), 2500);
  };

  // Add all favourites to active reply draft
  const handleAddAllFavouritesToReply = () => {
    if (!onSelectJudgementForReply) return;
    favouriteJudgements.forEach((j) => {
      if (!selectedReplyJudgementIds.includes(j.id)) {
        onSelectJudgementForReply(j);
      }
    });
  };

  const scrollToFavourites = () => {
    const el = document.getElementById('my-favourites-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter judgements based on current selection
  const filteredJudgements = useMemo(() => {
    return judgements.filter((j) => {
      // Section filter
      if (selectedSectionFilter !== 'ALL') {
        const sec = j.section.toLowerCase();
        const tags = j.tags.map((t) => t.toLowerCase()).join(' ');
        const target = selectedSectionFilter.toLowerCase();

        if (target === '73_74') {
          if (!sec.includes('73') && !sec.includes('74') && !tags.includes('73') && !tags.includes('74')) {
            return false;
          }
        } else if (target === 'itc') {
          if (
            !sec.includes('16') &&
            !sec.includes('17(5)') &&
            !sec.includes('2a') &&
            !sec.includes('3b') &&
            !tags.includes('itc') &&
            !tags.includes('credit')
          ) {
            return false;
          }
        } else if (target === '75(4)') {
          if (!sec.includes('75') && !tags.includes('75(4)') && !tags.includes('personal hearing')) {
            return false;
          }
        } else if (target === '129_130') {
          if (!sec.includes('129') && !sec.includes('130') && !tags.includes('129') && !tags.includes('eway')) {
            return false;
          }
        } else if (target === '54_refunds') {
          if (!sec.includes('54') && !sec.includes('refund') && !tags.includes('refund') && !tags.includes('export')) {
            return false;
          }
        } else if (target === 'amnesty_128a') {
          if (!sec.includes('128a') && !tags.includes('128a') && !tags.includes('amnesty')) {
            return false;
          }
        }
      }

      // Forum filter
      if (selectedForumFilter !== 'ALL') {
        const court = j.court;
        if (selectedForumFilter === 'Supreme Court' && court !== 'Supreme Court') return false;
        if (selectedForumFilter === 'High Courts' && !court.includes('High Court') && !court.includes('HC'))
          return false;
        if (selectedForumFilter === 'GSTAT' && !court.includes('GSTAT')) return false;
        if (selectedForumFilter === 'AAR' && !court.includes('AAR')) return false;
      }

      return true;
    });
  }, [judgements, selectedSectionFilter, selectedForumFilter]);

  // General KPI Aggregations
  const totalCount = filteredJudgements.length;
  const favourableCount = filteredJudgements.filter((j) => j.type === 'favourable').length;
  const adverseCount = totalCount - favourableCount;
  const winRatePercent = totalCount > 0 ? Math.round((favourableCount / totalCount) * 100) : 0;

  // Helper to categorize court forum into 4 primary buckets requested: Supreme Court, High Courts, GSTAT, AAR
  const getForumCategory = (court: string): 'Supreme Court' | 'High Courts' | 'GSTAT' | 'AAR / AAAR' | 'Other' => {
    if (court === 'Supreme Court' || court.toLowerCase().includes('supreme')) return 'Supreme Court';
    if (court.includes('GSTAT') || court.includes('Tribunal')) return 'GSTAT';
    if (court.includes('AAR') || court.includes('Advance Ruling')) return 'AAR / AAAR';
    if (court.includes('High Court') || court.includes('HC')) return 'High Courts';
    return 'Other';
  };

  // 1. CHART DATA: Volume by Primary Court Forum (Supreme Court, High Court, GSTAT, AAR)
  const forumVolumeData = useMemo(() => {
    const forums = ['Supreme Court', 'High Courts', 'GSTAT', 'AAR / AAAR'];
    const counts: Record<string, { favourable: number; adverse: number; total: number }> = {
      'Supreme Court': { favourable: 0, adverse: 0, total: 0 },
      'High Courts': { favourable: 0, adverse: 0, total: 0 },
      GSTAT: { favourable: 0, adverse: 0, total: 0 },
      'AAR / AAAR': { favourable: 0, adverse: 0, total: 0 },
    };

    filteredJudgements.forEach((j) => {
      const cat = getForumCategory(j.court);
      if (counts[cat]) {
        if (j.type === 'favourable') {
          counts[cat].favourable += 1;
        } else {
          counts[cat].adverse += 1;
        }
        counts[cat].total += 1;
      }
    });

    return forums.map((forum) => {
      const fav = counts[forum].favourable;
      const adv = counts[forum].adverse;
      const tot = counts[forum].total;
      const rate = tot > 0 ? Math.round((fav / tot) * 100) : 0;
      return {
        forum,
        Favourable: fav,
        Adverse: adv,
        Total: tot,
        WinRate: rate,
      };
    });
  }, [filteredJudgements]);

  // 2. CHART DATA: Detailed High Courts Breakdown
  const detailedHCData = useMemo(() => {
    const hcMap: Record<string, { favourable: number; adverse: number; total: number }> = {};

    filteredJudgements.forEach((j) => {
      if (j.court.includes('High Court') || j.court.includes('HC')) {
        const hcName = j.court.replace(' High Court', ' HC');
        if (!hcMap[hcName]) {
          hcMap[hcName] = { favourable: 0, adverse: 0, total: 0 };
        }
        if (j.type === 'favourable') hcMap[hcName].favourable += 1;
        else hcMap[hcName].adverse += 1;
        hcMap[hcName].total += 1;
      }
    });

    return Object.keys(hcMap)
      .map((hc) => ({
        court: hc,
        Favourable: hcMap[hc].favourable,
        Adverse: hcMap[hc].adverse,
        Total: hcMap[hc].total,
      }))
      .sort((a, b) => b.Total - a.Total)
      .slice(0, 10); // Top 10 High Courts
  }, [filteredJudgements]);

  // 3. CHART DATA: Key Legal Subject / Section Breakdown
  const sectionBreakdownData = useMemo(() => {
    const sectionMap: Record<string, { favourable: number; adverse: number }> = {};

    filteredJudgements.forEach((j) => {
      let secKey = 'Other Sections';
      const sec = j.section.toLowerCase();
      const tags = j.tags.map((t) => t.toLowerCase()).join(' ');

      if (sec.includes('75(4)') || tags.includes('personal hearing')) secKey = 'Sec 75(4) Natural Justice';
      else if (sec.includes('16') || sec.includes('17(5)') || tags.includes('itc') || sec.includes('2a'))
        secKey = 'ITC & Sec 17(5)';
      else if (sec.includes('73') || sec.includes('74')) secKey = 'Sec 73 / 74 SCN Demand';
      else if (sec.includes('129') || sec.includes('130') || tags.includes('eway')) secKey = 'Sec 129/130 E-Way Bill';
      else if (sec.includes('54') || sec.includes('refund') || tags.includes('export')) secKey = 'Sec 54 Refunds & Export';
      else if (sec.includes('128a') || tags.includes('amnesty')) secKey = 'Sec 128A Amnesty';
      else if (sec.includes('cancellation') || tags.includes('registration')) secKey = 'Registration Cancellation';
      else if (sec.includes('67') || sec.includes('86a') || tags.includes('search')) secKey = 'Search & Credit Blocking';

      if (!sectionMap[secKey]) {
        sectionMap[secKey] = { favourable: 0, adverse: 0 };
      }
      if (j.type === 'favourable') sectionMap[secKey].favourable += 1;
      else sectionMap[secKey].adverse += 1;
    });

    return Object.keys(sectionMap)
      .map((key) => ({
        subject: key,
        Favourable: sectionMap[key].favourable,
        Adverse: sectionMap[key].adverse,
        Total: sectionMap[key].favourable + sectionMap[key].adverse,
      }))
      .sort((a, b) => b.Total - a.Total);
  }, [filteredJudgements]);

  // 4. CHART DATA: Forum Distribution Pie Chart
  const pieDistributionData = useMemo(() => {
    const colors = ['#2563eb', '#059669', '#d97706', '#dc2626', '#8b5cf6'];
    return forumVolumeData
      .filter((d) => d.Total > 0)
      .map((d, index) => ({
        name: d.forum,
        value: d.Total,
        favourable: d.Favourable,
        adverse: d.Adverse,
        color: colors[index % colors.length],
      }));
  }, [forumVolumeData]);

  // 5. CHART DATA: Year-wise Jurisprudence Volume Trend
  const timelineData = useMemo(() => {
    const yearMap: Record<number, { favourable: number; adverse: number; total: number }> = {};

    filteredJudgements.forEach((j) => {
      const yr = j.year || 2023;
      if (!yearMap[yr]) yearMap[yr] = { favourable: 0, adverse: 0, total: 0 };
      if (j.type === 'favourable') yearMap[yr].favourable += 1;
      else yearMap[yr].adverse += 1;
      yearMap[yr].total += 1;
    });

    return Object.keys(yearMap)
      .map((yrStr) => {
        const yr = parseInt(yrStr, 10);
        return {
          year: yr,
          Favourable: yearMap[yr].favourable,
          Adverse: yearMap[yr].adverse,
          Total: yearMap[yr].total,
        };
      })
      .sort((a, b) => a.year - b.year);
  }, [filteredJudgements]);

  // Quick stats by Forum Category
  const scData = forumVolumeData.find((d) => d.forum === 'Supreme Court');
  const hcData = forumVolumeData.find((d) => d.forum === 'High Courts');
  const gstatData = forumVolumeData.find((d) => d.forum === 'GSTAT');
  const aarData = forumVolumeData.find((d) => d.forum === 'AAR / AAAR');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 shadow-lg border border-slate-700/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
              <span>Judicial Trends & Analytics Dashboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Supreme Court & High Court Case Law Analytics
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Quantitative breakdown of <strong>Favourable vs. Adverse Judgments</strong> across judicial forums (Supreme Court, High Courts, GSTAT, AAR) to evaluate litigative success probability and procedural defense strengths.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
            <button
              onClick={scrollToFavourites}
              className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-black transition-all shadow-xs"
            >
              <Bookmark className="w-4 h-4 fill-slate-950" />
              <span>My Favourites ({favouriteJudgements.length})</span>
            </button>
            <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>
            <div className="text-center px-3 py-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Cataloged</span>
              <span className="text-2xl font-black text-amber-400">{totalCount}</span>
            </div>
            <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>
            <div className="text-center px-3 py-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Favourable Ratio</span>
              <span className="text-2xl font-black text-emerald-400">{winRatePercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* My Saved Favourites KPI Card */}
        <div
          onClick={scrollToFavourites}
          className="cursor-pointer bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 text-slate-950 rounded-xl p-5 border border-amber-400 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-950">My Favourites</span>
            <div className="w-8 h-8 bg-slate-950/15 text-slate-950 rounded-lg flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Bookmark className="w-4 h-4 fill-slate-950" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-950">{favouriteJudgements.length}</span>
            <span className="text-xs text-slate-950 font-bold">Saved Cases</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] pt-2 border-t border-amber-600/30 text-slate-950 font-bold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Quick Access
            </span>
            <span className="underline flex items-center gap-0.5">
              Open Section ↓
            </span>
          </div>
        </div>

        {/* Supreme Court KPI */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Supreme Court Rulings</span>
            <div className="w-9 h-9 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{scData?.Total || 0}</span>
            <span className="text-xs text-slate-500 font-medium">Decisions</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {scData?.Favourable || 0} Favourable
            </span>
            <span className="text-rose-600 font-semibold flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              {scData?.Adverse || 0} Adverse
            </span>
          </div>
        </div>

        {/* High Courts KPI */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">High Court Benches</span>
            <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{hcData?.Total || 0}</span>
            <span className="text-xs text-slate-500 font-medium">Judgments</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {hcData?.Favourable || 0} Fav ({hcData?.WinRate || 0}%)
            </span>
            <span className="text-rose-600 font-semibold flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              {hcData?.Adverse || 0} Adv
            </span>
          </div>
        </div>

        {/* GSTAT KPI */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">GSTAT Tribunals</span>
            <div className="w-9 h-9 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center font-bold">
              <Gavel className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{gstatData?.Total || 0}</span>
            <span className="text-xs text-slate-500 font-medium">Orders</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {gstatData?.Favourable || 0} Fav
            </span>
            <span className="text-rose-600 font-semibold flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              {gstatData?.Adverse || 0} Adv
            </span>
          </div>
        </div>

        {/* AAR / AAAR KPI */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AAR / AAAR Rulings</span>
            <div className="w-9 h-9 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{aarData?.Total || 0}</span>
            <span className="text-xs text-slate-500 font-medium">Advance Rulings</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {aarData?.Favourable || 0} Fav
            </span>
            <span className="text-rose-600 font-semibold flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              {aarData?.Adverse || 0} Adv
            </span>
          </div>
        </div>
      </div>

      {/* MY FAVOURITES / SAVED JUDGEMENTS SECTION */}
      <div
        id="my-favourites-section"
        className="bg-white rounded-2xl p-6 border-2 border-amber-400 shadow-md space-y-5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-amber-200/60 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Bookmark className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  My Favourites & Saved Precedents
                </h3>
                <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-2.5 py-0.5 rounded-full border border-amber-300">
                  {favouriteJudgements.length} Saved
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Quick-access vault of your bookmarked Supreme Court and High Court judgements for immediate citation drafting.
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {favouriteJudgements.length > 0 && (
              <>
                <button
                  onClick={handleCopyAllFavourites}
                  className="flex items-center gap-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg transition-colors shadow-xs"
                  title="Copy formatted citations for all saved favourites"
                >
                  {copiedAllFavs ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAllFavs ? 'Citations Copied! ✓' : 'Copy All Citations'}</span>
                </button>

                {onSelectJudgementForReply && (
                  <button
                    onClick={handleAddAllFavouritesToReply}
                    className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg transition-colors shadow-xs"
                    title="Add all favourite judgements to active SCN reply draft"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>+ Add All to SCN Reply</span>
                  </button>
                )}

                {onClearAllBookmarks && (
                  <button
                    onClick={onClearAllBookmarks}
                    className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 px-2.5 py-2 rounded-lg transition-colors"
                    title="Clear all saved favourites"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Content Area: Favourites List or Empty State */}
        {favouriteJudgements.length > 0 ? (
          <div className="space-y-4">
            {/* Search and Filters inside favourites */}
            {favouriteJudgements.length > 2 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/50 p-3 rounded-xl border border-amber-200/60">
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={favSearchQuery}
                    onChange={(e) => setFavSearchQuery(e.target.value)}
                    placeholder="Filter favourites by keyword..."
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-amber-300/80 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setFavTypeFilter('ALL')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                      favTypeFilter === 'ALL'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                    }`}
                  >
                    All ({favouriteJudgements.length})
                  </button>
                  <button
                    onClick={() => setFavTypeFilter('FAV')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                      favTypeFilter === 'FAV'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                    }`}
                  >
                    Pro-Taxpayer 🟢
                  </button>
                  <button
                    onClick={() => setFavTypeFilter('ADV')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                      favTypeFilter === 'ADV'
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
                    }`}
                  >
                    Adverse 🔴
                  </button>
                </div>
              </div>
            )}

            {/* Grid of Saved Judgements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFavourites.map((j) => (
                <JudgementCard
                  key={j.id}
                  judgement={j}
                  onSelectForReply={onSelectJudgementForReply || (() => {})}
                  isSelectedForReply={selectedReplyJudgementIds.includes(j.id)}
                  onViewFullCopy={onViewFullCopy}
                  onToggleBookmark={onToggleBookmark}
                  isBookmarked={true}
                />
              ))}
            </div>

            {filteredFavourites.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-xs">
                No saved favourites matched your filter query "{favSearchQuery}".
              </div>
            )}
          </div>
        ) : (
          /* Rich Empty State with 1-click Bookmark suggestions */
          <div className="bg-amber-50/40 rounded-xl p-6 border border-amber-200 text-center space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-2xs">
              <Bookmark className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">Your Favourites Library is Empty</h4>
              <p className="text-xs text-slate-600 max-w-lg mx-auto">
                Bookmark key precedents to keep them readily accessible here for fast referencing and quick insertion into your SCN legal replies.
              </p>
            </div>

            {/* Quick 1-Click Suggestions */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-2.5">
                Suggested Landmark Judgements to Bookmark with 1-Click:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {judgements.slice(0, 5).map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => onToggleBookmark && onToggleBookmark(rec)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-white hover:bg-amber-100/80 text-slate-800 border border-amber-300 px-3 py-1.5 rounded-lg transition-all shadow-2xs group"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
                    <span>+ Bookmark {rec.title.split('v.')[0].trim()} ({rec.court})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Filters Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Dashboard Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Section Filter */}
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-500 font-medium whitespace-nowrap">Statutory Issue:</label>
            <select
              value={selectedSectionFilter}
              onChange={(e) => setSelectedSectionFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="ALL">All Legal Topics ({judgements.length})</option>
              <option value="75(4)">Section 75(4) Natural Justice / PH</option>
              <option value="73_74">Section 73 / 74 Demand SCNs</option>
              <option value="itc">ITC & Blocked Credit u/s 16/17(5)</option>
              <option value="129_130">Section 129 / 130 E-Way Bill & Cargo</option>
              <option value="54_refunds">Section 54 Exports & Refunds</option>
              <option value="amnesty_128a">Section 128A Amnesty Scheme</option>
            </select>
          </div>

          {/* Forum Filter */}
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-500 font-medium whitespace-nowrap">Court Forum:</label>
            <select
              value={selectedForumFilter}
              onChange={(e) => setSelectedForumFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="ALL">All Forums</option>
              <option value="Supreme Court">Supreme Court of India</option>
              <option value="High Courts">High Courts</option>
              <option value="GSTAT">GSTAT Appellate Tribunal</option>
              <option value="AAR">AAR / AAAR Advance Rulings</option>
            </select>
          </div>

          {(selectedSectionFilter !== 'ALL' || selectedForumFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSelectedSectionFilter('ALL');
                setSelectedForumFilter('ALL');
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold underline px-2 py-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* MAIN CHART SECTION 1: Volume of Favourable vs Adverse Judgments by Court Forum */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stacked/Grouped Bar Chart - 2 Cols on desktop */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Volume of Favourable vs. Adverse Judgments by Court Forum
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparative analysis of rulings favoring Taxpayers (Favourable) vs. Revenue (Adverse) across key judicial tiers.
              </p>
            </div>

            {/* Toggle view mode */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
              <button
                onClick={() => setForumViewMode('category')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  forumViewMode === 'category'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Primary Forums
              </button>
              <button
                onClick={() => setForumViewMode('detailed_hc')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  forumViewMode === 'detailed_hc'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Top High Courts
              </button>
            </div>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {forumViewMode === 'category' ? (
                <BarChart data={forumVolumeData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="forum"
                    tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} axisLine={{ stroke: '#cbd5e1' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      color: '#fff',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                    }}
                    cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
                    formatter={(value: any, name: any) => [
                      `${value} Judgments`,
                      name === 'Favourable' ? 'Taxpayer Favourable' : 'Revenue Adverse',
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '12px', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="Favourable" fill="#10b981" name="Favourable (Taxpayer)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Adverse" fill="#f43f5e" name="Adverse (Revenue)" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : (
                <BarChart data={detailedHCData} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="court"
                    tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      color: '#fff',
                      border: 'none',
                    }}
                  />
                  <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }} />
                  <Bar dataKey="Favourable" fill="#10b981" name="Favourable" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Adverse" fill="#f43f5e" name="Adverse" stackId="a" radius={[6, 6, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 flex items-center gap-2 mt-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Key Forum Insight:</strong> High Courts (e.g. Delhi HC, Madras HC, Gujarat HC) deliver a <strong>~85%+ favourable outcome rate</strong> for taxpayers when challenging procedural flaws like lack of personal hearing u/s 75(4) or unreasoned orders.
            </span>
          </div>
        </div>

        {/* Forum Distribution Pie Chart */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-purple-600" />
              Court Forum Share
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Distribution of cataloged case law by judicial forum.</p>
          </div>

          <div className="h-64 w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                  }}
                  formatter={(value: any, name: any, item: any) => [
                    `${value} Judgments (${item.payload.favourable} Fav / ${item.payload.adverse} Adv)`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center donut text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900">{totalCount}</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Judgments</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {pieDistributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="font-semibold text-slate-700">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <span>{item.value} cases</span>
                  <span className="text-slate-400">({Math.round((item.value / totalCount) * 100)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECONDARY CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section-wise Favourable vs Adverse Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Outcome Distribution by Legal Subject / Section
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Volume of judgments grouped by core statutory defense subject.
            </p>
          </div>

          <div className="h-72 w-full pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={sectionBreakdownData}
                margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fill: '#475569', fontSize: 11 }} />
                <YAxis
                  dataKey="subject"
                  type="category"
                  tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 600 }}
                  width={140}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                  }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '12px', paddingBottom: '10px' }} />
                <Bar dataKey="Favourable" fill="#10b981" name="Favourable" stackId="sec" radius={[0, 4, 4, 0]} />
                <Bar dataKey="Adverse" fill="#f43f5e" name="Adverse" stackId="sec" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Year-wise Jurisprudence Development Trend */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Chronological Jurisprudence Volume Trend
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Growth of GST landmark precedents from 2017 to present.</p>
          </div>

          <div className="h-72 w-full pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorFav" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorAdv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                  }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="Favourable"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorFav)"
                  name="Favourable Rulings"
                />
                <Area
                  type="monotone"
                  dataKey="Adverse"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAdv)"
                  name="Adverse Rulings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* STRATEGIC LEGAL INSIGHTS & HIGH IMPACT CASES */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              High-Impact Landmark Rulings & Strategic Takeaways
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Top precedents from the database categorized by Supreme Court & High Court forums for instant notice defense citation.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {filteredJudgements.length} Matches Found
          </span>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJudgements.slice(0, 6).map((j) => {
            const isSelected = selectedReplyJudgementIds.includes(j.id);
            return (
              <div
                key={j.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  j.type === 'favourable'
                    ? 'bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-300'
                    : 'bg-rose-50/40 border-rose-200/80 hover:border-rose-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        j.type === 'favourable'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/50'
                          : 'bg-rose-100 text-rose-800 border border-rose-300/50'
                      }`}
                    >
                      {j.type === 'favourable' ? 'Taxpayer Favourable' : 'Adverse Precedent'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
                      {j.court}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{j.title}</h4>
                  <p className="text-xs text-blue-700 font-semibold mt-0.5">{j.citation}</p>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{j.headnote}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-medium text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                      {j.section}
                    </span>
                    {onViewFullCopy && (
                      <button
                        onClick={() => onViewFullCopy(j)}
                        className="text-[11px] font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-2 py-1 rounded border border-amber-500 shadow-2xs transition-all flex items-center gap-1"
                        title="View & Download Full Verbatim Judgement Copy"
                      >
                        <Gavel className="w-3 h-3 text-slate-950" />
                        <span>Full Copy</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {onToggleBookmark && (
                      <button
                        onClick={() => onToggleBookmark(j)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          bookmarkedJudgementIds.includes(j.id)
                            ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-2xs'
                            : 'bg-white hover:bg-amber-50 text-slate-600 hover:text-amber-700 border-slate-200'
                        }`}
                        title={bookmarkedJudgementIds.includes(j.id) ? 'Remove from My Favourites' : 'Save to My Favourites'}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            bookmarkedJudgementIds.includes(j.id) ? 'fill-slate-950' : 'text-slate-500'
                          }`}
                        />
                      </button>
                    )}

                    {onSelectJudgementForReply && (
                      <button
                        onClick={() => onSelectJudgementForReply(j)}
                        className={`text-xs font-bold px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {isSelected ? 'Cited ✓' : '+ Add to Reply'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
