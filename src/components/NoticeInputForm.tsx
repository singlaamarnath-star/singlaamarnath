import React from 'react';
import { NoticeInputState } from '../types';
import { FileSearch, Sparkles, AlertCircle, FileText, CheckCircle2, XCircle } from 'lucide-react';

interface NoticeInputFormProps {
  inputState: NoticeInputState;
  setInputState: React.Dispatch<React.SetStateAction<NoticeInputState>>;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const NoticeInputForm: React.FC<NoticeInputFormProps> = ({
  inputState,
  setInputState,
  onAnalyze,
  isLoading,
}) => {
  const handleChange = (field: keyof NoticeInputState, value: any) => {
    setInputState((prev) => ({ ...prev, [field]: value }));
  };

  const applyPreset = (presetType: string) => {
    if (presetType === '75_4_no_hearing') {
      setInputState((prev) => ({
        ...prev,
        section: '75(4)',
        noticeForm: 'SCN DRC-01 / Order DRC-07',
        financialYear: 'FY 2020-21',
        primaryIssue: 'Mandatory Personal Hearing not granted before passing adverse demand order',
        allegationDetails:
          'Proper Officer passed DRC-07 order confirming tax demand without serving a specific notice fixing date, time and venue for personal hearing, violating Section 75(4).',
        hasPersonalHearingOffered: false,
        hasDRC01Issued: true,
        hasFraudAlleged: false,
      }));
    } else if (presetType === 'sec169_hidden_tab') {
      setInputState((prev) => ({
        ...prev,
        section: '169',
        noticeForm: 'SCN DRC-01 in Hidden Tab',
        financialYear: 'FY 2020-21',
        primaryIssue: 'SCN uploaded under "Additional Notices" tab without email/SMS alert (Sec 169 breach)',
        allegationDetails:
          'Show Cause Notice was uploaded exclusively in the obscure "View Additional Notices and Orders" portal tab without sending physical copy, registered email alert, or SMS. Ex-parte demand order passed in breach of Section 169 and natural justice.',
        hasPersonalHearingOffered: false,
        hasDRC01Issued: true,
        hasFraudAlleged: false,
      }));
    } else if (presetType === 'suncraft_2a_3b') {
      setInputState((prev) => ({
        ...prev,
        section: '2A vs 3B Mismatch',
        noticeForm: 'DRC-01',
        financialYear: 'FY 2018-19',
        primaryIssue: 'ITC reversal demanded from buyer for supplier non-deposit of tax (GSTR-2A vs 3B)',
        allegationDetails:
          'Department issued DRC-01 demanding reversal of ITC along with interest because supplier GST registration was cancelled or supplier failed to file GSTR-1, without examining or proceeding against the seller first.',
        hasPersonalHearingOffered: true,
        hasDRC01Issued: true,
        hasFraudAlleged: false,
      }));
    } else if (presetType === 'sec74_extended_limitation') {
      setInputState((prev) => ({
        ...prev,
        section: '74',
        noticeForm: 'DRC-01 SCN u/s 74',
        financialYear: 'FY 2017-18',
        primaryIssue: 'Invoking 5-year extended limitation period without proving mens rea or fraud',
        allegationDetails:
          'SCN issued u/s 74 by copy-pasting standard phrase "taxpayer suppressed facts with intent to evade tax" for routine interpretation difference on eligibility of ITC.',
        hasPersonalHearingOffered: true,
        hasDRC01Issued: true,
        hasFraudAlleged: true,
      }));
    } else if (presetType === 'eway_bill_typo') {
      setInputState((prev) => ({
        ...prev,
        section: '129',
        noticeForm: 'MOV-07 / MOV-09 Penalty Order',
        financialYear: 'FY 2023-24',
        primaryIssue: 'Detention & 200% penalty for minor e-way bill vehicle number typo / expired e-way bill',
        allegationDetails:
          'Vehicle detained u/s 129 due to 1-digit vehicle number clerical typo in E-Way bill or 2-hour expiry during transit, when invoice, physical goods, and bill of entry matched perfectly.',
        hasPersonalHearingOffered: false,
        hasDRC01Issued: true,
        hasFraudAlleged: false,
      }));
    } else if (presetType === 'sec83_bank_attach') {
      setInputState((prev) => ({
        ...prev,
        section: '83',
        noticeForm: 'DRC-22 Bank Account Attachment',
        financialYear: 'FY 2021-22',
        primaryIssue: 'Provisional attachment of active working capital bank account under Section 83',
        allegationDetails:
          'Proper Officer attached operational cash-credit/current bank account during pendency of inquiry without recording subjective satisfaction on tangible material risk of tax evasion.',
        hasPersonalHearingOffered: false,
        hasDRC01Issued: false,
        hasFraudAlleged: false,
      }));
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-blue-600" />
            GST Notice Input & Facts Parameter
          </h3>
          <p className="text-xs text-slate-500">
            Fill in notice parameters or paste the notice extract to get targeted High Court / SC judgement matching.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-[11px] font-bold text-slate-600 whitespace-nowrap">Quick Presets:</span>
          <button
            onClick={() => applyPreset('75_4_no_hearing')}
            className="text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-md whitespace-nowrap"
          >
            No Hearing u/s 75(4)
          </button>
          <button
            onClick={() => applyPreset('sec169_hidden_tab')}
            className="text-[11px] font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-300 px-2.5 py-1 rounded-md whitespace-nowrap"
          >
            Sec 169 Hidden Tab / Service Defect
          </button>
          <button
            onClick={() => applyPreset('suncraft_2a_3b')}
            className="text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-md whitespace-nowrap"
          >
            2A vs 3B Suncraft
          </button>
          <button
            onClick={() => applyPreset('sec74_extended_limitation')}
            className="text-[11px] font-semibold bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 px-2.5 py-1 rounded-md whitespace-nowrap"
          >
            Sec 74 Fraud Allegation
          </button>
          <button
            onClick={() => applyPreset('eway_bill_typo')}
            className="text-[11px] font-semibold bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 px-2.5 py-1 rounded-md whitespace-nowrap"
          >
            E-Way Bill Detention
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Notice Form Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Notice Form / Type:</label>
          <select
            value={inputState.noticeForm}
            onChange={(e) => handleChange('noticeForm', e.target.value)}
            className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="SCN DRC-01">DRC-01 (Show Cause Notice)</option>
            <option value="ASMT-10">ASMT-10 (Return Scrutiny Notice)</option>
            <option value="DRC-07 Order">DRC-07 (Summary Demand Order)</option>
            <option value="MOV-07 / MOV-09">MOV-07 / MOV-09 (E-Way Bill Detention Order)</option>
            <option value="INS-01">INS-01 (Search & Seizure Order)</option>
            <option value="DRC-22">DRC-22 (Provisional Bank Account Attachment)</option>
            <option value="Summons Sec 70">Section 70 Summons</option>
            <option value="REG-17 SCN">REG-17 SCN (Cancellation of Registration)</option>
            <option value="Other Notice">Other GST Notice</option>
          </select>
        </div>

        {/* Financial Year */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Financial Year in Dispute:</label>
          <select
            value={inputState.financialYear}
            onChange={(e) => handleChange('financialYear', e.target.value)}
            className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="FY 2017-18">FY 2017-18</option>
            <option value="FY 2018-19">FY 2018-19</option>
            <option value="FY 2019-20">FY 2019-20</option>
            <option value="FY 2020-21">FY 2020-21</option>
            <option value="FY 2021-22">FY 2021-22</option>
            <option value="FY 2022-23">FY 2022-23</option>
            <option value="FY 2023-24">FY 2023-24</option>
            <option value="FY 2024-25">FY 2024-25</option>
          </select>
        </div>

        {/* Amount in Dispute */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Disputed Amount (Tax + Interest + Penalty):</label>
          <input
            type="text"
            value={inputState.disputeAmount}
            onChange={(e) => handleChange('disputeAmount', e.target.value)}
            placeholder="e.g. Rs. 15,40,000"
            className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Primary Issue / Headline */}
      <div className="mt-3.5">
        <label className="block text-xs font-bold text-slate-700 mb-1">Primary Allegation / Subject Line:</label>
        <input
          type="text"
          value={inputState.primaryIssue}
          onChange={(e) => handleChange('primaryIssue', e.target.value)}
          placeholder="e.g. Disallowance of ITC due to supplier non-filing / No Personal Hearing / Delayed 3B..."
          className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Checkboxes for Procedural Defects */}
      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inputState.hasPersonalHearingOffered}
            onChange={(e) => handleChange('hasPersonalHearingOffered', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-xs font-semibold text-slate-800">
            Personal Hearing Explicitly Granted?
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inputState.hasDRC01Issued}
            onChange={(e) => handleChange('hasDRC01Issued', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-xs font-semibold text-slate-800">
            Formal DRC-01 Issued?
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inputState.hasFraudAlleged}
            onChange={(e) => handleChange('hasFraudAlleged', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-xs font-semibold text-slate-800">
            Fraud / Wilful Suppression Alleged (Sec 74)?
          </span>
        </label>
      </div>

      {/* Paste Notice Raw Text Area */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            Paste GST Notice Text / Paragraphs (Optional for AI Deep Extraction):
          </label>
          <span className="text-[11px] text-slate-400 font-medium">Extract key points & SC/HC cases</span>
        </div>
        <textarea
          rows={3}
          value={inputState.noticeText}
          onChange={(e) => handleChange('noticeText', e.target.value)}
          placeholder="Paste the text of the Show Cause Notice, DRC-01 paragraphs, or officer assertions here..."
          className="w-full text-xs border border-slate-300 rounded-md p-2.5 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Action Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-md shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing Notice & Matching Judgements...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Analyze Notice & Get SC / HC Judgements</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
