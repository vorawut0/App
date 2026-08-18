import React, { useState } from 'react';
import { Assignment } from '../../types';

interface AssignmentModalProps {
  assignment: Assignment | null;
  onClose: () => void;
  onSubmitWork: (assignmentId: string, progress: number, notes: string) => void;
}

export const AssignmentModal: React.FC<AssignmentModalProps> = ({
  assignment,
  onClose,
  onSubmitWork,
}) => {
  if (!assignment) return null;

  const [notes, setNotes] = useState('');
  const [progress, setProgress] = useState(assignment.progress);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([
    'project_submission_final_v1.zip',
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onSubmitWork(assignment.id, 100, notes);
      onClose();
    }, 1000);
  };

  const handleAddFile = () => {
    const fileName = `attachment_${Date.now().toString().slice(-4)}.pdf`;
    setAttachedFiles([...attachedFiles, fileName]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-[28px] max-w-xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-scaleIn">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#f9f9ff] border-b border-slate-200 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-md w-fit"
              style={{
                backgroundColor: `${assignment.categoryColor}15`,
                color: assignment.categoryColor,
              }}
            >
              {assignment.subject} ({assignment.subjectCode})
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#121b2e]">
              {assignment.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#737686]">
              <span className="material-symbols-outlined text-[15px]">event</span>
              <span>กำหนดส่ง: {assignment.dueRelative}</span>
              <span>•</span>
              <span className="font-semibold text-[#121b2e]">
                คะแนนเต็ม: {assignment.maxScore} คะแนน
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 text-[#434654] hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-[#737686] uppercase tracking-wider mb-1.5">
              รายละเอียดคำสั่ง
            </h4>
            <div className="p-4 rounded-2xl bg-[#f1f3ff] text-sm text-[#121b2e] leading-relaxed border border-blue-50">
              {assignment.description}
            </div>
          </div>

          {/* Progress Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-[#434654]">อัปเดตความคืบหน้างาน</span>
              <span className="text-[#1550d3] font-bold">{progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1550d3]"
            />
          </div>

          {/* Upload Attachments */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-[#737686] uppercase tracking-wider">
                ไฟล์แนบผลงาน ({attachedFiles.length})
              </h4>
              <button
                type="button"
                onClick={handleAddFile}
                className="text-xs font-semibold text-[#1550d3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">upload_file</span>
                <span>+ แนบไฟล์เพิ่ม</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {attachedFiles.map((file, i) => (
                <div
                  key={i}
                  className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="material-symbols-outlined text-[#1550d3]">description</span>
                    <span className="font-semibold text-[#121b2e] truncate">{file}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachedFiles(attachedFiles.filter((_, index) => index !== i))
                    }
                    className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Note */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#737686] uppercase tracking-wider">
              บันทึกข้อความถึงอาจารย์ผู้สอน
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ระบุลิงก์ GitHub, Figma หรือข้อความเพิ่มเติม..."
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#1550d3] focus:ring-2 focus:ring-[#1550d3]/20 focus:outline-none"
            />
          </div>

          {/* Status Message */}
          {isSuccess && (
            <div className="p-3 bg-[#20C997]/15 rounded-xl text-[#00694d] text-sm font-semibold text-center animate-bounce">
              ✅ ส่งงานสำเร็จแล้ว! อาจารย์จะได้รับแจ้งเตือนทันที
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors"
            >
              ปิด
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#1550d3] text-white font-semibold text-sm hover:bg-[#1a53d6] shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>ส่งงาน (Submit)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
