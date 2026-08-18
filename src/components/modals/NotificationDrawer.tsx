import React from 'react';
import { NotificationItem } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearNotifications,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slideLeft border-l border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-[#f9f9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1550d3]">notifications</span>
            <h2 className="text-lg font-bold text-[#121b2e]">การแจ้งเตือน</h2>
            <span className="text-xs bg-[#1550d3] text-white px-2 py-0.5 rounded-full font-bold">
              {notifications.filter((n) => !n.read).length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Action toolbar */}
        <div className="flex justify-between items-center px-5 py-2.5 bg-slate-50 border-b border-slate-100 text-xs font-semibold">
          <button
            onClick={onMarkAllAsRead}
            className="text-[#1550d3] hover:underline cursor-pointer"
          >
            อ่านทั้งหมดแล้ว
          </button>
          <button
            onClick={onClearNotifications}
            className="text-slate-500 hover:text-red-600 cursor-pointer"
          >
            ล้างการแจ้งเตือน
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <span className="material-symbols-outlined text-4xl block mb-2">
                notifications_off
              </span>
              ไม่มีการแจ้งเตือนใหม่
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-4 flex gap-3 transition-colors ${
                  !item.read ? 'bg-[#1550d3]/5 font-medium' : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#1550d3] text-[20px]">
                    {item.type === 'class'
                      ? 'schedule'
                      : item.type === 'assignment'
                      ? 'assignment'
                      : item.type === 'grade'
                      ? 'stars'
                      : 'info'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#121b2e] leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-[#737686] shrink-0 ml-2">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#434654] mt-1 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
