import React from 'react';
import { GstSection } from '../types';
import {
  Gavel,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Truck,
  Building,
  UserX,
  CreditCard,
  FileQuestion,
  Receipt,
  Search,
  Mail
} from 'lucide-react';

interface SectionSelectorProps {
  selectedSection: GstSection;
  onSelectSection: (section: GstSection) => void;
  customSection: string;
  setCustomSection: (val: string) => void;
}

interface SectionOption {
  id: GstSection;
  title: string;
  sectionCode: string;
  subtitle: string;
  color: string;
  badgeBg: string;
  icon: React.ReactNode;
  keyIssues: string;
}

export const SECTION_OPTIONS: SectionOption[] = [
  {
    id: '75(4)',
    title: 'Section 75(4)',
    sectionCode: 'Sec 75(4)',
    subtitle: 'Mandatory Personal Hearing Violation',
    color: 'border-amber-500 bg-amber-500/5 hover:border-amber-400',
    badgeBg: 'bg-amber-500 text-slate-950',
    icon: <Gavel className="w-5 h-5 text-amber-600" />,
    keyIssues: 'Order passed without granting hearing • Blank date in DRC-01 • Natural Justice',
  },
  {
    id: '169',
    title: 'Section 169',
    sectionCode: 'Sec 169',
    subtitle: 'Service of Notice & Orders (6 Legal Modes)',
    color: 'border-indigo-500 bg-indigo-500/5 hover:border-indigo-400',
    badgeBg: 'bg-indigo-600 text-white',
    icon: <Mail className="w-5 h-5 text-indigo-600" />,
    keyIssues: 'Hidden "Additional Notices" tab • No email alert • Deemed service rebutted • Affixation last resort',
  },
  {
    id: '73',
    title: 'Section 73',
    sectionCode: 'Sec 73',
    subtitle: 'Tax Demand (Non-Fraud / Normal Limitation)',
    color: 'border-blue-500 bg-blue-500/5 hover:border-blue-400',
    badgeBg: 'bg-blue-600 text-white',
    icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
    keyIssues: 'Bona fide mistake • Scrutiny difference • Standard limitation timeline',
  },
  {
    id: '74',
    title: 'Section 74',
    sectionCode: 'Sec 74',
    subtitle: 'Fraud / Suppression / Extended Limitation',
    color: 'border-rose-500 bg-rose-500/5 hover:border-rose-400',
    badgeBg: 'bg-rose-600 text-white',
    icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
    keyIssues: 'Arbitrary invocation of 5-year period • Lack of mens rea / deliberate intent proof',
  },
  {
    id: '16(4)',
    title: 'Section 16(4)',
    sectionCode: 'Sec 16(4)',
    subtitle: 'ITC Time Limit & Delayed GSTR-3B',
    color: 'border-purple-500 bg-purple-500/5 hover:border-purple-400',
    badgeBg: 'bg-purple-600 text-white',
    icon: <Clock className="w-5 h-5 text-purple-600" />,
    keyIssues: 'GSTR-3B filed after due date • Tax paid with interest • Finance Act 2024 relaxations',
  },
  {
    id: '2A vs 3B Mismatch',
    title: '2A vs 3B Mismatch / Suncraft',
    sectionCode: 'GSTR 2A/2B',
    subtitle: 'Supplier Default / Cancellation of Selling Dealer',
    color: 'border-emerald-500 bg-emerald-500/5 hover:border-emerald-400',
    badgeBg: 'bg-emerald-600 text-white',
    icon: <UserX className="w-5 h-5 text-emerald-600" />,
    keyIssues: 'Suncraft Energy SC Ruling • Reversal from buyer without proceeding against seller',
  },
  {
    id: '129',
    title: 'Section 129 / 130',
    sectionCode: 'Sec 129/130',
    subtitle: 'E-Way Bill Detention & Transit Confiscation',
    color: 'border-teal-500 bg-teal-500/5 hover:border-teal-400',
    badgeBg: 'bg-teal-600 text-white',
    icon: <Truck className="w-5 h-5 text-teal-600" />,
    keyIssues: 'Expired e-way bill • Minor address/vehicle typo • Satyam Shivam SC • No tax evasion intent',
  },
  {
    id: '83',
    title: 'Section 83',
    sectionCode: 'Sec 83',
    subtitle: 'Provisional Attachment of Bank Accounts',
    color: 'border-indigo-500 bg-indigo-500/5 hover:border-indigo-400',
    badgeBg: 'bg-indigo-600 text-white',
    icon: <CreditCard className="w-5 h-5 text-indigo-600" />,
    keyIssues: 'Radha Krishan SC Ruling • Freezing working capital • Draconian attachment',
  },
  {
    id: '67',
    title: 'Section 67 & 70',
    sectionCode: 'Sec 67/70',
    subtitle: 'Search, Summons & Coerced DRC-03 Payments',
    color: 'border-orange-500 bg-orange-500/5 hover:border-orange-400',
    badgeBg: 'bg-orange-600 text-white',
    icon: <Building className="w-5 h-5 text-orange-600" />,
    keyIssues: 'Involuntary cash deposit during search • Midnight summons • Vallabh Textiles refund',
  },
  {
    id: '17(5)',
    title: 'Section 17(5)',
    sectionCode: 'Sec 17(5)',
    subtitle: 'Blocked Input Tax Credit / Safari Retreats',
    color: 'border-pink-500 bg-pink-500/5 hover:border-pink-400',
    badgeBg: 'bg-pink-600 text-white',
    icon: <Receipt className="w-5 h-5 text-pink-600" />,
    keyIssues: 'Safari Retreats SC Ruling • Commercial building ITC for leasing • Plant & Machinery',
  },
  {
    id: 'Retrospective Cancellation',
    title: 'Registration Cancellation',
    sectionCode: 'Registration',
    subtitle: 'Retrospective Cancellation of GSTIN',
    color: 'border-cyan-500 bg-cyan-500/5 hover:border-cyan-400',
    badgeBg: 'bg-cyan-600 text-white',
    icon: <UserX className="w-5 h-5 text-cyan-600" />,
    keyIssues: 'Arbitrary backdated cancellation • Disallowing buyer ITC • Trotters Unipack Delhi HC',
  },
  {
    id: '50',
    title: 'Section 50',
    sectionCode: 'Sec 50',
    subtitle: 'Interest on Gross vs Net Tax Liability',
    color: 'border-amber-600 bg-amber-600/5 hover:border-amber-500',
    badgeBg: 'bg-amber-700 text-white',
    icon: <Receipt className="w-5 h-5 text-amber-700" />,
    keyIssues: 'Refex Industries • Interest only on net cash component, not credit ledger',
  },
  {
    id: '107',
    title: 'Section 107',
    sectionCode: 'Sec 107',
    subtitle: 'Appeals & Delay Condonation (Article 226)',
    color: 'border-slate-700 bg-slate-100 hover:border-slate-500',
    badgeBg: 'bg-slate-800 text-white',
    icon: <Gavel className="w-5 h-5 text-slate-800" />,
    keyIssues: 'High Court writ relief beyond 4 months • Extraordinary hardship • SK Chakraborthy HC',
  },
  {
    id: 'OTHER',
    title: 'Custom Section',
    sectionCode: 'Other',
    subtitle: 'Specify Any Other GST Act Section',
    color: 'border-gray-400 bg-gray-50 hover:border-gray-600',
    badgeBg: 'bg-gray-700 text-white',
    icon: <FileQuestion className="w-5 h-5 text-gray-700" />,
    keyIssues: 'Section 39, 54, 61, 122, or specific notification/circular issue',
  },
];

