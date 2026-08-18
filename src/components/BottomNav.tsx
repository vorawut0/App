import React from 'react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  pendingTasksCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  pendingTasksCount = 0
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'campus', label: 'Campus', icon: 'school' },
    { id: 'learning', label: 'Learning', icon: 'menu_book' },
    { id: 'assignments', label: 'Tasks', icon: 'assignment', badge: pendingTasksCount },
    { id: 'profile', label: 'Profile', icon: 'account_circle' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe px-3 sm:px-4 mb-3 sm:mb-4 flex justify-center pointer-events-none">
      <div className="w-full max-w-[640px] h-18 bg-white/85 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(23,32,51,0.08)] flex justify-around items-center px-2 py-1 ring-1 ring-white/70 border border-[#e8ecf3] pointer-events-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 w-14 sm:w-16 h-14 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-[#1550d3] bg-[#1550d3]/10 font-semibold scale-105 shadow-sm'
                  : 'text-[#434654] hover:text-[#1550d3] hover:bg-[#1550d3]/5 active:scale-95'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[23px] transition-transform ${
                    isActive ? 'fill-1 scale-110' : ''
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : undefined}
                >
                  {tab.icon}
                </span>

                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1 -right-2 bg-[#ba1a1a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium leading-none tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
