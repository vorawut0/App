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

  const getRoleBadgeLabel = () => {
    switch (user.role) {
      case 'teacher':
        return 'FACULTY PASS';
      case 'admin':
        return 'SYS ADMIN PASS';
      case 'parent':
        return 'GUARDIAN PASS';
      default:
        return 'STUDENT PASS';
    }
  };

  const getRoleMajorLabel = () => {
    switch (user.role) {
      case 'teacher':
        return 'ภาควิชา / ตำแหน่ง';
      case 'admin':
        return 'ขอบเขตระบบไอที';
      case 'parent':
        return 'ความสัมพันธ์';
      default:
        return 'สาขาวิชา';
    }
  };

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
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 3D Flippable Card Container */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full h-[260px] sm:h-[270px] cursor-pointer perspective-1000 mb-4 select-none"
        >
          <div className={`card-flip-inner ${isFlipped ? 'is-flipped' : ''}`}>
            {/* Front of Card */}
            <div className="card-face-front bg-[#273044] rounded-[26px] p-6 text-white shadow-2xl flex flex-col justify-between border border-slate-700 overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-[#1550d3] rounded-full mix-blend-screen filter blur-[80px] opacity-35 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#7857f8] rounded-full mix-blend-screen filter blur-[60px] opacity-35 pointer-events-none" />

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
                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold tracking-wider text-white uppercase">
                    {getRoleBadgeLabel()}
                  </span>
                  <span className="text-[10px] font-semibold text-white/70">
                    LV.{user.level}
                  </span>
                </div>
              </div>

              <div className="relative z-10 bg-black/30 rounded-xl p-3 border border-white/10 flex justify-between items-center text-xs">
                <div>
                  <span className="text-white/60 block text-[10px]">{getRoleMajorLabel()}</span>
                  <span className="font-bold text-white truncate max-w-[200px] block">{user.major}</span>
                </div>
                <div className="text-right">
                  <span className="text-white/60 block text-[10px]">ความต่อเนื่อง</span>
                  <span className="font-bold text-amber-300 flex items-center gap-1 justify-end">
                    <span className="material-symbols-outlined text-[15px] text-amber-400">local_fire_department</span>
                    {user.streakDays} วัน
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-center text-[11px] text-white/70">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-cyan-300">touch_app</span>
                  <span>แตะเพื่อดูบาร์โค้ด & NFC ประจำตัว</span>
                </span>
                <span className="material-symbols-outlined text-[18px] text-white/60">flip</span>
              </div>
            </div>

            {/* Back of Card (100% Right Side Up, No Inversion) */}
            <div className="card-face-back bg-[#1e2538] rounded-[26px] p-6 text-white shadow-2xl flex flex-col justify-between border border-slate-700 overflow-hidden">
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-cyan-400">verified</span>
                  <span className="font-bold tracking-wider text-white/80 uppercase">
                    {getRoleBadgeLabel()}
                  </span>
                </div>
                <span className="text-[#20C997] font-bold text-[11px] flex items-center gap-1 bg-[#20C997]/15 px-2 py-0.5 rounded-md border border-[#20C997]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#20C997] animate-pulse"></span>
                  ACTIVE
                </span>
              </div>

              {/* Barcode Display */}
              <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-black shadow-inner">
                <div className="h-11 w-full flex items-center justify-center gap-1">
                  {[5, 2, 8, 3, 6, 2, 7, 3, 5, 2, 9, 4, 3, 7, 2, 5, 2, 8, 4, 2, 6, 3, 7, 2].map((w, i) => (
                    <div
                      key={i}
                      className="bg-black h-full rounded-xs"
                      style={{ width: `${w * 1.3}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs font-bold mt-1 tracking-widest text-[#121b2e]">
                  *{user.studentId}*
                </span>
              </div>

              {/* Card Meta & NFC Details */}
              <div className="flex justify-between items-center text-xs text-white/75 pt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 uppercase">RFID / NFC CHIP</span>
                  <span className="font-mono text-[11px] font-semibold text-white/90">{user.rfidCard}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-white/50 uppercase">EXPIRATION</span>
                  <span className="font-semibold text-white/90">08/2028</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2.5">
          <button
            onClick={() => {
              onClose();
              onOpenScanner();
            }}
            className="flex-1 py-3 bg-[#1550d3] hover:bg-[#1a53d6] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>เปิดกล้องสแกน QR</span>
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-5 py-3 bg-slate-100 text-[#121b2e] hover:bg-slate-200 font-semibold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#1550d3]">flip</span>
            <span>{isFlipped ? 'ดูหน้าบัตร' : 'พลิกหลังบัตร'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

