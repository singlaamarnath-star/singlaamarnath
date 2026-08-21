/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SectionSelector } from './components/SectionSelector';
import { NoticeInputForm } from './components/NoticeInputForm';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { AIAnalysisPanel } from './components/AIAnalysisPanel';
import { ReplyDraftModal } from './components/ReplyDraftModal';
import { MasterLibrary } from './components/MasterLibrary';
import { DefenseChecklist } from './components/DefenseChecklist';
import { LegalTipsPanel } from './components/LegalTipsPanel';
import { Dashboard } from './components/Dashboard';
import { RecentSearches } from './components/RecentSearches';
import { RecentSearchesBar } from './components/RecentSearchesBar';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { JudgementCopyModal } from './components/JudgementCopyModal';
import { UpiPaymentModal } from './components/UpiPaymentModal';
import { VisitorLogsDashboard } from './components/VisitorLogsDashboard';
import { trackActivity } from './utils/visitorTracker';
import { MASTER_JUDGEMENTS } from './data/judgementsData';
import { GstSection, Judgement, NoticeInputState, AIAnalysisResponse, RecentSearchItem } from './types';
import { Phone, Mail, Scale, Sparkles, BookOpen, ShieldCheck, Heart, CheckCircle2, Mic, Radio, QrCode, Users } from 'lucide-react';

const STORAGE_KEY = 'gst_notice_recent_searches_v2';
const BOOKMARKS_STORAGE_KEY = 'gst_notice_bookmarked_judgements_v1';

const DEFAULT_BOOKMARK_IDS = [
  'sc-radha-krishan-2021',
  'mad-dy-beathel-2021',
  'sc-safari-retreats-2024',
  'ker-gopinath-2024',
];

