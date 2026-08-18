import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';
import { UserProfile } from '../../types';

interface DigitalIdModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onOpenScanner: () => void;
}

export const DigitalIdModal: React.FC<DigitalIdModalProps> = ({
  user,
  isOpen,
  onClose,
  onOpenScanner,
}) => {
  if (!isOpen) return null;

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col p-6 animate-scaleIn">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1550d3]">badge</span>
            <h3 className="font-bold text-lg text-[#121b2e]">บัตรประจำตัวดิจิทัล (Smart ID)</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 3D Flippable Card */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full h-[260px] sm:h-[270px] cursor-pointer perspective-1000 mb-4"
        >
          <div
            className={`w-full h-full duration-700 transform-style-3d relative transition-transform ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front */}
            <div className="absolute inset-0 w-full h-full bg-[#273044] rounded-[26px] p-6 text-white shadow-2xl flex flex-col justify-between backface-hidden border border-slate-700 overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-[#1550d3] rounded-full mix-blend-screen filter blur-[80px] opacity-35" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#7857f8] rounded-full mix-blend-screen filter blur-[60px] opacity-35" />

              <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-3.5">
                  <img
                    src={user.avatar || ASSETS.cardAvatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30"
                  />
                  <div>
                    <h4 className="font-bold text-lg uppercase tracking-tight text-white">
                      {user.name}
                    </h4>
                    <div className="text-xs text-[#b5c4ff] font-medium">{user.thaiName}</div>
                    <div className="text-[11px] text-white/70 mt-0.5">
                      ID: {user.studentId} • {user.grade}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-white/20 text-xs font-bold">
                  LV.{user.level}
                </span>
              </div>

              <div className="relative z-10 bg-black/30 rounded-xl p-3 border border-white/10 flex justify-between items-center text-xs">
                <div>
                  <span className="text-white/60 block text-[10px]">สาขาวิชา</span>
                  <span className="font-bold text-white">{user.major}</span>
                </div>
                <div className="text-right">
                  <span className="text-white/60 block text-[10px]">ความต่อเนื่อง</span>
                  <span className="font-bold text-amber-300">🔥 {user.streakDays} วัน</span>
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-center text-[11px] text-white/70">
                <span>แตะเพื่อดูบาร์โค้ดประจำตัว ➔</span>
                <span className="material-symbols-outlined text-[18px]">touch_app</span>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 w-full h-full bg-[#1e2538] rounded-[26px] p-6 text-white shadow-2xl flex flex-col justify-between rotate-y-180 backface-hidden border border-slate-700 overflow-hidden">
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="font-bold text-white/70">SCHOOL NEXUS DIGITAL PASS</span>
                <span className="text-[#20C997] font-semibold">● ACTIVE</span>
              </div>

              {/* Barcode */}
              <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-black">
                <div className="h-12 w-full flex items-center justify-center gap-1">
                  {[5, 2, 8, 3, 6, 2, 7, 3, 5, 2, 9, 4, 3, 7, 2, 5, 2, 8, 4, 2].map((w, i) => (
                    <div
                      key={i}
                      className="bg-black h-full rounded-xs"
                      style={{ width: `${w * 1.5}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs font-bold mt-1 tracking-widest">
                  *{user.studentId}*
                </span>
              </div>

              <div className="flex justify-between text-xs text-white/70">
                <span>NFC: {user.rfidCard}</span>
                <span>Exp: 2028</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenScanner();
            }}
            className="flex-1 py-3 bg-[#1550d3] hover:bg-[#1a53d6] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
            <span>เปิดกล้องสแกน QR</span>
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-4 py-3 bg-slate-100 text-[#121b2e] hover:bg-slate-200 font-semibold rounded-xl text-xs cursor-pointer"
          >
            พลิกบัตร
          </button>
        </div>
      </div>
    </div>
  );
};
