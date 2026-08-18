import React, { useState } from 'react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);

  const simulateScan = (type: string) => {
    setIsScanning(false);
    if (type === 'checkin') {
      setScanResult('✅ เช็กชื่อเข้าเรียนสำเร็จ: วิทยาการคำนวณ (Room 402 Lab) เวลา 09:02 น.');
    } else if (type === 'library') {
      setScanResult('📚 ยืมหนังสือสำเร็จ: "Clean Architecture by Robert C. Martin" (กำหนดส่งใน 14 วัน)');
    } else {
      setScanResult('🚪 ปลดล็อกประตูอัตโนมัติ: Computer Lab 01 (Authorized)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#121b2e] text-white rounded-[28px] max-w-md w-full shadow-2xl overflow-hidden border border-slate-700 flex flex-col animate-scaleIn">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-700/60 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400">qr_code_scanner</span>
            <h3 className="font-bold text-base text-white">Smart QR / NFC Scanner</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white/80 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Camera Viewfinder View */}
        <div className="p-5 flex flex-col items-center gap-5">
          <div className="relative w-64 h-64 bg-slate-900/90 rounded-3xl border-2 border-cyan-400/50 flex items-center justify-center overflow-hidden shadow-inner">
            {/* Viewfinder Corners */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-400" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-cyan-400" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-cyan-400" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-cyan-400" />

            {/* Scanning Laser Line */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[scan_2s_infinite_ease-in-out] shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
            )}

            <span className="material-symbols-outlined text-cyan-400/40 text-7xl">
              qr_code_2
            </span>
          </div>

          {/* Status feedback */}
          {scanResult ? (
            <div className="w-full p-4 rounded-2xl bg-[#20C997]/20 border border-[#20C997]/40 text-[#67fcc6] text-xs font-semibold text-center animate-fadeIn">
              {scanResult}
            </div>
          ) : (
            <p className="text-xs text-slate-300 text-center">
              วาง QR Code หรือแตะบัตร NFC สมาร์ตการ์ดให้อยู่ในกรอบเพื่อสแกน
            </p>
          )}

          {/* Preset Quick Scan triggers */}
          <div className="w-full flex flex-col gap-2 pt-2 border-t border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase text-center">
              จำลองการสแกน (Simulate Scan Actions)
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => simulateScan('checkin')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium text-center transition-colors cursor-pointer flex flex-col items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px] text-cyan-400">school</span>
                <span>เช็กชื่อคาบเรียน</span>
              </button>
              <button
                onClick={() => simulateScan('library')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium text-center transition-colors cursor-pointer flex flex-col items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px] text-purple-400">menu_book</span>
                <span>ยืมหนังสือ</span>
              </button>
              <button
                onClick={() => simulateScan('door')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium text-center transition-colors cursor-pointer flex flex-col items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-400">meeting_room</span>
                <span>ประตูห้องแล็บ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
      `}</style>
    </div>
  );
};
