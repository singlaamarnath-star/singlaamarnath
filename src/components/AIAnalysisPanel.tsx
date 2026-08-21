import React, { useMemo } from 'react';
import { AIAnalysisResponse, ProceduralLapseItem, TaxReliefItem } from '../types';
import {
  Bot,
  AlertTriangle,
  ShieldCheck,
  Scale,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldAlert,
  Award,
  BookOpen,
  Info,
} from 'lucide-react';

interface AIAnalysisPanelProps {
  analysis: AIAnalysisResponse;
  onApplyToReplyDraft: () => void;
}

export const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({
  analysis,
  onApplyToReplyDraft,
}) => {
  // Synthesize or extract Key Procedural Lapses
  const proceduralLapses = useMemo<ProceduralLapseItem[]>(() => {
    if (analysis.keyProceduralLapses && analysis.keyProceduralLapses.length > 0) {
      return analysis.keyProceduralLapses;
    }

    const items: ProceduralLapseItem[] = [];

    (analysis.proceduralFlawsDetected || []).forEach((pf, idx) => {
      let severity: 'CRITICAL' | 'MAJOR' | 'MODERATE' = idx === 0 ? 'CRITICAL' : idx === 1 ? 'MAJOR' : 'MODERATE';
      let statuteRef = 'CGST Act / Rules';

      const pfLower = pf.toLowerCase();
      if (pfLower.includes('75(4)') || pfLower.includes('hearing') || pfLower.includes('natural justice')) {
        severity = 'CRITICAL';
        statuteRef = 'Section 75(4) CGST Act';
      } else if (pfLower.includes('74') || pfLower.includes('limitation') || pfLower.includes('fraud')) {
        severity = 'CRITICAL';
        statuteRef = 'Section 74 CGST Act';
      } else if (pfLower.includes('asmt-10') || pfLower.includes('scrutiny')) {
        statuteRef = 'Section 61 / Rule 99';
      } else if (pfLower.includes('din')) {
        statuteRef = 'CBIC Circular 122/2019';
      }

      items.push({
        title: pf.length > 60 ? pf.substring(0, 60) + '...' : pf,
        description: pf,
        severity,
        statuteRef,
      });
    });

    (analysis.noticeVulnerabilities || []).forEach((v) => {
      if (!items.some((i) => i.description === v)) {
        const vLower = v.toLowerCase();
        items.push({
          title: 'Notice Substantive Flaw',
          description: v,
          severity: vLower.includes('75(4)') || vLower.includes('natural justice') ? 'CRITICAL' : 'MAJOR',
          statuteRef: vLower.includes('75(4)') ? 'Section 75(4)' : 'CGST Act',
        });
      }
    });

    return items;
  }, [analysis]);

  // Synthesize or extract Potential Tax Reliefs
  const taxReliefs = useMemo<TaxReliefItem[]>(() => {
    if (analysis.potentialTaxReliefs && analysis.potentialTaxReliefs.length > 0) {
      return analysis.potentialTaxReliefs;
    }

    const items: TaxReliefItem[] = [];

    (analysis.legalDefenses || []).forEach((ld) => {
      let reliefType: 'Full Notice Quashing' | 'Penalty Waiver' | 'ITC Retention' | 'Limitation Bar' | 'Procedural Discharge' =
        'Full Notice Quashing';
      const lower = (ld.groundTitle + ' ' + ld.description).toLowerCase();

      if (lower.includes('penalty') || lower.includes('128a') || lower.includes('amnesty') || lower.includes('126')) {
        reliefType = 'Penalty Waiver';
      } else if (lower.includes('itc') || lower.includes('credit') || lower.includes('2a') || lower.includes('3b')) {
        reliefType = 'ITC Retention';
      } else if (lower.includes('limitation') || lower.includes('time bar') || lower.includes('73')) {
        reliefType = 'Limitation Bar';
      } else if (lower.includes('hearing') || lower.includes('75(4)') || lower.includes('natural justice')) {
        reliefType = 'Full Notice Quashing';
      } else {
        reliefType = 'Procedural Discharge';
      }

      items.push({
        title: ld.groundTitle,
        description: ld.description,
        reliefType,
        applicablePrecedent: ld.supportingCases?.[0] || 'High Court Precedent',
      });
    });

    return items;
  }, [analysis]);

  return (
    <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl border border-slate-800 space-y-6">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-blue-600 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-lg shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              AI Legal Notice Analysis & Strategic Roadmap
            </h3>
            <p className="text-xs text-slate-300">
              Extracted procedural vulnerabilities, ground-wise defenses, and High Court / SC judgements
            </p>
          </div>
        </div>

        <button
          onClick={onApplyToReplyDraft}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-md shadow-md flex items-center gap-2 transition-all shrink-0"
        >
          <span>Use in SCN Draft Reply Builder</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Executive Summary Banner */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4.5 space-y-1.5 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-extrabold text-blue-400 uppercase tracking-wider">
            Executive Legal Summary
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">{analysis.summary}</p>
      </div>

      {/* SMART SUMMARY: SIDE-BY-SIDE CARD LAYOUT */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 rounded-md font-black">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-extrabold text-white tracking-wide flex items-center gap-2">
              AI Smart Summary Matrix
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            Side-by-Side Notice Diagnostic
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* CARD 1: KEY PROCEDURAL LAPSES */}
          <div className="bg-slate-800/90 border-t-4 border-t-amber-500 border border-slate-700/80 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-extrabold text-amber-300 tracking-tight flex items-center gap-2">
                    Key Procedural Lapses
                  </h5>
                  <p className="text-[11px] text-slate-400">Notice defects & natural justice breaches</p>
                </div>
              </div>

              <span className="bg-amber-500/20 text-amber-300 font-black text-xs px-2.5 py-1 rounded-full border border-amber-500/30">
                {proceduralLapses.length} Lapses
              </span>
            </div>

            <div className="space-y-3">
              {proceduralLapses.map((item, idx) => {
                const isCritical = item.severity === 'CRITICAL';
                const isMajor = item.severity === 'MAJOR';

                return (
                  <div
                    key={idx}
                    className="bg-slate-900/90 border border-slate-700/90 hover:border-amber-500/50 rounded-lg p-3.5 space-y-2 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h6 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h6>
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                          isCritical
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : isMajor
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">{item.description}</p>

                    {item.statuteRef && (
                      <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-amber-400 font-semibold">
                        <Scale className="w-3 h-3 text-amber-400/80" />
                        <span>Statute Ref: {item.statuteRef}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CARD 2: POTENTIAL TAX RELIEFS */}
          <div className="bg-slate-800/90 border-t-4 border-t-emerald-500 border border-slate-700/80 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-extrabold text-emerald-300 tracking-tight flex items-center gap-2">
                    Potential Tax Reliefs
                  </h5>
                  <p className="text-[11px] text-slate-400">Available remedies & demand set-asides</p>
                </div>
              </div>

              <span className="bg-emerald-500/20 text-emerald-300 font-black text-xs px-2.5 py-1 rounded-full border border-emerald-500/30">
                {taxReliefs.length} Reliefs
              </span>
            </div>

            <div className="space-y-3">
              {taxReliefs.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-700/90 hover:border-emerald-500/50 rounded-lg p-3.5 space-y-2 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h6 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h6>
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-700/80 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      {item.reliefType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{item.description}</p>

                  {item.applicablePrecedent && (
                    <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
                      <BookOpen className="w-3 h-3 text-emerald-400/80" />
                      <span>Precedent: {item.applicablePrecedent}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ground-wise Defenses Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Recommended Ground-wise Legal Defenses:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.legalDefenses.map((gd, idx) => (
            <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-lg p-4 space-y-2">
              <h5 className="text-sm font-bold text-emerald-300">{gd.groundTitle}</h5>
              <p className="text-xs text-slate-300 leading-relaxed">{gd.description}</p>
              <div className="pt-2 border-t border-slate-700/60 flex flex-wrap gap-1">
                <span className="text-[10px] text-amber-300 font-bold">Citations:</span>
                {gd.supportingCases.map((sc, i) => (
                  <span key={i} className="text-[10px] bg-emerald-950 text-emerald-200 px-2 py-0.5 rounded border border-emerald-800">
                    {sc}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Recommendation */}
      <div className="bg-slate-800 border-l-4 border-l-blue-500 border border-slate-700 rounded-lg p-4">
        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
          Strategic Action Roadmap:
        </h4>
        <p className="text-xs text-slate-200 font-medium leading-relaxed">
          {analysis.recommendedStrategy}
        </p>
      </div>
    </div>
  );
};