const DEFAULT_RECENT_SEARCHES: RecentSearchItem[] = [
  {
    id: 'search-75-4',
    section: '75(4)',
    noticeForm: 'SCN DRC-01',
    primaryIssue: 'Mandatory Personal Hearing u/s 75(4) not granted before passing adverse order',
    financialYear: 'FY 2020-21',
    disputeAmount: 'Rs. 12,50,000',
    timestamp: Date.now() - 1000 * 60 * 15, // 15 mins ago
    inputState: {
      section: '75(4)',
      customSection: '',
      noticeForm: 'SCN DRC-01',
      financialYear: 'FY 2020-21',
      disputeAmount: 'Rs. 12,50,000',
      primaryIssue: 'Mandatory Personal Hearing u/s 75(4) not granted before passing adverse order',
      allegationDetails:
        'Proper Officer passed DRC-07 order confirming tax demand without serving a specific notice fixing date, time and venue for personal hearing, violating Section 75(4).',
      noticeText: '',
      hasPersonalHearingOffered: false,
      hasDRC01Issued: true,
      hasFraudAlleged: false,
    },
  },
  {
    id: 'search-suncraft',
    section: '2A vs 3B Mismatch',
    noticeForm: 'DRC-01',
    primaryIssue: 'ITC reversal demanded from buyer for supplier non-deposit of tax (GSTR-2A vs 3B)',
    financialYear: 'FY 2018-19',
    disputeAmount: 'Rs. 18,75,000',
    timestamp: Date.now() - 1000 * 60 * 120, // 2 hours ago
    inputState: {
      section: '2A vs 3B Mismatch',
      customSection: '',
      noticeForm: 'DRC-01',
      financialYear: 'FY 2018-19',
      disputeAmount: 'Rs. 18,75,000',
      primaryIssue: 'ITC reversal demanded from buyer for supplier non-deposit of tax (GSTR-2A vs 3B)',
      allegationDetails:
        'Department issued DRC-01 demanding reversal of ITC along with interest because supplier GST registration was cancelled or supplier failed to file GSTR-1, without examining or proceeding against the seller first.',
      noticeText: '',
      hasPersonalHearingOffered: true,
      hasDRC01Issued: true,
      hasFraudAlleged: false,
    },
  },
  {
    id: 'search-eway',
    section: '129',
    noticeForm: 'MOV-07 / MOV-09 Penalty Order',
    primaryIssue: 'Detention & 200% penalty for minor e-way bill vehicle number typo',
    financialYear: 'FY 2023-24',
    disputeAmount: 'Rs. 4,20,000',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    inputState: {
      section: '129',
      customSection: '',
      noticeForm: 'MOV-07 / MOV-09 Penalty Order',
      financialYear: 'FY 2023-24',
      disputeAmount: 'Rs. 4,20,000',
      primaryIssue: 'Detention & 200% penalty for minor e-way bill vehicle number typo',
      allegationDetails:
        'Vehicle detained u/s 129 due to 1-digit vehicle number clerical typo in E-Way bill or 2-hour expiry during transit, when invoice, physical goods, and bill of entry matched perfectly.',
      noticeText: '',
      hasPersonalHearingOffered: false,
      hasDRC01Issued: true,
      hasFraudAlleged: false,
    },
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('section-lookup');
  const [selectedSection, setSelectedSection] = useState<GstSection>('75(4)');
  const [customSection, setCustomSection] = useState<string>('');

  const [inputState, setInputState] = useState<NoticeInputState>({
    section: '75(4)',
    customSection: '',
    noticeForm: 'SCN DRC-01',
    financialYear: 'FY 2020-21',
    disputeAmount: 'Rs. 12,50,000',
    primaryIssue: 'Mandatory Personal Hearing u/s 75(4) not granted before passing adverse order',
    allegationDetails:
      'Proper Officer passed DRC-07 order confirming tax demand without serving a specific notice fixing date, time and venue for personal hearing, violating Section 75(4).',
    noticeText: '',
    hasPersonalHearingOffered: false,
    hasDRC01Issued: true,
    hasFraudAlleged: false,
  });

  const [selectedReplyJudgements, setSelectedReplyJudgements] = useState<Judgement[]>(() => {
    return [MASTER_JUDGEMENTS[0], MASTER_JUDGEMENTS[4]];
  });

  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);

  // Recent Searches state
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse recent searches from localStorage:', e);
    }
    return DEFAULT_RECENT_SEARCHES;
  });

  // Bookmarked Judgements (My Favourites) state
  const [bookmarkedJudgementIds, setBookmarkedJudgementIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse bookmarks from localStorage:', e);
    }
    return DEFAULT_BOOKMARK_IDS;
  });

  const [activeSearchId, setActiveSearchId] = useState<string>('search-75-4');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState<boolean>(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState<boolean>(false);
  const [hoveredJudgement, setHoveredJudgement] = useState<Judgement | null>(null);
  const [selectedJudgementCopy, setSelectedJudgementCopy] = useState<Judgement | null>(null);

  // Track initial visitor load and tab switching
  useEffect(() => {
    trackActivity(
      activeTab === 'visitors'
        ? 'Visitor & Analytics Dashboard'
        : activeTab === 'section-lookup'
        ? 'Section-wise Judgements'
        : activeTab === 'dashboard'
        ? 'Forum Dashboard'
        : activeTab === 'ai-analyzer'
        ? 'AI Notice Text Analyzer'
        : activeTab === 'comparison-matrix'
        ? 'Favourable vs Adverse Matrix'
        : activeTab === 'draft-reply'
        ? 'SCN Draft Reply Builder'
        : activeTab === 'master-library'
        ? 'Master Judgement Library'
        : 'Procedural Defense Checklist',
      'page_view'
    );
  }, [activeTab]);

  // Save recent searches to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
    } catch (e) {
      console.error('Failed to save recent searches:', e);
    }
  }, [recentSearches]);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkedJudgementIds));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, [bookmarkedJudgementIds]);

  // Toggle Bookmark for a Judgement
  const handleToggleBookmark = (judgement: Judgement) => {
    setBookmarkedJudgementIds((prev) => {
      const isBookmarked = prev.includes(judgement.id);
      const updated = isBookmarked ? prev.filter((id) => id !== judgement.id) : [...prev, judgement.id];
      const shortTitle = judgement.title.split('v.')[0].trim();
      setToastMessage(
        isBookmarked
          ? `Removed from My Favourites: ${shortTitle}`
          : `Saved to My Favourites: ${shortTitle} ⭐`
      );
      setTimeout(() => setToastMessage(null), 3000);
      return updated;
    });
  };

  // Clear all bookmarks
  const handleClearAllBookmarks = () => {
    setBookmarkedJudgementIds([]);
    localStorage.removeItem(BOOKMARKS_STORAGE_KEY);
    setToastMessage('Cleared all saved favourites.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Record a search session
  const saveSearchSession = (targetSection: GstSection, targetInputState: NoticeInputState) => {
    const newItem: RecentSearchItem = {
      id: `search-${targetSection.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
      section: targetSection,
      customSection: targetInputState.customSection || customSection,
      noticeForm: targetInputState.noticeForm || 'DRC-01',
      primaryIssue: targetInputState.primaryIssue || `Notice Analysis u/s ${targetSection}`,
      financialYear: targetInputState.financialYear || 'FY 2020-21',
      disputeAmount: targetInputState.disputeAmount,
      timestamp: Date.now(),
      inputState: { ...targetInputState, section: targetSection },
    };

    setRecentSearches((prev) => {
      // Filter out duplicate or matching section/issue
      const filtered = prev.filter(
        (item) => !(item.section === newItem.section && item.primaryIssue === newItem.primaryIssue)
      );
      const updated = [newItem, ...filtered].slice(0, 5); // Max 5 items
      return updated;
    });

    setActiveSearchId(newItem.id);
  };

  // Sync selected section from SectionSelector to InputState & save to history
  const handleSelectSection = (section: GstSection) => {
    setSelectedSection(section);
    const updatedInput = { ...inputState, section };
    setInputState(updatedInput);
    saveSearchSession(section, updatedInput);
  };

  // Select item from Recent Searches history
  const handleSelectRecentSearch = (item: RecentSearchItem) => {
    setSelectedSection(item.section);
    if (item.customSection) setCustomSection(item.customSection);
    setInputState(item.inputState);
    setActiveSearchId(item.id);

    // Auto-navigate to section lookup
    setActiveTab('section-lookup');

    // Show confirmation toast
    setToastMessage(`Restored Session: Section ${item.section} - ${item.noticeForm}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Delete search item
  const handleDeleteRecentSearch = (id: string) => {
    setRecentSearches((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all recent searches
  const handleClearAllRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Filter judgements based on selected Section
  const judgementsForSelectedSection = MASTER_JUDGEMENTS.filter((j) => {
    if (selectedSection === 'OTHER') return true;
    if (selectedSection === '2A vs 3B Mismatch') return j.section.includes('2A') || j.section.includes('3B') || j.tags.includes('Suncraft Energy');
    if (selectedSection === 'Retrospective Cancellation') return j.section.includes('Cancellation') || j.tags.includes('Registration');
    return j.section.includes(selectedSection) || j.tags.some((t) => t.includes(selectedSection));
  });

  // Toggle Judgement selection for Reply
  const handleToggleJudgementForReply = (judgement: Judgement) => {
    setSelectedReplyJudgements((prev) => {
      const exists = prev.some((j) => j.id === judgement.id);
      if (exists) {
        return prev.filter((j) => j.id !== judgement.id);
      } else {
        return [...prev, judgement];
      }
    });
  };

  // Execute AI Analysis
  const handleAnalyzeNotice = async () => {
    setIsLoadingAI(true);
    saveSearchSession(selectedSection, inputState);
    trackActivity(
      'AI Notice Text Analyzer',
      'search_analyzed',
      `Analyzed ${inputState.section} (${inputState.noticeForm}): ${inputState.primaryIssue || 'General Tax Demand'}`,
      inputState.section
    );

    try {
      const response = await fetch('/api/analyze-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...inputState,
          customSection,
        }),
      });

      const data = await response.json();
      setAiAnalysis(data);
      setActiveTab('ai-analyzer');
    } catch (error) {
      console.error('Failed to run AI notice analysis:', error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Generate AI Reply Text from backend
  const handleGenerateAIReply = async (params: any) => {
    trackActivity(
      'SCN Draft Reply Builder',
      'reply_drafted',
      `Generated SCN Reply Draft for M/s ${params.taxpayerName || 'Taxpayer'} (Sec ${params.section})`,
      params.section
    );
    try {
      const response = await fetch('/api/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      return data.replyText || '';
    } catch (error) {
      console.error('Error generating AI reply:', error);
      return '';
    }
  };

  const handleOpenJudgementCopy = (j: Judgement) => {
    setSelectedJudgementCopy(j);
    trackActivity(
      'Judgement Copies',
      'judgement_copy',
      `Viewed Full Judgement Copy: ${j.title} (${j.court})`,
      j.section
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Top Navigation Header with Recent Searches Dropdown & Voice Assistant trigger */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenVoiceAssistant={() => {
          setIsVoiceAssistantOpen(true);
          trackActivity('Voice Advisor', 'voice_assistant', 'Opened Gemini Live Voice Assistant');
        }}
        onOpenUpiPayment={() => {
          setIsUpiModalOpen(true);
          trackActivity('UPI Payment Modal', 'upi_clicked', 'Opened UPI Support QR Modal (Aayush Singla)');
        }}
        recentSearchesElement={
          <RecentSearches
            recentSearches={recentSearches}
            onSelectSearch={handleSelectRecentSearch}
            onDeleteSearch={handleDeleteRecentSearch}
            onClearAll={handleClearAllRecentSearches}
            currentActiveId={activeSearchId}
          />
        }
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white border border-blue-500 shadow-2xl px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Body Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Quick Access Recent Searches Chips Bar */}
        <RecentSearchesBar
          recentSearches={recentSearches}
          onSelectSearch={handleSelectRecentSearch}
          activeSearchId={activeSearchId}
        />

        {/* TAB 1: SECTION LOOKUP & JUDGEMENTS */}
        {activeTab === 'section-lookup' && (
          <div className="space-y-6">
            <SectionSelector
              selectedSection={selectedSection}
              onSelectSection={handleSelectSection}
              customSection={customSection}
              setCustomSection={setCustomSection}
            />

            {/* Notice Input Form and Collapsible Legal Tips Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 xl:col-span-8">
                <NoticeInputForm
                  inputState={inputState}
                  setInputState={setInputState}
                  onAnalyze={handleAnalyzeNotice}
                  isLoading={isLoadingAI}
                />
              </div>

              <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
                <LegalTipsPanel
                  section={customSection || inputState.section || selectedSection}
                  onApplyClause={(clause) => {
                    setInputState((prev) => ({
                      ...prev,
                      allegationDetails: prev.allegationDetails
                        ? `${prev.allegationDetails}\n\n[Statutory Defense Ground]:\n${clause}`
                        : clause,
                    }));
                    setToastMessage('Statutory defense clause inserted into Notice Details!');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  onSelectSection={(newSec) => {
                    handleSelectSection(newSec as GstSection);
                  }}
                />
              </div>
            </div>

            <ComparisonMatrix
              judgements={judgementsForSelectedSection.length > 0 ? judgementsForSelectedSection : MASTER_JUDGEMENTS}
              selectedSection={selectedSection}
              onSelectForReply={handleToggleJudgementForReply}
              selectedReplyJudgementIds={selectedReplyJudgements.map((j) => j.id)}
              onHoverJudgement={setHoveredJudgement}
              hoveredJudgementId={hoveredJudgement?.id}
              onViewFullCopy={(j) => handleOpenJudgementCopy(j)}
              bookmarkedJudgementIds={bookmarkedJudgementIds}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        )}

        {/* TAB 2: DASHBOARD & FORUM INSIGHTS */}
        {activeTab === 'dashboard' && (
          <Dashboard
            judgements={MASTER_JUDGEMENTS}
            onSelectJudgementForReply={handleToggleJudgementForReply}
            selectedReplyJudgementIds={selectedReplyJudgements.map((j) => j.id)}
            onViewFullCopy={(j) => handleOpenJudgementCopy(j)}
            bookmarkedJudgementIds={bookmarkedJudgementIds}
            onToggleBookmark={handleToggleBookmark}
            onClearAllBookmarks={handleClearAllBookmarks}
          />
        )}

        {/* TAB 2: AI NOTICE ANALYZER */}
        {activeTab === 'ai-analyzer' && (
          <div className="space-y-6">
            <NoticeInputForm
              inputState={inputState}
              setInputState={setInputState}
              onAnalyze={handleAnalyzeNotice}
              isLoading={isLoadingAI}
            />

            {aiAnalysis ? (
              <AIAnalysisPanel
                analysis={aiAnalysis}
                onApplyToReplyDraft={() => setActiveTab('draft-reply')}
              />
            ) : (
              <div className="bg-white rounded-xl p-10 text-center border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 animate-pulse text-blue-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No AI Notice Analysis Generated Yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Click the "Analyze Notice & Get SC / HC Judgements" button above to extract notice flaws, procedural breaches, and recommended legal grounds!
                </p>
                <button
                  onClick={handleAnalyzeNotice}
                  disabled={isLoadingAI}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-md shadow-md transition-all"
                >
                  Run AI Analysis Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FAVOURABLE VS ADVERSE MATRIX */}
        {activeTab === 'comparison-matrix' && (
          <div className="space-y-6">
            <SectionSelector
              selectedSection={selectedSection}
              onSelectSection={handleSelectSection}
              customSection={customSection}
              setCustomSection={setCustomSection}
            />

            <ComparisonMatrix
              judgements={judgementsForSelectedSection.length > 0 ? judgementsForSelectedSection : MASTER_JUDGEMENTS}
              selectedSection={selectedSection}
              onSelectForReply={handleToggleJudgementForReply}
              selectedReplyJudgementIds={selectedReplyJudgements.map((j) => j.id)}
              onHoverJudgement={setHoveredJudgement}
              hoveredJudgementId={hoveredJudgement?.id}
              onViewFullCopy={(j) => handleOpenJudgementCopy(j)}
              bookmarkedJudgementIds={bookmarkedJudgementIds}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        )}

        {/* TAB 4: SCN DRAFT REPLY BUILDER */}
        {activeTab === 'draft-reply' && (
          <ReplyDraftModal
            inputState={inputState}
            selectedJudgements={selectedReplyJudgements}
            onGenerateAIReply={handleGenerateAIReply}
            hoveredJudgement={hoveredJudgement}
            onHoverJudgement={setHoveredJudgement}
          />
        )}

        {/* TAB 5: MASTER JUDGEMENT LIBRARY */}
        {activeTab === 'master-library' && (
          <MasterLibrary
            judgements={MASTER_JUDGEMENTS}
            onSelectForReply={handleToggleJudgementForReply}
            selectedReplyJudgementIds={selectedReplyJudgements.map((j) => j.id)}
            onHoverJudgement={setHoveredJudgement}
            hoveredJudgementId={hoveredJudgement?.id}
            onViewFullCopy={(j) => handleOpenJudgementCopy(j)}
            bookmarkedJudgementIds={bookmarkedJudgementIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* TAB 6: PROCEDURAL DEFENSE CHECKLIST */}
        {activeTab === 'defense-checklist' && <DefenseChecklist />}

        {/* TAB 7: VISITOR & PRACTITIONER LOGS ANALYTICS */}
        {activeTab === 'visitors' && <VisitorLogsDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-xl font-bold text-sm">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide">
                GST Notice Judgement Finder & Case Law Advisor
              </div>
              <div className="text-xs text-slate-400">
                Created & Curated by <span className="text-amber-300 font-semibold">CA Amar Nath Singla</span> (Mobile: 9810059721)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => setActiveTab('visitors')}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-all"
              title="View Real-Time Visitor Logs & Practitioner Analytics"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Visitor Logs</span>
            </button>

            <button
              onClick={() => setIsUpiModalOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm border border-emerald-400/30 transition-all"
              title="Scan or Pay with any UPI app (Aayush Singla - aayush.singla25@okaxis)"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-300" />
              <span>UPI Pay / QR (Aayush Singla)</span>
            </button>

            <a
              href="tel:9810059721"
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Call: 9810059721</span>
            </a>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">
              Supreme Court & High Court Judgements Database
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Gemini Live Voice Advisor */}
      <button
        onClick={() => setIsVoiceAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border-2 border-blue-400/50 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group"
        title="Start Live Voice Conversation with AI Legal Advisor"
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute w-full h-full rounded-full bg-blue-400/40 animate-ping"></span>
          <Mic className="w-5 h-5 text-white relative z-10" />
        </div>
        <span className="hidden sm:inline text-xs font-extrabold tracking-wide">
          Voice Legal Advisor
        </span>
        <span className="bg-blue-900/80 text-blue-200 text-[10px] font-black px-2 py-0.5 rounded-full uppercase border border-blue-400/30">
          Live API
        </span>
      </button>

      {/* Live Voice Conversation Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
      />

      {/* Official Full Judgement Copy Modal */}
      <JudgementCopyModal
        judgement={selectedJudgementCopy}
        isOpen={!!selectedJudgementCopy}
        onClose={() => setSelectedJudgementCopy(null)}
        onSelectForReply={handleToggleJudgementForReply}
        isSelectedForReply={
          selectedJudgementCopy
            ? selectedReplyJudgements.some((j) => j.id === selectedJudgementCopy.id)
            : false
        }
      />

      {/* UPI Payment & QR Modal */}
      <UpiPaymentModal
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
      />
    </div>
  );
}
