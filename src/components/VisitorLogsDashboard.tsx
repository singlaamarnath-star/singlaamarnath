import React, { useState, useEffect } from 'react';
import { VisitorRecord, VisitorStats } from '../types';
import {
  Users,
  Activity,
  Globe,
  Smartphone,
  Laptop,
  Eye,
  Search,
  Download,
  RefreshCw,
  Clock,
  MapPin,
  Calendar,
  FileText,
  Sparkles,
  CheckCircle2,
  Filter,
  Trash2,
  ChevronDown,
  ChevronUp,
  Scale,
  QrCode,
  Mic,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const VisitorLogsDashboard: React.FC = () => {
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<string>('ALL');
  const [expandedVisitorId, setExpandedVisitorId] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  const fetchVisitors = async () => {
    try {
      const res = await fetch('/api/visitors');
      if (res.ok) {
        const data = await res.json();
        setVisitors(data.visitors || []);
        setStats(data.stats || null);
      }
    } catch (err) {
      console.error('Failed to fetch visitor logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // Polling for live visitor updates every 15s if autoRefresh is enabled
  useEffect(() => {
    if (!autoRefresh) return;
    const timer = setInterval(() => {
      fetchVisitors();
    }, 15000);
    return () => clearInterval(timer);
  }, [autoRefresh]);

  const handleExportCSV = () => {
    if (!visitors.length) return;

    const headers = [
      'Visitor ID',
      'IP Address',
      'City',
      'Region',
      'Device',
      'Browser',
      'OS',
      'Visit Count',
      'Searches',
      'Judgements Copied',
      'First Seen',
      'Last Seen',
      'Pages Viewed',
    ];

    const rows = visitors.map((v) => [
      v.visitorId,
      v.ip,
      v.city || 'Unknown',
      v.region || 'Unknown',
      v.device,
      v.browser,
      v.os,
      v.visitCount,
      v.searchesCount,
      v.copiesCount,
      new Date(v.firstSeen).toLocaleString('en-IN'),
      new Date(v.lastSeen).toLocaleString('en-IN'),
      `"${v.pagesViewed.join(', ')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `gst_advisor_visitors_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLogs = async () => {
    if (window.confirm('Reset and re-seed visitor activity logs?')) {
      try {
        await fetch('/api/visitors/clear', { method: 'POST' });
        fetchVisitors();
      } catch (err) {
        console.error('Error clearing logs:', err);
      }
    }
  };

  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch =
      v.visitorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.city && v.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.region && v.region.toLowerCase().includes(searchTerm.toLowerCase())) ||
      v.browser.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDevice =
      selectedDevice === 'ALL' || v.device.toUpperCase() === selectedDevice.toUpperCase();

    return matchesSearch && matchesDevice;
  });

  const formatRelativeTime = (isoString: string) => {
    const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              REAL-TIME ANALYTICS
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Tracking Active
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            GST Advisor Visitor & Practitioner Logs
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Auditing CAs, Advocates, Taxpayers, and Corporate Legal Teams accessing GST Notice Jurisprudence
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`text-xs font-bold px-3 py-2 rounded-lg border transition-all flex items-center gap-1.5 ${
              autoRefresh
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? 'animate-spin' : ''}`} />
            <span>{autoRefresh ? 'Auto-Refresh (15s)' : 'Paused'}</span>
          </button>

          <button
            onClick={fetchVisitors}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3 py-2 rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Refresh Now</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleClearLogs}
            className="bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 font-bold text-xs p-2 rounded-lg border border-slate-700 transition-all"
            title="Reset Sample Logs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Visits</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.totalVisits}</div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" /> Cumulative Page Views
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Unique Users</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.uniqueVisitors}</div>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
              Distinct CAs & Advocates
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Today's Active</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700">{stats.todayVisits}</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">
              Active in last 24 hours
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">SCN Queries</span>
              <Search className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.totalSearches}</div>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
              Notices Analyzed by AI
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Copies Saved</span>
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.judgementsCopied}</div>
            <span className="text-[10px] text-purple-700 font-bold mt-0.5 block">
              Precedents & Citations
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">UPI / QR Clicks</span>
              <QrCode className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.upiClicks}</div>
            <span className="text-[10px] text-teal-700 font-bold mt-0.5 block">
              Contribution Dialogs
            </span>
          </div>
        </div>
      )}

      {/* Analytics Insights Row */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Top Geographies */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-600" /> Top Visitor Hubs (India)
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Cities</span>
            </div>
            <div className="space-y-2">
              {stats.topLocations.map((loc, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-400 w-3">{idx + 1}.</span>
                    <MapPin className="w-3 h-3 text-slate-400" /> {loc.city}
                  </span>
                  <span className="bg-blue-50 text-blue-800 font-extrabold text-[11px] px-2 py-0.5 rounded-full">
                    {loc.count} {loc.count === 1 ? 'user' : 'users'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sections Consulted */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-600" /> Most Researched GST Sections
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Precedents</span>
            </div>
            <div className="space-y-2">
              {stats.topSections.map((sec, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">
                    Section <strong className="text-blue-900">{sec.section}</strong>
                  </span>
                  <span className="bg-amber-50 text-amber-900 font-extrabold text-[11px] px-2 py-0.5 rounded-full border border-amber-200">
                    {sec.count} hits
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Device & Platform Breakdown */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-emerald-600" /> Device & Platform Split
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Breakdown</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span className="flex items-center gap-1">
                    <Laptop className="w-3.5 h-3.5 text-blue-600" /> Desktop / Office PC
                  </span>
                  <span>{stats.desktopPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${stats.desktopPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> Mobile / Smartphone
                  </span>
                  <span>{stats.mobilePercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${stats.mobilePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Visitor ID, City, IP, Browser (e.g., Delhi, Chrome, 103...)"
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Device:
          </span>
          {['ALL', 'Desktop', 'Mobile'].map((dev) => (
            <button
              key={dev}
              onClick={() => setSelectedDevice(dev)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                selectedDevice === dev
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {dev}
            </button>
          ))}
        </div>
      </div>

      {/* Visitors Detailed Log Roster */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-700" />
            Detailed Visitor Sessions ({filteredVisitors.length})
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Sorted by most recently active
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
            Loading live visitor logs...
          </div>
        ) : filteredVisitors.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No visitors matching your filter criteria.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredVisitors.map((visitor) => {
              const isExpanded = expandedVisitorId === visitor.visitorId;

              return (
                <div key={visitor.visitorId} className="p-4 hover:bg-slate-50/70 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    {/* Visitor Identity & Location */}
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        {visitor.device === 'Mobile' ? (
                          <Smartphone className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Laptop className="w-5 h-5 text-blue-600" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {visitor.visitorId}
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[11px] px-2 py-0.5 rounded flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            {visitor.city || 'India'}, {visitor.region || ''}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            IP: {visitor.ip}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                          <span>
                            <strong>Device:</strong> {visitor.device} • {visitor.browser} • {visitor.os}
                          </span>
                          <span>•</span>
                          <span>
                            <strong>Visits:</strong> {visitor.visitCount} session(s)
                          </span>
                          <span>•</span>
                          <span>
                            <strong>Last Seen:</strong> {formatRelativeTime(visitor.lastSeen)}
                          </span>
                        </div>

                        {/* Badges of Pages Viewed */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          <span className="text-[10px] font-bold text-slate-400">Pages:</span>
                          {visitor.pagesViewed.map((pg, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200 shadow-2xs"
                            >
                              {pg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs font-bold text-slate-800">
                          {visitor.searchesCount} Searches • {visitor.copiesCount} Copies
                        </div>
                        <div className="text-[10px] text-slate-400">
                          First: {new Date(visitor.firstSeen).toLocaleDateString('en-IN')}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setExpandedVisitorId(isExpanded ? null : visitor.visitorId)
                        }
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                          isExpanded
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>{isExpanded ? 'Hide Activity' : `Activity (${visitor.activities.length})`}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Activity History Drawer */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-200 bg-slate-50/80 p-4 rounded-xl space-y-2 animate-in fade-in duration-150">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                        <Activity className="w-3.5 h-3.5 text-blue-600" />
                        Action Audit Trail for {visitor.visitorId}
                      </h4>

                      {visitor.activities.length === 0 ? (
                        <p className="text-xs text-slate-500 italic">
                          No deep actions recorded for this visitor yet.
                        </p>
                      ) : (
                        <div className="space-y-1.5 font-sans">
                          {visitor.activities.map((act) => (
                            <div
                              key={act.id}
                              className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 shadow-2xs"
                            >
                              <div className="flex items-center gap-2">
                                {act.type === 'judgement_copy' && (
                                  <span className="p-1 bg-purple-100 text-purple-800 rounded">
                                    <FileText className="w-3.5 h-3.5" />
                                  </span>
                                )}
                                {act.type === 'search_analyzed' && (
                                  <span className="p-1 bg-blue-100 text-blue-800 rounded">
                                    <Search className="w-3.5 h-3.5" />
                                  </span>
                                )}
                                {act.type === 'reply_drafted' && (
                                  <span className="p-1 bg-emerald-100 text-emerald-800 rounded">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </span>
                                )}
                                {act.type === 'upi_clicked' && (
                                  <span className="p-1 bg-teal-100 text-teal-800 rounded">
                                    <QrCode className="w-3.5 h-3.5" />
                                  </span>
                                )}
                                {act.type === 'voice_assistant' && (
                                  <span className="p-1 bg-amber-100 text-amber-800 rounded">
                                    <Mic className="w-3.5 h-3.5" />
                                  </span>
                                )}

                                <span className="font-semibold text-slate-800">{act.details}</span>
                                {act.section && (
                                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                    Sec {act.section}
                                  </span>
                                )}
                              </div>

                              <span className="text-[11px] text-slate-400 font-mono shrink-0">
                                {new Date(act.timestamp).toLocaleTimeString('en-IN', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                })}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
