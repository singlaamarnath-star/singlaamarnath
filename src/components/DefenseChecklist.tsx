import React, { useState } from 'react';
import { CheckSquare, ShieldCheck, AlertOctagon, HelpCircle, FileCheck, ExternalLink } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  relevantSection: string;
  landmarkCase: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'sec169_valid_service',
    title: 'Was SCN served through valid statutory modes with proof of delivery (Sec 169)?',
    description: 'Uploading SCN only in hidden "Additional Notices" tab without email/SMS alert, or failing to prove dispatch/delivery, invalidates ex-parte order as held in East India Udyog (Calcutta HC) and Premier Logistics (Allahabad HC).',
    relevantSection: 'Section 169(1)',
    landmarkCase: 'Union of India v. Murli Industries (Supreme Court) / East India Udyog (Calcutta HC)',
  },
  {
    id: 'sec169_affixation_last_resort',
    title: 'If notice served by Affixation, did officer prove earlier statutory modes failed?',
    description: 'Affixation u/s 169(1)(f) is strictly a last resort. Direct affixation without attempting personal delivery, speed post, or email is illegal as held in Carry Co. v. UOI (Calcutta HC).',
    relevantSection: 'Section 169(1)(f)',
    landmarkCase: 'Carry Co. v. Union of India (Calcutta HC 2025)',
  },
  {
    id: 'ph_granted',
    title: 'Was opportunity of Personal Hearing explicitly granted prior to order?',
    description: 'If NO, the demand order DRC-07 is liable to be quashed under Section 75(4) as held in Bharat Mint (Allahabad HC) and Horizon Construction (Madras HC).',
    relevantSection: 'Section 75(4)',
    landmarkCase: 'Bharat Mint & Allied Chemicals (Allahabad HC)',
  },
  {
    id: 'drc01_issued',
    title: 'Was formal Summary SCN in Form GST DRC-01 uploaded on portal?',
    description: 'Passing order without preceding DRC-01 notice invalidates adjudication proceedings.',
    relevantSection: 'Rule 142(1)',
    landmarkCase: 'Madras HC / Gujarat HC Rulings',
  },
  {
    id: 'sec74_fraud_proven',
    title: 'Did SCN establish specific facts proving fraud/wilful suppression (Sec 74)?',
    description: 'Boilerplate copy-paste template sentence without proof of mens rea renders Section 74 invocation time-barred and without jurisdiction.',
    relevantSection: 'Section 74 vs 73',
    landmarkCase: 'Uniworth Textiles (Supreme Court) / Raychem RPG (Gujarat HC)',
  },
  {
    id: 'supplier_first_proceeded',
    title: 'For 2A vs 3B mismatch, did Department first proceed against selling dealer?',
    description: 'Demanding ITC reversal from buyer without investigating supplier is illegal as per Suncraft Energy (Calcutta HC / SC Affirmed).',
    relevantSection: 'Section 16(2)(c)',
    landmarkCase: 'Suncraft Energy Pvt Ltd (Supreme Court SLP 27850/2023)',
  },
  {
    id: 'din_quoted',
    title: 'Does the Notice contain a valid Document Identification Number (DIN)?',
    description: 'CBIC Circular No. 122/41/2019 renders any notice issued without DIN invalid and void ab initio.',
    relevantSection: 'CBIC Circular 122/2019',
    landmarkCase: 'Supreme Court & High Court DIN Rulings',
  },
  {
    id: 'asmt10_prior_scn',
    title: 'Was ASMT-10 scrutiny notice issued before Section 73/74 SCN for return scrutiny?',
    description: 'Failure to issue ASMT-10 or consider reply before SCN in scrutiny matters violates statutory scheme.',
    relevantSection: 'Section 61',
    landmarkCase: 'Gauhati HC / Madras HC Rulings',
  },
  {
    id: 'eway_bill_intent',
    title: 'Is there any evidence of intent to evade tax for e-way bill discrepancy?',
    description: 'Clerical vehicle number typo or minor delay without tax evasion intent attracts Circular 64/38/2018 Rs. 500 penalty, not 200% penalty u/s 129.',
    relevantSection: 'Section 129',
    landmarkCase: 'Synergy Fertichem (Gujarat HC) / Satyam Shivam (Supreme Court)',
  },
  {
    id: 'interest_net_cash',
    title: 'Was interest u/s 50 demanded on gross tax instead of net cash component?',
    description: 'Interest is payable only on net cash liability paid late via ledger, as per proviso to Section 50(1) and Refex Industries (Madras HC).',
    relevantSection: 'Section 50',
    landmarkCase: 'Refex Industries (Madras HC)',
  },
];

export const DefenseChecklist: React.FC = () => {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalFlawsFound = Object.values(checkedState).filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-lg">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Procedural & Statutory Defense Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Check key procedural compliance points to identify fatal grounds for quashing the GST Notice
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-md flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Fatal Defects Identified: {totalFlawsFound} of {CHECKLIST_ITEMS.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = !!checkedState[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`cursor-pointer rounded-lg p-4 border transition-all ${
                isChecked
                  ? 'bg-emerald-50/70 border-emerald-500 shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-4 h-4 text-emerald-600 rounded mt-0.5 focus:ring-emerald-500 shrink-0"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                      {item.relevantSection}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {item.landmarkCase}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalFlawsFound > 0 && (
        <div className="p-4 bg-slate-900 text-slate-100 rounded-lg border-l-4 border-l-emerald-500 border border-slate-800 space-y-1">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-amber-300" />
            Checklist Assessment Summary:
          </h4>
          <p className="text-xs leading-relaxed">
            You have identified <span className="font-bold text-amber-300">{totalFlawsFound} preliminary procedural/jurisdictional defects</span>. 
            Highlight these preliminary objections at the very beginning of your Show Cause Notice written reply to seek immediate dropping of proceedings!
          </p>
        </div>
      )}
    </div>
  );
};
