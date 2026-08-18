import React, { useState } from 'react';
import { ASSETS, DEMO_PRESET_USERS } from '../data/mockData';
import { UserProfile, UserRole } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onSwitchRole: (role: UserRole) => void;
  onSignOut: () => void;
  onOpenQrScanner: () => void;
  onOpenGpaModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onSwitchRole,
  onSignOut,
  onOpenQrScanner,
  onOpenGpaModal,
}) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [nfcFastCheckIn, setNfcFastCheckIn] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <div className="flex flex-col w-full relative pb-28 pt-24 px-4 max-w-[1280px] mx-auto min-h-screen">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Title Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-[26px] sm:text-[32px] font-bold text-[#121b2e] leading-tight">
              Profile & Digital ID
            </h1>
            <p className="text-[#434654] text-[15px]">
              ข้อมูลส่วนตัวและบัตรประจำตัวดิจิทัล
            </p>
          </div>

          <button
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            className="px-3 py-1.5 rounded-xl bg-white text-[#1550d3] border border-blue-200 text-xs font-semibold shadow-xs flex items-center gap-1 hover:bg-blue-50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">flip</span>
            <span>{isCardFlipped ? 'ดูหน้าบัตร' : 'พลิกหลังบัตร'}</span>
          </button>
        </div>

        {/* 3D Flippable Digital Identity Smart Card */}
        <div className="perspective-1000 w-full max-w-md mx-auto">
          <div
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            className={`relative w-full h-[240px] sm:h-[250px] transition-transform duration-700 transform-style-3d cursor-pointer ${
              isCardFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front of Card */}
            <div className="absolute inset-0 w-full h-full bg-[#273044] rounded-[24px] p-5 sm:p-6 text-white shadow-2xl flex flex-col justify-between backface-hidden border border-slate-700/60 overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-[#1550d3] rounded-full mix-blend-screen filter blur-[75px] opacity-35 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-44 h-44 bg-[#7857f8] rounded-full mix-blend-screen filter blur-[60px] opacity-35 pointer-events-none" />

              <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-white/40 p-0.5 bg-white/10 backdrop-blur-md shadow-inner shrink-0">
                    <img
                      src={user.avatar || ASSETS.cardAvatar}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] sm:text-[18px] tracking-tight uppercase">
                      {user.name}
                    </h3>
                    <div className="text-[12px] text-[#b5c4ff] font-medium">
                      {user.thaiName}
                    </div>
                    <div className="text-[11px] text-white/70 mt-0.5">
                      ID: {user.studentId} • {user.grade}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-bold tracking-widest text-white/60 uppercase">
                    SCHOOL NEXUS
                  </span>
                  <span className="px-2 py-0.5 mt-1 rounded bg-white/20 text-[10px] font-bold tracking-wider">
                    LV.{user.level}
                  </span>
                </div>
              </div>

              {/* Middle RFID & Streak */}
              <div className="relative z-10 bg-black/25 rounded-xl p-3 border border-white/10 flex justify-between items-center backdrop-blur-md">
                <div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wider">
                    Major / Department
                  </div>
                  <div className="text-[13px] font-bold text-white truncate max-w-[200px]">
                    {user.major}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/60 uppercase tracking-wider">
                    Streak
                  </div>
                  <div className="text-[13px] font-bold text-amber-300 flex items-center gap-1 justify-end">
                    <span>🔥</span> {user.streakDays} Days
                  </div>
                </div>
              </div>

              {/* Bottom Card Controls */}
              <div className="relative z-10 flex justify-between items-center">
                <div className="text-[11px] text-white/70">
                  แตะเพื่อพลิกดูบาร์โค้ด & ชิป NFC
                </div>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-[20px] text-white/80">
                    contactless
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-white/80">
                    qr_code_2
                  </span>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div className="absolute inset-0 w-full h-full bg-[#1e2538] rounded-[24px] p-5 sm:p-6 text-white shadow-2xl flex flex-col justify-between rotate-y-180 backface-hidden border border-slate-700/60 overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-[11px] font-bold tracking-wider text-white/70 uppercase">
                  Digital School Credential
                </span>
                <span className="text-[11px] text-[#20C997] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#20C997] inline-block"></span>
                  Active Card
                </span>
              </div>

              {/* Simulated Barcode */}
              <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-black">
                <div className="h-10 w-full flex items-center justify-center gap-1">
                  {[4, 2, 6, 1, 8, 3, 5, 2, 7, 3, 5, 2, 8, 4, 2, 6, 1, 9, 3, 2, 7, 4, 5, 3].map(
                    (w, i) => (
                      <div
                        key={i}
                        className="bg-black h-full rounded-xs"
                        style={{ width: `${w * 1.5}px` }}
                      />
                    )
                  )}
                </div>
                <span className="font-mono text-[12px] font-bold mt-1 tracking-widest">
                  *{user.studentId}*
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-white/70 pt-1">
                <div>RFID: {user.rfidCard}</div>
                <div>EXP: 08/2028</div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Details Card */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 flex flex-col gap-4">
          <h3 className="font-bold text-[17px] text-[#121b2e] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1550d3]">school</span>
              ข้อมูลการศึกษา
            </span>
            <button
              onClick={onOpenGpaModal}
              className="text-xs font-semibold text-[#1550d3] hover:underline"
            >
              ดูใบบันทึกผลการเรียน ➔
            </button>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-[#f1f3ff]">
              <div className="text-[11px] text-[#737686] font-semibold">เกรดเฉลี่ย (GPAX)</div>
              <div className="text-[18px] font-bold text-[#1550d3]">{user.gpa}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f1f3ff]">
              <div className="text-[11px] text-[#737686] font-semibold">ชั้นเรียน</div>
              <div className="text-[15px] font-bold text-[#121b2e]">{user.room}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f1f3ff]">
              <div className="text-[11px] text-[#737686] font-semibold">อีเมลสถานศึกษา</div>
              <div className="text-[13px] font-semibold text-[#121b2e] truncate">
                {user.email}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#f1f3ff]">
              <div className="text-[11px] text-[#737686] font-semibold">อาจารย์ที่ปรึกษา</div>
              <div className="text-[13px] font-semibold text-[#121b2e] truncate">
                {user.advisor}
              </div>
            </div>
          </div>
        </section>

        {/* Switch Role Simulator for Demo */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 flex flex-col gap-3">
          <h3 className="font-bold text-[17px] text-[#121b2e] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5f3add]">swap_horiz</span>
            สลับบทบาทผู้ใช้งาน (Demo Role Switcher)
          </h3>
          <p className="text-xs text-[#434654]">
            ทดสอบการแสดงผลและสิทธิ์ในมุมมองของแต่ละประเภทผู้ใช้:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(['student', 'teacher', 'admin', 'parent'] as UserRole[]).map((r) => {
              const isCurrent = user.role === r;
              const labels: Record<UserRole, { title: string; desc: string }> = {
                student: { title: 'นักเรียน', desc: 'วรวุฒิ' },
                teacher: { title: 'อาจารย์', desc: 'อ.กิตติพงษ์' },
                admin: { title: 'ผู้ดูแลระบบ', desc: 'IT Admin' },
                parent: { title: 'ผู้ปกครอง', desc: 'นายสมบัติ' },
              };

              return (
                <button
                  key={r}
                  onClick={() => onSwitchRole(r)}
                  className={`p-3 rounded-xl flex flex-col text-left transition-all border cursor-pointer ${
                    isCurrent
                      ? 'bg-[#1550d3] text-white border-[#1550d3] shadow-sm scale-102'
                      : 'bg-[#f9f9ff] text-[#121b2e] border-slate-200 hover:bg-[#e9edff]'
                  }`}
                >
                  <span className="font-bold text-[14px]">{labels[r].title}</span>
                  <span className={`text-[11px] ${isCurrent ? 'text-white/80' : 'text-[#737686]'}`}>
                    {labels[r].desc}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* App Settings */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 flex flex-col gap-3.5">
          <h3 className="font-bold text-[17px] text-[#121b2e] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1550d3]">settings</span>
            การตั้งค่าแอปพลิเคชัน
          </h3>

          <div className="flex flex-col divide-y divide-slate-100 text-sm">
            <div className="flex justify-between items-center py-3">
              <div>
                <div className="font-semibold text-[#121b2e]">การแจ้งเตือนแบบพุช</div>
                <div className="text-xs text-[#737686]">เตือนคาบเรียน การบ้าน และคะแนนสอบ</div>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#1550d3] cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center py-3">
              <div>
                <div className="font-semibold text-[#121b2e]">NFC / RFID Fast Check-in</div>
                <div className="text-xs text-[#737686]">แตะโทรศัพท์เพื่อเช็กชื่อเข้าห้องเรียน</div>
              </div>
              <input
                type="checkbox"
                checked={nfcFastCheckIn}
                onChange={(e) => setNfcFastCheckIn(e.target.checked)}
                className="w-5 h-5 accent-[#1550d3] cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={onSignOut}
            className="w-full py-3 mt-2 rounded-xl bg-red-50 text-[#ba1a1a] hover:bg-red-100 font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-red-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>ออกจากระบบ (Sign Out)</span>
          </button>
        </section>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