export const SectionSelector: React.FC<SectionSelectorProps> = ({
  selectedSection,
  onSelectSection,
  customSection,
  setCustomSection,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            Select GST Notice Section
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              High Court & Supreme Court Precedents
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Click on a section below to instantly view favorable & adverse judgements, key legal ratios, and defense grounds.
          </p>
        </div>
      </div>

      {/* Grid of GST Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {SECTION_OPTIONS.map((item) => {
          const isSelected = selectedSection === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`relative cursor-pointer rounded-lg p-3.5 border transition-all duration-150 ${
                item.color
              } ${
                isSelected
                  ? 'ring-2 ring-blue-600 ring-offset-1 shadow-sm bg-blue-50/50 border-blue-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${item.badgeBg}`}>
                  {item.sectionCode}
                </span>
                <div className="p-1 rounded bg-white border border-slate-200 shadow-2xs">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-tight">{item.title}</h3>
              <p className="text-xs font-medium text-slate-600 mt-0.5">{item.subtitle}</p>

              <div className="mt-2.5 pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-normal">
                <span className="font-semibold text-slate-700">Key Focus: </span>
                {item.keyIssues}
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-blue-600"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Custom Section Input if OTHER selected */}
      {selectedSection === 'OTHER' && (
        <div className="mt-4 p-4 bg-blue-50/80 border border-blue-200 rounded-lg flex flex-col sm:flex-row items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <div className="w-full">
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Enter Specific GST Section or Issue Description:
            </label>
            <input
              type="text"
              value={customSection}
              onChange={(e) => setCustomSection(e.target.value)}
              placeholder="e.g. Section 61 ASMT-10 scrutiny, Section 54 Refund, Section 122 penalty..."
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
