import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  X,
  Copy,
  Check,
  Smartphone,
  ExternalLink,
  QrCode,
  ShieldCheck,
  Sparkles,
  Heart,
  ArrowRight,
  Download,
} from 'lucide-react';

interface UpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const upiId = 'aayush.singla25@okaxis';
  const payeeName = 'Aayush Singla';

  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentAmount = selectedAmount !== null ? selectedAmount.toString() : customAmount;

  // Construct standard UPI deep link URL
  let upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR`;
  if (currentAmount && parseFloat(currentAmount) > 0) {
    upiUrl += `&am=${parseFloat(currentAmount)}`;
  }

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectPreset = (amount: number) => {
    if (selectedAmount === amount) {
      setSelectedAmount(null);
      setCustomAmount('');
    } else {
      setSelectedAmount(amount);
      setCustomAmount(amount.toString());
    }
  };

  const handleCustomAmountChange = (val: string) => {
    setSelectedAmount(null);
    setCustomAmount(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl border border-slate-200 text-slate-900 w-full max-w-md shadow-2xl overflow-hidden relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl">
              <QrCode className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight text-white">
                UPI Payment & Contribution
              </h3>
              <p className="text-[11px] text-blue-100 font-medium">
                Support Legal Jurisprudence Research
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-blue-100 hover:text-white hover:bg-white/20 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Exact Replica of Google Pay / UPI Card Layout from user image */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center relative">
            {/* User Avatar & Name */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-emerald-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                A
              </div>
              <div className="text-left">
                <h4 className="text-xl font-bold text-slate-800 tracking-tight">
                  {payeeName}
                </h4>
                <span className="text-[11px] text-slate-500 font-medium">
                  Verified UPI Merchant / Payee
                </span>
              </div>
            </div>

            {/* High Resolution QR Code Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md relative group">
              <QRCodeSVG
                value={upiUrl}
                size={220}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png',
                  x: undefined,
                  y: undefined,
                  height: 38,
                  width: 38,
                  opacity: 1,
                  excavate: true,
                }}
              />
            </div>

            {/* UPI ID Text & Copy Button */}
            <div className="mt-4 flex items-center justify-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs w-full">
              <span className="text-xs font-mono font-bold text-slate-800 tracking-tight truncate">
                UPI ID: <span className="text-blue-700">{upiId}</span>
              </span>
              <button
                onClick={handleCopyUpiId}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-1.5 rounded-lg border border-blue-200 transition-all flex items-center gap-1 text-[11px] font-bold shrink-0"
                title="Copy UPI ID"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs font-medium text-slate-500 mt-3">
              Scan to pay with any UPI app
            </p>
          </div>

          {/* Quick Amount Suggestion (Optional) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Contribution Amount (Optional):
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[250, 500, 1000, 2100].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleSelectPreset(amt)}
                  className={`py-1.5 rounded-lg font-bold border transition-all ${
                    selectedAmount === amt
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="relative mt-2">
              <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">₹</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="Or enter custom amount in INR"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Direct Pay Link for Mobile Users */}
          <div className="space-y-2 pt-1">
            <a
              href={upiUrl}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>
                {currentAmount && parseFloat(currentAmount) > 0
                  ? `Pay ₹${currentAmount} via UPI App`
                  : 'Open Any UPI App (GPay / PhonePe / Paytm)'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 font-medium pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> 100% Secure UPI Network
              </span>
              <span>•</span>
              <span>Instant Bank Transfer</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            Thank you for supporting GST legal research
          </span>
          <button
            onClick={onClose}
            className="text-slate-700 hover:text-slate-900 font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
