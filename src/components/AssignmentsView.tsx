import React, { useState } from 'react';
import { MOCK_ASSIGNMENTS } from '../data/mockData';
import { Assignment } from '../types';

interface AssignmentsViewProps {
  onOpenAssignmentModal: (assignment: Assignment) => void;
  onOpenCreateTaskModal: () => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  onOpenAssignmentModal,
  onOpenCreateTaskModal,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);

  const tabs = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'to_submit', label: 'ต้องส่ง' },
    { id: 'in_progress', label: 'กำลังทำ' },
    { id: 'submitted', label: 'ส่งแล้ว' },
    { id: 'overdue', label: 'เกินกำหนด' },
  ];

  const filteredAssignments = assignments.filter((item) => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'in_progress':
        return (
          <div className="flex items-center gap-1 text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-md shrink-0 border border-amber-200">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span className="text-[12px] font-semibold">In Progress</span>
          </div>
        );
      case 'submitted':
        return (
          <div className="flex items-center gap-1 text-[#00694d] bg-[#20C997]/15 px-2.5 py-1 rounded-md shrink-0 border border-[#20C997]/30">
            <span className="material-symbols-outlined text-[16px] fill-1">check_circle</span>
            <span className="text-[12px] font-semibold">Submitted</span>
          </div>
        );
      case 'overdue':
        return (
          <div className="flex items-center gap-1 text-[#ba1a1a] bg-[#ba1a1a]/10 px-2.5 py-1 rounded-md shrink-0 border border-[#ba1a1a]/20">
            <span className="material-symbols-outlined text-[16px] fill-1">error</span>
            <span className="text-[12px] font-semibold">Overdue</span>
          </div>
        );
      case 'to_submit':
      default:
        return (
          <div className="flex items-center gap-1 text-[#1550d3] bg-[#1550d3]/10 px-2.5 py-1 rounded-md shrink-0 border border-[#1550d3]/20">
            <span className="material-symbols-outlined text-[16px]">pending_actions</span>
            <span className="text-[12px] font-semibold">To Submit</span>
          </div>
        );
    }
  };

  const getProgressBarColor = (status: Assignment['status']) => {
    switch (status) {
      case 'submitted':
        return 'bg-[#00694d]';
      case 'overdue':
        return 'bg-[#ba1a1a]';
      case 'in_progress':
      default:
        return 'bg-[#1550d3]';
    }
  };

  return (
    <div className="flex flex-col w-full relative pb-28 pt-24 px-4 max-w-[1280px] mx-auto min-h-screen">
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Header with Title & Add Task button */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-[26px] sm:text-[32px] font-bold text-[#121b2e] leading-tight">
              ศูนย์รวมงาน
            </h1>
            <p className="text-[#434654] text-[15px]">
              จัดการและติดตามภาระงานของคุณได้ในที่เดียว
            </p>
          </div>

          <button
            onClick={onOpenCreateTaskModal}
            className="px-3.5 py-2 rounded-xl bg-[#1550d3] text-white font-semibold text-[13px] sm:text-[14px] shadow-sm hover:bg-[#1a53d6] flex items-center gap-1.5 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>เพิ่มงาน</span>
          </button>
        </div>

        {/* Filter Tabs (Horizontal Scrollable) */}
        <div className="overflow-x-auto no-scrollbar flex gap-2 pb-1 snap-x">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`snap-start shrink-0 px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1550d3] text-white shadow-sm scale-102'
                    : 'bg-[#e9edff] text-[#434654] hover:bg-[#e1e8ff] hover:text-[#121b2e]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Assignment Cards List */}
        <div className="flex flex-col gap-3.5">
          {filteredAssignments.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#f1f3ff] text-[#1550d3] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-3xl">task_alt</span>
              </div>
              <h3 className="font-bold text-lg text-[#121b2e] mb-1">
                ไม่มีงานในหมวดหมู่นี้
              </h3>
              <p className="text-sm text-[#434654]">
                คุณได้จัดการงานทั้งหมดในกลุ่มนี้เรียบร้อยแล้ว ยอดเยี่ยมมาก!
              </p>
            </div>
          ) : (
            filteredAssignments.map((as) => {
              const isOverdue = as.status === 'overdue';

              return (
                <div
                  key={as.id}
                  onClick={() => onOpenAssignmentModal(as)}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3.5 border border-slate-200/80 cursor-pointer relative overflow-hidden group hover:-translate-y-0.5"
                >
                  {/* Decorative gradient corner on hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#1550d3]/10 to-transparent rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-0" />

                  {/* Header Row: Subject, Title, Status */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-col gap-1 min-w-0">
                      <span
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-md w-fit"
                        style={{
                          backgroundColor: `${as.categoryColor}15`,
                          color: as.categoryColor,
                        }}
                      >
                        {as.subject}
                      </span>
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#121b2e] truncate group-hover:text-[#1550d3] transition-colors">
                        {as.title}
                      </h3>
                    </div>

                    {getStatusBadge(as.status)}
                  </div>

                  {/* Due date info */}
                  <div
                    className={`flex items-center gap-1.5 text-[13px] font-medium ${
                      isOverdue ? 'text-[#ba1a1a]' : 'text-[#434654]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {isOverdue ? 'event_busy' : 'event'}
                    </span>
                    <span>{as.dueRelative}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="flex flex-col gap-1.5 mt-1">
                    <div className="flex justify-between items-center text-[12px] font-semibold text-[#434654]">
                      <span>ความคืบหน้า</span>
                      <span className="text-[#121b2e] font-bold">{as.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#f1f3ff] rounded-full overflow-hidden border border-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-700 relative ${getProgressBarColor(
                          as.status
                        )}`}
                        style={{ width: `${as.progress}%` }}
                      >
                        {as.progress > 0 && as.progress < 100 && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer Row: Score */}
                  <div className="mt-1 flex justify-between items-center text-[12px] text-[#737686] pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-[#1550d3] font-medium">
                      คลิกเพื่อดูรายละเอียด & ส่งงาน ➔
                    </span>
                    <span className="font-semibold text-[#121b2e]">
                      Score: {as.currentScore}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
