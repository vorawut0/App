import React, { useState, useEffect } from 'react';
import { ASSETS, MOCK_SCHEDULE } from '../data/mockData';
import { UserProfile, ScheduleItem } from '../types';
import { CampusPulseTab } from './modals/CampusPulseModal';

interface DashboardViewProps {
  user: UserProfile;
  onNavigateTab: (tab: string) => void;
  onOpenScheduleModal: (item?: ScheduleItem) => void;
  onOpenIdCardModal: () => void;
  onOpenQrScanner: () => void;
  onOpenGpaModal: () => void;
  onOpenCalendarModal: () => void;
  onOpenAITutor?: () => void;
  onOpenCampusPulse?: (tab?: CampusPulseTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onNavigateTab,
  onOpenScheduleModal,
  onOpenIdCardModal,
  onOpenQrScanner,
  onOpenGpaModal,
  onOpenCalendarModal,
  onOpenAITutor,
  onOpenCampusPulse,
}) => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const [aiMessage, setAiMessage] = useState(
    '“สวัสดีครับ วันนี้ผมพร้อมช่วยคุณจัดการเรื่องการเรียน”'
  );
  const [counterStudents, setCounterStudents] = useState(0);

  // Animate counter on mount
  useEffect(() => {
    let start = 0;
    const target = 1248;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCounterStudents(target);
        clearInterval(timer);
      } else {
        setCounterStudents(start);
      }
    }, 25);
    return () => clearInterval(timer);
  }, []);

  const handleAiSend = (queryText?: string) => {
    const textToSend = queryText || aiQuery;
    if (!textToSend.trim()) return;

    setAiThinking(true);
    setAiQuery('');

    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let response = '';

      if (q.includes('ตาราง') || q.includes('เรียน') || q.includes('คาบ')) {
        response =
          '💡 วันนี้คุณมีเรียน 4 วิชา: 09:00 วิทยาการคำนวณ (Lab 402), 11:00 การออกแบบ, 13:00 Multimedia, 15:00 คณิตศาสตร์ครับ';
      } else if (q.includes('งาน') || q.includes('การบ้าน') || q.includes('ส่ง')) {
        response =
          '📌 งานที่ต้องส่งด่วน: Coding Project (วิทยาการคำนวณ) กำหนดส่งพรุ่งนี้ 23:59 น. ทำไปแล้ว 45% ครับ';
      } else if (q.includes('เกรด') || q.includes('ผลการเรียน') || q.includes('gpa')) {
        response =
          '🌟 ผลการเรียนเฉลี่ยสะสมปัจจุบัน (GPAX): 3.92 (อยู่อันดับ Top 3% ของสายวิทย์-คอมพิวเตอร์ครับ)';
      } else if (q.includes('ห้อง') || q.includes('lab') || q.includes('อาคาร')) {
        response =
          '🏢 Computer Lab 01 และ Lab 402 เปิดใช้งานปกติ ส่วน Science Lab พร้อมใช้งาน Network Health อยู่ที่ 92% ครับ';
      } else {
        response = `🤖 ตอบคำถาม "${textToSend}": ระบบได้บันทึกและพร้อมช่วยอำนวยความสะดวกในการเรียนของคุณตลอด 24 ชั่วโมงครับ!`;
      }

      setAiMessage(`“${response}”`);
      setAiThinking(false);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full relative pb-28 pt-24 px-4 max-w-[1280px] mx-auto min-h-screen">
      {/* Living Ambient SVG Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-[460px] h-[460px] -top-20 -right-20 opacity-[0.035] animate-[spin_60s_linear_infinite]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="text-[#1550d3]"
            d="M42.7,-73.4C55.9,-65.8,67.6,-54.6,76.4,-41.4C85.2,-28.2,91.1,-13.1,89.5,1.5C87.9,16.1,78.8,30.2,68.6,42.4C58.4,54.6,47.1,64.9,33.9,71.7C20.7,78.5,5.6,81.8,-8.4,79.9C-22.4,78,-35.3,70.9,-46.8,61.7C-58.3,52.5,-68.4,41.2,-74.6,27.8C-80.8,14.4,-83.1,-1.1,-79.8,-15.5C-76.5,-29.9,-67.6,-43.2,-55.8,-52.7C-44,-62.2,-29.3,-67.9,-14.9,-71.8C-0.5,-75.7,13.6,-77.8,27.3,-76.8C41,-75.8,29.5,-81,42.7,-73.4Z"
            fill="currentColor"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="z-10 w-full flex flex-col gap-6 sm:gap-8">
        {/* Header Greeting */}
        <section className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1550d3]/10 text-[#1550d3] w-fit border border-[#1550d3]/15">
            <span className="material-symbols-outlined text-[16px]">wb_twilight</span>
            <span className="text-[12px] font-semibold tracking-wide uppercase">
              Good Evening 👋
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-bold text-[#121b2e] leading-tight">
            {user.thaiName.split(' ')[0]}, ยินดีต้อนรับกลับสู่ SCHOOL NEXUS.
          </h1>
          <p className="text-[#434654] text-[15px]">
            Here is your academic overview for today.
          </p>
        </section>

        {/* Section 1: Nexus AI School Core Assistant */}
        <section className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#1550d3]/20 via-transparent to-[#7857f8]/20 rounded-[28px] blur-sm opacity-60 pointer-events-none"></div>
          <div className="relative bg-white rounded-[24px] p-5 sm:p-6 shadow-xl shadow-[#1550d3]/5 flex flex-col gap-5 ring-1 ring-slate-200/80">
            {/* AI Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#3c6bed] text-white flex items-center justify-center relative shadow-md shadow-[#3c6bed]/30">
                  <span className="material-symbols-outlined text-[26px] fill-1">
                    smart_toy
                  </span>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-[#20C997] rounded-full border-2 border-white shadow-xs"></div>
                </div>
                <div>
                  <h2 className="font-bold text-[18px] text-[#121b2e] flex items-center gap-1.5">
                    Nexus AI
                    <span className="text-[10px] bg-[#1550d3]/10 text-[#1550d3] font-semibold px-2 py-0.5 rounded-full">
                      Gen 2.6
                    </span>
                  </h2>
                  <p className="text-[13px] text-[#434654]">School Core Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {onOpenAITutor && (
                  <button
                    onClick={onOpenAITutor}
                    className="px-3 py-1.5 rounded-xl bg-[#1550d3] text-white hover:bg-[#1a53d6] flex items-center gap-1.5 text-[12px] font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                    title="เปิดแผง AI Tutor"
                  >
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    <span>AI Tutor Panel</span>
                  </button>
                )}
                <button
                  onClick={() =>
                    handleAiSend('สรุปข้อมูลวิชาการและกิจกรรมของฉันทั้งหมดในวันนี้')
                  }
                  className="w-10 h-10 rounded-xl bg-[#f1f3ff] text-[#434654] flex items-center justify-center hover:bg-[#e1e8ff] hover:text-[#1550d3] transition-colors cursor-pointer"
                  title="AI Summary"
                >
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
            </div>

            {/* AI Speech Bubble */}
            <div className="bg-[#1550d3]/6 p-4 rounded-2xl relative border border-[#1550d3]/10 transition-all">
              <div className="absolute -top-1.5 left-6 w-3 h-3 bg-[#1550d3]/6 border-t border-l border-[#1550d3]/10 rotate-45"></div>
              <p className="text-[15px] sm:text-[16px] text-[#121b2e] relative z-10 leading-relaxed">
                {aiThinking ? (
                  <span className="flex items-center gap-2 text-[#1550d3]">
                    <span className="w-2 h-2 rounded-full bg-[#1550d3] animate-ping" />
                    Nexus AI กำลังประมวลผลคำตอบ...
                  </span>
                ) : (
                  aiMessage
                )}
              </p>
            </div>

            {/* 4 Quick Action Tiles */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <button
                onClick={() => onOpenScheduleModal()}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e1e8ff] hover:shadow-xs transition-all group border border-slate-100 text-left active:scale-98"
              >
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[18px] shadow-xs group-hover:scale-105 transition-transform">
                  📚
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[13px] sm:text-[14px] text-[#121b2e] group-hover:text-[#1550d3] transition-colors">
                    ตารางเรียนวันนี้
                  </span>
                  <span className="text-[11px] text-[#737686]">4 คาบเรียน</span>
                </div>
              </button>

              <button
                onClick={() => onNavigateTab('assignments')}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e1e8ff] hover:shadow-xs transition-all group border border-slate-100 text-left active:scale-98"
              >
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[18px] shadow-xs group-hover:scale-105 transition-transform">
                  📝
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[13px] sm:text-[14px] text-[#121b2e] group-hover:text-[#1550d3] transition-colors">
                    งานที่ต้องส่ง
                  </span>
                  <span className="text-[11px] text-[#ba1a1a] font-medium">1 งานด่วน</span>
                </div>
              </button>

              <button
                onClick={onOpenGpaModal}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e1e8ff] hover:shadow-xs transition-all group border border-slate-100 text-left active:scale-98"
              >
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[18px] shadow-xs group-hover:scale-105 transition-transform">
                  📊
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[13px] sm:text-[14px] text-[#121b2e] group-hover:text-[#1550d3] transition-colors">
                    ผลการเรียน
                  </span>
                  <span className="text-[11px] text-[#00694d] font-medium">GPA 3.92</span>
                </div>
              </button>

              <button
                onClick={onOpenCalendarModal}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e1e8ff] hover:shadow-xs transition-all group border border-slate-100 text-left active:scale-98"
              >
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[18px] shadow-xs group-hover:scale-105 transition-transform">
                  📅
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[13px] sm:text-[14px] text-[#121b2e] group-hover:text-[#1550d3] transition-colors">
                    ปฏิทิน
                  </span>
                  <span className="text-[11px] text-[#737686]">กิจกรรมสัปดาห์นี้</span>
                </div>
              </button>
            </div>

            {/* AI Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAiSend();
              }}
              className="relative mt-1"
            >
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="มีอะไรให้ช่วยไหม? (เช่น ถามตารางเรียน, ขอแนวข้อสอบ)"
                className="w-full h-13 pl-11 pr-13 rounded-2xl bg-[#f9f9ff] text-[#121b2e] text-[14px] placeholder:text-[#737686] border border-slate-200 focus:border-[#1550d3] focus:ring-2 focus:ring-[#1550d3]/20 focus:outline-none transition-all"
              />
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] text-[20px]">
                search
              </span>
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#1550d3] text-white flex items-center justify-center shadow-md hover:bg-[#1a53d6] hover:scale-105 active:scale-95 transition-all"
                title="ส่งคำถาม"
              >
                <span className="material-symbols-outlined text-[20px] fill-1">send</span>
              </button>
            </form>
          </div>
        </section>

        {/* Section 2: Student Digital Identity Card */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[18px] text-[#121b2e] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1550d3]">badge</span>
              Digital Identity
            </h3>
            <button
              onClick={onOpenIdCardModal}
              className="text-[13px] font-semibold text-[#1550d3] hover:underline"
            >
              บัตรประจำตัว 3D ➔
            </button>
          </div>

          <div
            onClick={onOpenIdCardModal}
            className="relative rounded-[24px] overflow-hidden bg-[#273044] text-white shadow-2xl p-5 sm:p-6 group cursor-pointer border border-slate-700/50 hover:shadow-cyan-900/10 transition-all duration-300"
          >
            {/* Glass & Glow Ambient Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1550d3] rounded-full mix-blend-screen filter blur-[80px] opacity-25 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#7857f8] rounded-full mix-blend-screen filter blur-[60px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-5">
              {/* Header Info */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/30 p-0.5 bg-white/10 backdrop-blur-md shadow-inner shrink-0">
                    <img
                      src={user.avatar || ASSETS.cardAvatar}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[17px] sm:text-[19px] tracking-tight text-white uppercase">
                      {user.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-md bg-white/15 text-[11px] font-bold tracking-wider backdrop-blur-md border border-white/15 text-white">
                        LEVEL {user.level}
                      </span>
                      <span className="text-white/40 text-xs">•</span>
                      <span className="text-[12px] text-[#b5c4ff] flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[15px] text-amber-400">
                          local_fire_department
                        </span>
                        {user.streakDays} Day Streak
                      </span>
                    </div>
                  </div>
                </div>

                {/* QR Scanner Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenQrScanner();
                  }}
                  className="w-11 h-11 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                  title="สแกน QR Code"
                >
                  <span className="material-symbols-outlined text-white text-[22px]">
                    qr_code_scanner
                  </span>
                </button>
              </div>

              {/* Stats & Progress */}
              <div className="bg-black/25 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
                      TOTAL EXPERIENCE
                    </span>
                    <span className="text-[20px] font-bold text-white">
                      {user.xp.toLocaleString()}{' '}
                      <span className="text-[#b5c4ff] text-[14px]">XP</span>
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-white/90 bg-white/15 px-2.5 py-1 rounded-lg border border-white/10">
                    82% to Level {user.level + 1}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-white/15 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-gradient-to-r from-[#b5c4ff] to-[#7857f8] rounded-full w-[82%] relative">
                    <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Badges & Chip */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
                    Achievements (18)
                  </span>
                  <div className="flex gap-2">
                    <div
                      className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg border border-white/10 hover:scale-110 transition-transform shadow-xs"
                      title="Champion 2026"
                    >
                      🏆
                    </div>
                    <div
                      className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg border border-white/10 hover:scale-110 transition-transform shadow-xs"
                      title="Streak Master"
                    >
                      🔥
                    </div>
                    <div
                      className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg border border-white/10 hover:scale-110 transition-transform shadow-xs"
                      title="Code Hacker"
                    >
                      💻
                    </div>
                    <div
                      className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg border border-white/10 hover:scale-110 transition-transform shadow-xs"
                      title="Media Director"
                    >
                      🎬
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={ASSETS.chipNfc}
                    alt="NFC Smart Chip"
                    className="w-11 h-11 object-contain opacity-70"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Today's Schedule Timeline */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[18px] text-[#121b2e] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1550d3]">schedule</span>
              Today's Schedule
            </h3>
            <button
              onClick={() => onOpenScheduleModal()}
              className="text-[13px] font-semibold text-[#1550d3] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md ring-1 ring-slate-200/70 relative overflow-hidden">
            {/* Vertical timeline line */}
            <div className="absolute top-8 bottom-8 left-[65px] sm:left-[75px] w-0.5 bg-[#e1e8ff] z-0"></div>

            <div className="flex flex-col gap-4 relative z-10">
              {MOCK_SCHEDULE.map((item) => {
                const isActive = item.status === 'active';
                return (
                  <div
                    key={item.id}
                    onClick={() => onOpenScheduleModal(item)}
                    className="flex gap-4 items-center group cursor-pointer"
                  >
                    {/* Time Label */}
                    <div className="w-14 sm:w-16 text-right shrink-0">
                      <span
                        className={`text-[14px] font-semibold ${
                          isActive ? 'text-[#1550d3]' : 'text-[#737686]'
                        }`}
                      >
                        {item.time}
                      </span>
                    </div>

                    {/* Timeline node */}
                    <div
                      className={`relative w-4 h-4 rounded-full border-2 shrink-0 z-10 transition-all ${
                        isActive
                          ? 'bg-[#1550d3] border-white ring-4 ring-[#1550d3]/20 scale-125'
                          : 'bg-white border-[#737686] group-hover:border-[#1550d3]'
                      }`}
                    />

                    {/* Class Card */}
                    <div
                      className={`flex-1 rounded-2xl p-3.5 sm:p-4 transition-all duration-200 border ${
                        isActive
                          ? 'bg-[#f1f3ff] border-[#1550d3]/30 shadow-sm'
                          : 'bg-slate-50/70 border-slate-200/60 hover:bg-[#f1f3ff] hover:border-[#1550d3]/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4
                          className={`font-semibold text-[15px] ${
                            isActive ? 'text-[#1550d3]' : 'text-[#121b2e]'
                          }`}
                        >
                          {item.title}
                        </h4>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1550d3]/10 text-[#1550d3] border border-[#1550d3]/20">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-[#737686] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          location_on
                        </span>
                        {item.room}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: Real-Time Campus Pulse */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[18px] text-[#121b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1550d3]">monitoring</span>
                Campus Pulse
              </h3>
              <div className="flex items-center gap-1.5 bg-[#20C997]/10 px-2.5 py-0.5 rounded-full border border-[#20C997]/20">
                <span className="w-2 h-2 rounded-full bg-[#20C997] animate-pulse"></span>
                <span className="text-[10.5px] font-bold text-[#00694d] uppercase tracking-wider">
                  Live Telemetry
                </span>
              </div>
            </div>

            {onOpenCampusPulse && (
              <button
                onClick={() => onOpenCampusPulse('overview')}
                className="text-[12px] font-bold text-[#1550d3] hover:underline flex items-center gap-1 cursor-pointer group"
                title="คลิกเพื่อดูรายละเอียดสถิติเชิงลึก"
              >
                <span>ดูรายละเอียดทั้งหมด</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Students */}
            <div
              onClick={() => onOpenCampusPulse && onOpenCampusPulse('students')}
              className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-200/70 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-md hover:ring-[#1550d3]/40 transition-all cursor-pointer group relative overflow-hidden"
              title="คลิกเพื่อดูโครงสร้างประชากรนักเรียนและแผนการเรียน"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#1550d3]/10 text-[#1550d3] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1550d3] group-hover:text-white transition-all shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">group</span>
                </div>
                <span className="text-[10px] font-bold text-[#1550d3] bg-[#1550d3]/10 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  ดูสถิติ ➔
                </span>
              </div>
              <div>
                <span className="text-[12px] font-medium text-[#737686] mb-1 block">
                  Total Students
                </span>
                <div className="text-[22px] sm:text-[26px] text-[#121b2e] font-bold tracking-tight">
                  {counterStudents.toLocaleString()}
                </div>
              </div>
              <div className="mt-2 text-[10.5px] text-[#737686] group-hover:text-[#1550d3] flex items-center gap-1 font-medium transition-colors">
                <span className="material-symbols-outlined text-[13px]">touch_app</span>
                คลิกดูระดับชั้น ม.1-ม.6
              </div>
            </div>

            {/* Teachers */}
            <div
              onClick={() => onOpenCampusPulse && onOpenCampusPulse('teachers')}
              className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-200/70 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-md hover:ring-[#5f3add]/40 transition-all cursor-pointer group relative overflow-hidden"
              title="คลิกเพื่อดูรายชื่ออาจารย์และสถานะ Office Hours"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#5f3add]/10 text-[#5f3add] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#5f3add] group-hover:text-white transition-all shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">school</span>
                </div>
                <span className="text-[10px] font-bold text-[#5f3add] bg-[#5f3add]/10 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  ดูคณาจารย์ ➔
                </span>
              </div>
              <div>
                <span className="text-[12px] font-medium text-[#737686] mb-1 block">
                  Teachers
                </span>
                <div className="text-[22px] sm:text-[26px] text-[#121b2e] font-bold tracking-tight">
                  86
                </div>
              </div>
              <div className="mt-2 text-[10.5px] text-[#737686] group-hover:text-[#5f3add] flex items-center gap-1 font-medium transition-colors">
                <span className="material-symbols-outlined text-[13px]">touch_app</span>
                พร้อมปรึกษา 22 ท่าน
              </div>
            </div>

            {/* Online Now */}
            <div
              onClick={() => onOpenCampusPulse && onOpenCampusPulse('online')}
              className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-200/70 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-md hover:ring-[#20C997]/40 transition-all cursor-pointer group relative overflow-hidden"
              title="คลิกเพื่อดูความหนาแน่น Wi-Fi และเครือข่ายแต่ละอาคาร"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#20C997]/15 text-[#00694d] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#20C997] group-hover:text-white transition-all shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">wifi</span>
                </div>
                <span className="text-[10px] font-bold text-[#00694d] bg-[#20C997]/20 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  ดูโซน ➔
                </span>
              </div>
              <div>
                <span className="text-[12px] font-medium text-[#737686] mb-1 block">
                  Online Now
                </span>
                <div className="text-[22px] sm:text-[26px] text-[#121b2e] font-bold tracking-tight">
                  326
                </div>
              </div>
              <div className="mt-2 text-[10.5px] text-[#737686] group-hover:text-[#00694d] flex items-center gap-1 font-medium transition-colors">
                <span className="material-symbols-outlined text-[13px]">touch_app</span>
                Wi-Fi 6 & LMS Traffic
              </div>
            </div>

            {/* Attendance */}
            <div
              onClick={() => onOpenCampusPulse && onOpenCampusPulse('attendance')}
              className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-200/70 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-md hover:ring-amber-400 transition-all cursor-pointer group relative overflow-hidden"
              title="คลิกเพื่อดูสถิติการเข้าเรียนและการตรงต่อเวลาแยกตามห้อง"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFB800]/15 text-amber-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FFB800] group-hover:text-amber-950 transition-all shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">fact_check</span>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-[#FFB800]/20 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  ดูรายห้อง ➔
                </span>
              </div>
              <div>
                <span className="text-[12px] font-medium text-[#737686] mb-1 block">
                  Attendance
                </span>
                <div className="text-[22px] sm:text-[26px] text-[#121b2e] font-bold tracking-tight">
                  96.8<span className="text-sm font-normal text-[#737686]">%</span>
                </div>
              </div>
              <div className="mt-2 text-[10.5px] text-[#737686] group-hover:text-amber-700 flex items-center gap-1 font-medium transition-colors">
                <span className="material-symbols-outlined text-[13px]">touch_app</span>
                เช็กชื่อ RFID Gate 100%
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
