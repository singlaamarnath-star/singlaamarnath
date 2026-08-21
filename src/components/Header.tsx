import React from 'react';
import {
  Scale,
  Phone,
  FileText,
  Bot,
  ShieldAlert,
  Library,
  CheckSquare,
  MessageSquare,
  BarChart3,
  Mic,
  Radio,
  QrCode,
  Users,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  recentSearchesElement?: React.ReactNode;
  onOpenVoiceAssistant?: () => void;
  onOpenUpiPayment?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  recentSearchesElement,
  onOpenVoiceAssistant,
  onOpenUpiPayment,
}) => {
  return (
    <header className="bg-slate-900 text-white shadow-md border-b-4 border-blue-600">
      {/* Top Professional Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2.5 rounded-lg font-bold text-xl shadow-md flex items-center justify-center">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                GST Notice Judgement Advisor
                <span className="text-[10px] sm:text-xs bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  404+ SC & HC Judgements
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              404+ Landmark High Court & Supreme Court Precedents • Section 75(4), 169, 74, 16(2)(c), 129, 130, 83 & 128A
            </p>
          </div>
        </div>

        {/* CA Branding Badge & Quick Contact & Live Voice Button */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 sm:px-4">
          {onOpenVoiceAssistant && (
            <button
              id="voice-advisor-btn"
              onClick={onOpenVoiceAssistant}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-md flex items-center gap-1.5 border border-blue-400/40 animate-pulse"
              title="Open Gemini Live Voice Legal Advisor"
            >
              <Mic className="w-3.5 h-3.5 text-blue-200" />
              <span>Voice Advisor (Live API)</span>
            </button>
          )}

          <div className="text-left hidden sm:block">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block">
              DESIGNED & CURATED BY
            </span>
            <span className="text-sm font-bold text-blue-400 tracking-wide">
              CA Amar Nath Singla
            </span>
          </div>
          <div className="h-7 w-px bg-slate-700 hidden sm:block"></div>
          {recentSearchesElement}

          <a
            href="tel:9810059721"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-md transition-colors shadow-sm"
            title="Call CA Amar Nath Singla"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>98100 59721</span>
          </a>
          <a
            href="https://wa.me/919810059721?text=Hello%20CA%20Amar%20Nath%20Singla,%20I%20have%20a%20query%20regarding%20a%20GST%20Notice."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {onOpenUpiPayment && (
            <button
              onClick={onOpenUpiPayment}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 shadow-sm border border-amber-400"
              title="Pay / Support via UPI (Aayush Singla - aayush.singla25@okaxis)"
            >
              <QrCode className="w-3.5 h-3.5 text-slate-950" />
              <span>UPI Pay / QR</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('section-lookup')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md whitespace-nowrap transition-all ${
              activeTab === 'section-lookup'
                ? 'bg-blue-600 text-white shadow-sm font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Section-wise Judgements
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md whitespace-nowrap transition-all ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-amber-300" />
            Dashboard & Forum Insights
          </button>

          <button
            onClick={() => setActiveTab('ai-analyzer')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md whitespace-nowrap transition-all ${
              activeTab === 'ai-analyzer'
                ? 'bg-blue-600 text-white shadow-sm font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            AI Notice Text Analyzer
          </button>

          <button
            onClick={() => setActiveTab('comparison-matrix')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md whitespace-nowrap transition-all ${
              activeTab === 'comparison-matrix'
                ? 'bg-blue-600 text-white shadow-sm font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Favourable vs Adverse Matrix
          </button>

          <button
            onClick={() => setActiveTab('draft-reply')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md whitespace-nowrap transition-all ${
              activeTab === 'draft-reply'
                ? 'bg-blue-600 text-white shadow-sm font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-300" />
            SCN Draft Reply Builder
          </button>

          <button
            onClick={() => setActiveTab('master-library')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md whitespace-nowrap transition-all ${
              activeTab === 'master-library'
                ? 'bg-blue-600 text-white shadow-sm font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Library className="w-4 h-4 text-slate-300" />
            <span>Master Judgement Library</span>
            <span className="text-[10px] bg-emerald-500 text-slate-950 font-extrabold px-1.5 py-0.2 rounded-full">
              404+
            </span>
          </button>

          <button
            onClick={() => setActiveTab('defense-checklist')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md whitespace-nowrap transition-all ${
              activeTab === 'defense-checklist'
                ? 'bg-blue-600 text-white shadow-sm font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-rose-300" />
            Procedural Defense Checklist
          </button>

          <button
            onClick={() => setActiveTab('visitors')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md whitespace-nowrap transition-all ${
              activeTab === 'visitors'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm font-bold'
                : 'text-emerald-400 hover:bg-slate-800 hover:text-emerald-300 font-bold'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            Visitors & Analytics
          </button>
        </nav>
      </div>
    </header>
  );
};
