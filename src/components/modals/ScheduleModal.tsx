import React, { useState } from 'react';
import { MOCK_SCHEDULE } from '../../data/mockData';
import { ScheduleItem } from '../../types';

interface ScheduleModalProps {
  selectedItem: ScheduleItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  selectedItem,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeDay, setActiveDay] = useState<string>('mon');

  const days = [
    { id: 'mon', label: 'จันทร์ (Mon)' },
    { id: 'tue', label: 'อังคาร (Tue)' },
    { id: 'wed', label: 'พุธ (Wed)' },
    { id: 'thu', label: 'พฤหัส (Thu)' },
    { id: 'fri', label: 'ศุกร์ (Fri)' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-[28px] max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-scaleIn">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#f9f9ff] border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#1550d3] text-2xl">
              calendar_month
            </span>
            <div>
              <h2 className="text-xl font-bold text-[#121b2e]">ตารางเรียนประจำสัปดาห์</h2>
              <p className="text-xs text-[#434654]">
                มัธยมศึกษาปีที่ 6/1 • ภาคเรียนที่ 1/2569
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Day Selector */}
        <div className="flex border-b border-slate-200 px-4 pt-3 gap-2 bg-[#f1f3ff] overflow-x-auto no-scrollbar">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeDay === day.id
                  ? 'bg-[#1550d3] text-white shadow-xs'
                  : 'bg-white text-[#434654] hover:bg-slate-100'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Timetable Items */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto flex flex-col gap-3">
          {MOCK_SCHEDULE.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                item.status === 'active'
                  ? 'bg-[#1550d3]/8 border-[#1550d3]/40 shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-16 text-xs font-bold text-[#1550d3] bg-white p-2 rounded-xl border border-slate-200 text-center shadow-2xs shrink-0">
                  {item.startTime} - {item.endTime}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#121b2e]">{item.title}</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded">
                      {item.subjectCode}
                    </span>
                    {item.status === 'active' && (
                      <span className="text-[10px] bg-[#20C997]/20 text-[#00694d] font-bold px-2 py-0.5 rounded-full">
                        กำลังเรียน
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#737686] mt-0.5 flex items-center gap-2">
                    <span>{item.room}</span>
                    <span>•</span>
                    <span>{item.instructor}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 self-end sm:self-auto">
                <button
                  onClick={() => alert(`เช็กชื่อและดาวน์โหลดเอกสารวิชา ${item.title}`)}
                  className="px-3 py-1.5 bg-[#f1f3ff] text-[#1550d3] hover:bg-[#1550d3] hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  สื่อการสอน
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
