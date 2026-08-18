import React, { useState, useEffect, useRef } from 'react';
import { Course, UserProfile } from '../types';
import { MOCK_COURSES } from '../data/mockData';

interface AITutorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  initialCourse?: Course | null;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: 'study_tips' | 'simplify' | 'qa' | 'quiz';
  courseCode?: string;
}

export const AITutorSidebar: React.FC<AITutorSidebarProps> = ({
  isOpen,
  onClose,
  user,
  initialCourse,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourse?.id || 'all'
  );
  const [activeMode, setActiveMode] = useState<'study_tips' | 'simplify' | 'qa'>(
    'study_tips'
  );
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  // Sync initialCourse prop when changed
  useEffect(() => {
    if (initialCourse) {
      setSelectedCourseId(initialCourse.id);
    }
  }, [initialCourse]);

  // Initial welcome message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `### 👋 สวัสดีครับคุณ ${user.thaiName.split(' ')[0]}!
ผมคือ **Nexus AI Tutor** ผู้ช่วยด้านการเรียนส่วนตัวของคุณ

ผมเชื่อมต่อกับข้อมูล 4 รายวิชาที่คุณกำลังศึกษาอยู่ พร้อมช่วยคุณ:
1. 💡 **วางแผนและแนะนำเทคนิคการเรียนเฉพาะบุคคล** (Study Tips)
2. 🧠 **ย่อยเนื้อหายากๆ ให้เข้าใจง่ายด้วยอุปมาอุปไมย** (Simplify Topics)
3. 💬 **ตอบคำถาม ไขข้อสงสัยการบ้าน และสร้างแบบทดสอบจำลอง** (Q&A & Quizzes)

เลือกวิชาที่ต้องการโฟกัส หรือกดหัวข้อตัวอย่างด้านล่างเพื่อเริ่มต้นได้ทันทีครับ!`,
      timestamp: 'เมื่อสักครู่',
      mode: 'study_tips',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const currentCourse =
    selectedCourseId === 'all'
      ? null
      : MOCK_COURSES.find((c) => c.id === selectedCourseId) || null;

  // Preset Quick Prompt Chips per Mode
  const quickPromptsByMode = {
    study_tips: [
      {
        label: '⚡ แผนส่ง Coding Project พรุ่งนี้',
        prompt: 'ขอแผนจัดการเวลาเร่งด่วนสำหรับส่ง Coding Project (CS30201) ในวันพรุ่งนี้ พร้อมเทคนิคแบ่งเวลาที่ได้ผลจริง',
      },
      {
        label: '📚 เทคนิคเก็บเนื้อหาคณิตศาสตร์',
        prompt: 'แนะนำวิธีการเริ่มต้นเรียน Advanced Mathematics (MA30101) ที่ progress ยัง 0% ให้เข้าใจพื้นฐานได้เร็วที่สุดใน 3 วัน',
      },
      {
        label: '🍅 จัดตาราง Pomodoro 4 วิชา',
        prompt: 'ช่วยวางแผนตารางอ่านหนังสือแบบ Pomodoro 50/10 สำหรับ 4 วิชาที่ลงทะเบียนในสัปดาห์นี้ให้หน่อยครับ',
      },
      {
        label: '🎯 เทคนิค Active Recall ก่อนสอบ',
        prompt: 'สอนวิธีฝึก Active Recall และ Spaced Repetition สำหรับวิชา Computer Science และ UI Design',
      },
    ],
    simplify: [
      {
        label: '🌳 Tree vs Graph Data Structure',
        prompt: 'ช่วยอธิบายความแตกต่างระหว่าง Tree และ Graph Data Structures ในวิชา CS30201 แบบเห็นภาพ เข้าใจง่าย มีตัวอย่างในชีวิตประจำวัน',
      },
      {
        label: '🎨 Gestalt Principles ใน UI/UX',
        prompt: 'อธิบายกฎของเกสตัลท์ (Gestalt Principles) ในการออกแบบ UI ให้เข้าใจง่ายๆ ว่าทำไมคนถึงมองเห็นภาพรวมก่อนรายละเอียด',
      },
      {
        label: '📐 Calculus: ลิมิตและอนุพันธ์',
        prompt: 'อธิบายแนวคิดเรื่อง Limit และ Derivative ในคณิตศาสตร์ให้เด็ก ม.ปลาย ฟังแบบเห็นภาพ ไม่เน้นท่องจำสูตร',
      },
      {
        label: '🎧 Spatial Audio & Foley Sound',
        prompt: 'Foley Sound และ Spatial Audio ในวิชา Multimedia ทำงานอย่างไร ทำไมถึงสร้างมิติเสียงในภาพยนตร์ได้',
      },
    ],
    qa: [
      {
        label: '❓ REST API Authentication คืออะไร',
        prompt: 'ช่วยอธิบายหลักการทำงานของ REST API Authentication และ JWT Token ในโปรเจกต์เว็บแบบทีละขั้นตอน',
      },
      {
        label: '📝 สุ่มแบบทดสอบ Quiz 3 ข้อ',
        prompt: 'สร้าง Quiz สั้นๆ 3 ข้อสำหรับวิชาที่เลือกพร้อมช้อยส์ เพื่อทดสอบความเข้าใจของฉัน',
      },
      {
        label: '🧩 วิเคราะห์ Error โค้ดที่พบบ่อย',
        prompt: 'มี Error อะไรบ้างที่เด็กเขียนโปรแกรมมักตกม้าตายใน Full-stack Web Development พร้อมวิธีแก้ไข',
      },
      {
        label: '✨ เคล็ดลับทำ Portfolio สาย AI/CS',
        prompt: 'แนะนำการเตรียม Portfolio ด้าน Computer Science & AI สำหรับนักเรียน ม.6 เพื่อยื่นรอบโควตา/พอร์ตฟอลิโอ',
      },
    ],
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: 'เมื่อสักครู่',
      mode: activeMode,
      courseCode: currentCourse?.code,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: query,
          mode: activeMode,
          courseContext: currentCourse
            ? {
                id: currentCourse.id,
                title: currentCourse.title,
                thaiTitle: currentCourse.thaiTitle,
                code: currentCourse.code,
                progress: currentCourse.progress,
                assignmentsDue: currentCourse.assignmentsDue,
                description: currentCourse.description,
              }
            : {
                title: 'All Registered Active Courses',
                totalCourses: MOCK_COURSES.length,
              },
          messages: messages.slice(-6),
        }),
      });

      const data = await response.json();
      const botMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.text || 'ไม่สามารถรับข้อมูลได้ โปรดลองอีกครั้ง',
        timestamp: 'เมื่อสักครู่',
        mode: activeMode,
        courseCode: currentCourse?.code,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Error fetching tutor response:', err);
      const fallbackMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `### 💡 คำแนะนำเบื้องต้นจากระบบ (${currentCourse?.thaiTitle || 'ภาพรวมการเรียน'})

- **การจัดลำดับเวลา:** แนะนำให้เน้นทำงานที่มีกำหนดส่งใกล้ที่สุดก่อน เช่น *Coding Project* (CS30201)
- **การทบทวนบทเรียน:** เริ่มต้นจากสรุปสาระสำคัญในชีท 15 นาที แล้วฝึกทำโจทย์ตัวอย่าง
- **หากติดขัด:** ลองพิมพ์ข้อความถามเจาะจงเฉพาะจุดที่สงสัยได้เลยครับ!`,
        timestamp: 'เมื่อสักครู่',
        mode: activeMode,
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `ล้างประวัติการสนทนาเรียบร้อยแล้วครับ! คุณสามารถถามคำถามใหม่ หรือเลือกวิชาที่ต้องการได้เลย`,
        timestamp: 'เมื่อสักครู่',
        mode: activeMode,
      },
    ]);
  };

  const handleCopyText = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('คัดลอกข้อความเรียบร้อยแล้ว');
  };

  const handleToggleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('เบราว์เซอร์ของคุณไม่รองรับการออกเสียงข้อความ');
      return;
    }

    if (isSpeaking === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner speech
    const cleanText = text
      .replace(/###|\*\*|__|```|`|\*|\$/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'th-TH';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    setIsSpeaking(msgId);
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel Container */}
      <div className="relative w-full max-w-[540px] bg-white h-full shadow-2xl flex flex-col z-10 border-l border-slate-200/80 animate-slideInRight duration-300">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-[#f9faff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1550d3] to-[#7857f8] text-white flex items-center justify-center shadow-md shadow-[#1550d3]/20 relative">
                <span className="material-symbols-outlined text-[24px] fill-1">
                  auto_awesome
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#20C997] rounded-full border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-bold text-[17px] text-[#121b2e]">Nexus AI Tutor</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1550d3]/10 text-[#1550d3] border border-[#1550d3]/20">
                    Active Courses
                  </span>
                </div>
                <p className="text-[12px] text-[#737686]">
                  Personalized Study Tips & Topic Simplifier
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="w-8 h-8 rounded-lg text-[#737686] hover:text-[#ba1a1a] hover:bg-red-50 flex items-center justify-center transition-colors text-[16px]"
                title="ล้างแชท (Clear Chat)"
                aria-label="Clear chat"
              >
                <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-100 text-[#434654] hover:bg-slate-200 flex items-center justify-center transition-colors active:scale-95"
                title="ปิดหน้าต่าง (Close)"
                aria-label="Close sidebar"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Active Course Context Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="course-select" className="text-[12px] font-bold text-[#434654] shrink-0 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#1550d3]">
                school
              </span>
              วิชาที่โฟกัส:
            </label>
            <select
              id="course-select"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="flex-1 text-[12px] font-semibold bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-[#121b2e] focus:outline-none focus:ring-2 focus:ring-[#1550d3]/20 focus:border-[#1550d3] cursor-pointer truncate shadow-xs"
            >
              <option value="all">🌐 ทุกรายวิชาที่ลงทะเบียน (4 Active Courses)</option>
              {MOCK_COURSES.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code}: {course.thaiTitle} ({course.progress}%)
                </option>
              ))}
            </select>
          </div>

          {/* Active Course Mini Banner */}
          {currentCourse && (
            <div
              className="px-3 py-2 rounded-xl text-white text-[12px] flex items-center justify-between shadow-xs transition-all"
              style={{ backgroundColor: currentCourse.color }}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="material-symbols-outlined text-[18px]">
                  {currentCourse.icon}
                </span>
                <span className="font-bold truncate">
                  {currentCourse.code} • {currentCourse.thaiTitle}
                </span>
              </div>
              <span className="bg-white/20 px-2 py-0.5 rounded-md text-[11px] font-semibold shrink-0">
                {currentCourse.progress}% Completed
              </span>
            </div>
          )}

          {/* 3 Main Mode Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-[#eef2ff] p-1 rounded-xl">
            <button
              onClick={() => setActiveMode('study_tips')}
              className={`py-1.5 px-2 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeMode === 'study_tips'
                  ? 'bg-white text-[#1550d3] shadow-xs'
                  : 'text-[#434654] hover:text-[#121b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">tips_and_updates</span>
              <span className="truncate">Study Tips</span>
            </button>

            <button
              onClick={() => setActiveMode('simplify')}
              className={`py-1.5 px-2 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeMode === 'simplify'
                  ? 'bg-white text-[#1550d3] shadow-xs'
                  : 'text-[#434654] hover:text-[#121b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">psychology</span>
              <span className="truncate">ย่อยเนื้อหา</span>
            </button>

            <button
              onClick={() => setActiveMode('qa')}
              className={`py-1.5 px-2 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeMode === 'qa'
                  ? 'bg-white text-[#1550d3] shadow-xs'
                  : 'text-[#434654] hover:text-[#121b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">chat</span>
              <span className="truncate">ถาม-ตอบ Q&A</span>
            </button>
          </div>
        </div>

        {/* Message Stream Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 bg-[#fbfbfe]">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[92%] ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {!isUser ? (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1550d3] to-[#7857f8] text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <span className="material-symbols-outlined text-[18px]">
                      auto_awesome
                    </span>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-[#1550d3] text-white flex items-center justify-center shrink-0 shadow-xs mt-1 text-[12px] font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-[14px] leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-[#1550d3] text-white rounded-tr-xs'
                        : 'bg-white text-[#121b2e] rounded-tl-xs border border-slate-200/70'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans break-words space-y-2">
                      {renderFormattedContent(msg.content, isUser)}
                    </div>
                  </div>

                  {/* Actions under AI messages */}
                  {!isUser && (
                    <div className="flex items-center gap-2 pl-1 text-[11px] text-[#737686]">
                      <span>{msg.timestamp}</span>
                      <span>•</span>
                      <button
                        onClick={() => handleCopyText(msg.content)}
                        className="hover:text-[#1550d3] flex items-center gap-0.5 cursor-pointer"
                        title="คัดลอกคำตอบ"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          content_copy
                        </span>
                        คัดลอก
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => handleToggleSpeak(msg.id, msg.content)}
                        className={`hover:text-[#1550d3] flex items-center gap-0.5 cursor-pointer ${
                          isSpeaking === msg.id ? 'text-[#1550d3] font-bold' : ''
                        }`}
                        title="อ่านออกเสียง"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {isSpeaking === msg.id ? 'stop_circle' : 'volume_up'}
                        </span>
                        {isSpeaking === msg.id ? 'หยุดพูด' : 'อ่านออกเสียง'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1550d3] to-[#7857f8] text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-[13px] text-[#1550d3] font-medium flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#1550d3] animate-ping" />
                Nexus AI Tutor กำลังวิเคราะห์และร่างคำตอบ...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-[#f4f6fc] border-t border-slate-200/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#737686] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#1550d3]">
                magic_button
              </span>
              คำถามแนะนำสำหรับโหมดนี้:
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {quickPromptsByMode[activeMode].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.prompt)}
                disabled={loading}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-white hover:bg-[#eef2ff] hover:text-[#1550d3] hover:border-[#1550d3]/30 border border-slate-200/80 text-[12px] font-medium text-[#434654] transition-all shadow-2xs active:scale-95 disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Input Field */}
        <div className="p-4 border-t border-slate-200/80 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  activeMode === 'study_tips'
                    ? 'ขอเคล็ดลับการอ่านหนังสือ, วางแผนเวลา...'
                    : activeMode === 'simplify'
                    ? 'พิมพ์เรื่องยากๆ ที่อยากให้สรุปเข้าใจง่าย...'
                    : 'ถามคำถาม, ให้ช่วยตรวจการบ้าน หรือขอแบบทดสอบ...'
                }
                disabled={loading}
                className="w-full h-12 pl-4 pr-10 rounded-xl bg-[#f8f9fe] border border-slate-200 text-[14px] text-[#121b2e] placeholder:text-[#737686] focus:outline-none focus:border-[#1550d3] focus:ring-2 focus:ring-[#1550d3]/20 transition-all disabled:opacity-60"
              />
              {inputQuery && (
                <button
                  type="button"
                  onClick={() => setInputQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim() || loading}
              className="w-12 h-12 rounded-xl bg-[#1550d3] hover:bg-[#1a53d6] disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center justify-center shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
              title="ส่งคำถาม"
            >
              <span className="material-symbols-outlined text-[20px] fill-1">send</span>
            </button>
          </form>
          <p className="text-[10px] text-center text-[#737686] mt-2">
            ขับเคลื่อนด้วย Google Gemini • ออกแบบเพื่อสนับสนุนการเรียนรู้ของนักเรียน School Nexus
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to format basic markdown-like structures cleanly
function renderFormattedContent(text: string, isUser: boolean) {
  if (isUser) return <span>{text}</span>;

  // Split by code blocks or lines
  const lines = text.split('\n');
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIdx) => {
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        elements.push(
          <div
            key={`code-${lineIdx}`}
            className="my-2 p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[12px] overflow-x-auto shadow-inner border border-slate-700"
          >
            <pre>{codeBuffer.join('\n')}</pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={lineIdx} className="font-bold text-[15px] text-[#1550d3] mt-2 mb-1">
          {line.replace('### ', '')}
        </h4>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h3 key={lineIdx} className="font-bold text-[16px] text-[#121b2e] mt-2 mb-1">
          {line.replace('## ', '')}
        </h3>
      );
    } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const cleanLine = line.trim().replace(/^[-*]\s+/, '');
      elements.push(
        <div key={lineIdx} className="flex items-start gap-2 ml-1 text-[13.5px]">
          <span className="text-[#1550d3] font-bold mt-0.5">•</span>
          <span>{parseBold(cleanLine)}</span>
        </div>
      );
    } else if (/^\d+\.\s/.test(line.trim())) {
      const match = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (match) {
        elements.push(
          <div key={lineIdx} className="flex items-start gap-2 ml-1 text-[13.5px]">
            <span className="font-bold text-[#1550d3] shrink-0">{match[1]}.</span>
            <span>{parseBold(match[2])}</span>
          </div>
        );
      }
    } else if (line.trim() === '') {
      elements.push(<div key={lineIdx} className="h-1" />);
    } else {
      elements.push(
        <p key={lineIdx} className="text-[13.5px] text-[#2c3345]">
          {parseBold(line)}
        </p>
      );
    }
  });

  return elements;
}

function parseBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-[#121b2e]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
