import React from 'react';
import { ASSETS } from '../data/mockData';
import { UserProfile } from '../types';

interface HeaderProps {
  currentTab: string;
  user: UserProfile;
  unreadNotificationsCount: number;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenAITutor?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  user,
  unreadNotificationsCount,
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  onOpenAITutor,
}) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return 'Dashboard';
      case 'campus':
        return 'Campus';
      case 'learning':
        return 'Learning';
      case 'assignments':
        return 'Assignments';
      case 'profile':
        return 'Profile';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-safe px-4 flex justify-center mt-3 sm:mt-4 pointer-events-none">
      <div className="w-full max-w-[1280px] h-16 bg-white/85 backdrop-blur-xl rounded-2xl sm:rounded-xl shadow-[0_10px_30px_rgba(23,32,51,0.06)] flex items-center justify-between px-4 ring-1 ring-white/60 pointer-events-auto border border-[#e8ecf3]">
        {/* Logo and Screen Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-sm border border-slate-100">
            <img
              src={ASSETS.logo}
              alt="School Nexus Logo"
              className="h-7 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <span className="font-bold text-[17px] sm:text-[20px] text-[#121b2e] uppercase tracking-wide">
            {getTabTitle(currentTab)}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* AI Tutor Quick Access Button */}
          {onOpenAITutor && (
            <button
              onClick={onOpenAITutor}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#1550d3]/10 to-[#7857f8]/10 hover:from-[#1550d3]/20 hover:to-[#7857f8]/20 text-[#1550d3] border border-[#1550d3]/20 flex items-center gap-1.5 text-[13px] font-bold active:scale-95 transition-all shadow-2xs group"
              title="เปิด AI Tutor"
              aria-label="AI Tutor"
            >
              <span className="material-symbols-outlined text-[18px] text-[#1550d3] group-hover:scale-110 transition-transform">
                auto_awesome
              </span>
              <span className="hidden sm:inline">AI Tutor</span>
            </button>
          )}

          <button
            onClick={onOpenSearch}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#434654] hover:text-[#1550d3] hover:bg-[#1550d3]/5 active:scale-95 transition-all"
            title="ค้นหา"
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#434654] hover:text-[#1550d3] hover:bg-[#1550d3]/5 active:scale-95 transition-all relative"
            title="การแจ้งเตือน"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          <button
            onClick={onOpenProfile}
            className="relative ml-1 active:scale-95 transition-transform"
            title="โปรไฟล์ของคุณ"
            aria-label="Profile"
          >
            <img
              src={user.avatar || ASSETS.headerAvatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#dce1ff] shadow-sm hover:ring-[#1550d3] transition-all"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#20C997] rounded-full border-2 border-white" />
          </button>
        </div>
      </div>
    </header>
  );
};
