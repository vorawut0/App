import React, { useState } from 'react';
import { ASSETS, DEMO_PRESET_USERS } from '../data/mockData';
import { UserProfile, UserRole } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);
  const [identifier, setIdentifier] = useState<string>('66040217');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [showItHelp, setShowItHelp] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>('');
  const [resetSent, setResetSent] = useState<boolean>(false);

  const roles: { role: UserRole; label: string; defaultId: string }[] = [
    { role: 'student', label: 'นักเรียน', defaultId: '66040217' },
    { role: 'teacher', label: 'ครู', defaultId: 'T-55104' },
    { role: 'admin', label: 'ผู้ดูแล', defaultId: 'ADM-001' },
    { role: 'parent', label: 'ผู้ปกครอง', defaultId: 'P-66040217' },
  ];

  const handleRoleChange = (index: number) => {
    setActiveRoleIndex(index);
    const selectedRole = roles[index];
    setIdentifier(selectedRole.defaultId);
    setPassword('nexus2026');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const selectedRole = roles[activeRoleIndex].role;
      const targetUser = DEMO_PRESET_USERS[selectedRole] || DEMO_PRESET_USERS.student;
      setIsLoading(false);
      onLoginSuccess(targetUser);
    }, 600);
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    const targetUser = DEMO_PRESET_USERS[role];
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(targetUser);
    }, 300);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f9f9ff] text-[#121b2e] flex flex-col justify-between items-center px-4 pt-10 pb-8 overflow-hidden font-['Noto_Sans_Thai',sans-serif]">
      {/* Background Ambient Blobs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-[#1550d3]/10 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-[#7857f8]/12 blur-3xl mix-blend-multiply"></div>
      </div>

      {/* Campus Background Vector Illustration */}
      <div
        className="absolute bottom-0 inset-x-0 h-80 bg-cover bg-top opacity-35 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('${ASSETS.campusBg}')`,
          maskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
        }}
      />

      {/* Top Header Placeholder */}
      <div className="w-full max-w-md flex justify-between items-center z-10 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-white p-0.5 shadow-sm border border-slate-100 flex items-center justify-center">
            <img src={ASSETS.logo} alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-xs font-bold tracking-widest text-[#121b2e] uppercase">
            SCHOOL NEXUS
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-[#434654] bg-white/70 px-2.5 py-1 rounded-full border border-white/60 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#20C997] animate-pulse"></span>
          <span>v2.6 Cloud</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#e9edff]/75 backdrop-blur-2xl rounded-[32px] p-6 sm:p-8 shadow-2xl relative z-10 flex flex-col items-center border border-white/70">
        {/* Logo */}
        <div className="mb-6 relative group cursor-pointer" onClick={() => handleQuickDemoLogin('student')}>
          <div className="absolute inset-0 bg-[#1550d3]/25 rounded-3xl blur-xl group-hover:bg-[#1550d3]/40 transition-all duration-500"></div>
          <div className="w-24 h-24 rounded-3xl relative z-10 shadow-lg bg-white p-3 flex items-center justify-center border border-white/80">
            <img
              alt="School Nexus Logo"
              className="w-full h-full object-contain"
              src={ASSETS.logo}
            />
          </div>
        </div>

        {/* Header Text */}
        <div className="text-center mb-6">
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#121b2e] leading-tight mb-1.5 tracking-tight">
            ยินดีต้อนรับเข้าสู่ระบบ
          </h1>
          <p className="text-[#434654] text-[15px]">ระบบบริหารจัดการโรงเรียนอัจฉริยะ SCHOOL NEXUS</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="w-full bg-[#e1e8ff] rounded-full p-1 flex mb-6 shadow-inner relative overflow-hidden">
          <div
            className="absolute inset-y-1 left-1 w-[calc(25%-6px)] bg-white rounded-full shadow-md transition-transform duration-300 ease-out z-0"
            style={{ transform: `translateX(${activeRoleIndex * 100}%)` }}
          />
          {roles.map((item, idx) => (
            <button
              key={item.role}
              type="button"
              onClick={() => handleRoleChange(idx)}
              className={`flex-1 py-2 text-[13px] sm:text-[14px] font-medium z-10 rounded-full transition-colors ${
                activeRoleIndex === idx
                  ? 'text-[#121b2e] font-semibold'
                  : 'text-[#434654] hover:text-[#121b2e]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          {/* Email / Student ID Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#737686] group-focus-within:text-[#1550d3] transition-colors">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full bg-white text-[#121b2e] placeholder:text-[#737686] text-[15px] rounded-2xl py-3.5 pl-12 pr-4 shadow-sm border border-transparent focus:border-[#1550d3]/30 focus:outline-none focus:ring-3 focus:ring-[#1550d3]/20 transition-all"
              placeholder={activeRoleIndex === 0 ? "อีเมล / รหัสนักเรียน" : "อีเมล / รหัสประจำตัว"}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#737686] group-focus-within:text-[#1550d3] transition-colors">
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white text-[#121b2e] placeholder:text-[#737686] text-[15px] rounded-2xl py-3.5 pl-12 pr-12 shadow-sm border border-transparent focus:border-[#1550d3]/30 focus:outline-none focus:ring-3 focus:ring-[#1550d3]/20 transition-all"
              placeholder="รหัสผ่าน"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#737686] hover:text-[#1550d3] transition-colors"
              aria-label="Toggle password visibility"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </button>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between mt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#1550d3] border-slate-300 focus:ring-[#1550d3] accent-[#1550d3]"
              />
              <span className="text-[13px] text-[#434654]">จดจำฉัน</span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-[13px] text-[#1550d3] font-medium hover:underline transition-colors"
            >
              ลืมรหัสผ่าน?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1550d3] text-white rounded-2xl py-4 mt-2 font-semibold text-[16px] shadow-lg shadow-[#1550d3]/30 hover:bg-[#1a53d6] hover:shadow-xl hover:-translate-y-0.5 transition-all active:translate-y-0 relative overflow-hidden group flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>กำลังเข้าสู่ระบบ...</span>
              </div>
            ) : (
              <>
                <span>เข้าสู่ระบบ</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Switcher Pills */}
        <div className="mt-5 w-full pt-4 border-t border-white/40 flex flex-col items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737686]">
            ทดลองเข้าใช้งานทันที (Demo Accounts)
          </span>
          <div className="flex flex-wrap gap-1.5 justify-center">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="px-3 py-1.5 text-xs rounded-xl bg-white/90 text-[#1550d3] font-medium border border-blue-100 hover:bg-blue-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">school</span>
              <span>นักเรียน (วรวุฒิ)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('teacher')}
              className="px-3 py-1.5 text-xs rounded-xl bg-white/90 text-[#5f3add] font-medium border border-purple-100 hover:bg-purple-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span>ครู (อ.กิตติพงษ์)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-3 py-1.5 text-xs rounded-xl bg-white/90 text-[#00694d] font-medium border border-emerald-100 hover:bg-emerald-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              <span>ผู้ดูแลระบบ</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('parent')}
              className="px-3 py-1.5 text-xs rounded-xl bg-white/90 text-amber-800 font-medium border border-amber-100 hover:bg-amber-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">family_restroom</span>
              <span>ผู้ปกครอง</span>
            </button>
          </div>
        </div>

        {/* IT Support Help Link */}
        <div className="mt-5 text-center">
          <p className="text-[13px] text-[#434654]">
            พบปัญหาการเข้าสู่ระบบ?{' '}
            <button
              type="button"
              onClick={() => setShowItHelp(true)}
              className="text-[#1550d3] font-semibold hover:underline"
            >
              ติดต่อฝ่าย IT
            </button>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#121b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1550d3]">lock_reset</span>
                รีเซ็ตรหัสผ่าน
              </h3>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetSent(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {resetSent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#20C997]/15 text-[#008562] flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-3xl">mark_email_read</span>
                </div>
                <h4 className="font-bold text-lg text-[#121b2e] mb-1">ส่งลิงก์รีเซ็ตสำเร็จ</h4>
                <p className="text-sm text-[#434654] mb-4">
                  ระบบได้ส่งลิงก์กู้คืนรหัสผ่านไปยัง <span className="font-semibold text-[#121b2e]">{resetEmail || 'อีเมลของคุณ'}</span> เรียบร้อยแล้ว กรุณาตรวจสอบกล่องข้อความ
                </p>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetSent(false);
                  }}
                  className="w-full py-3 bg-[#1550d3] text-white rounded-xl font-semibold"
                >
                  เข้าใจแล้ว
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-[#434654] mb-4">
                  กรอกอีเมลสถานศึกษาหรือรหัสนักเรียนเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่
                </p>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@schoolnexus.ac.th"
                  className="w-full bg-[#f1f3ff] text-[#121b2e] p-3.5 rounded-xl text-sm mb-4 border border-transparent focus:border-[#1550d3] focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={() => {
                      if (resetEmail.trim() || identifier) {
                        setResetSent(true);
                      }
                    }}
                    className="flex-1 py-3 bg-[#1550d3] text-white rounded-xl font-semibold hover:bg-[#1a53d6]"
                  >
                    ส่งคำขอ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* IT Support Modal */}
      {showItHelp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#121b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1550d3]">support_agent</span>
                ศูนย์ช่วยเหลือฝ่าย IT
              </h3>
              <button
                onClick={() => setShowItHelp(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-3 text-sm text-[#434654] mb-5">
              <div className="p-3 bg-[#f1f3ff] rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1550d3]">call</span>
                <div>
                  <div className="font-semibold text-[#121b2e]">สายด่วนศูนย์คอมพิวเตอร์</div>
                  <div>02-999-8888 ต่อ 101-105 (08:00 - 17:00 น.)</div>
                </div>
              </div>
              <div className="p-3 bg-[#f1f3ff] rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1550d3]">mail</span>
                <div>
                  <div className="font-semibold text-[#121b2e]">อีเมลฝ่ายสนับสนุน</div>
                  <div>helpdesk@schoolnexus.ac.th</div>
                </div>
              </div>
              <div className="p-3 bg-[#f1f3ff] rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1550d3]">location_on</span>
                <div>
                  <div className="font-semibold text-[#121b2e]">ห้องบริการไอที (On-site)</div>
                  <div>อาคารอำนวยการ ชั้น 2 ห้อง Service Center 204</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowItHelp(false)}
              className="w-full py-3 bg-[#1550d3] text-white rounded-xl font-semibold"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
