import React, { useState } from 'react';
import { MOCK_COURSES, MOCK_LEADERBOARD, MOCK_ACHIEVEMENTS } from '../data/mockData';
import { Course, UserProfile } from '../types';

interface LearningViewProps {
  user: UserProfile;
  onOpenCourseModal: (course: Course) => void;
  onClaimAchievement?: (id: string) => void;
  onOpenAITutor?: (course?: Course) => void;
}

export const LearningView: React.FC<LearningViewProps> = ({
  user,
  onOpenCourseModal,
  onOpenAITutor,
}) => {
  const [leaderboardTab, setLeaderboardTab] = useState<'today' | 'week' | 'month'>('today');
  const [courses] = useState<Course[]>(MOCK_COURSES);

  const leaderboardList = MOCK_LEADERBOARD[leaderboardTab] || MOCK_LEADERBOARD.today;

  return (
    <div className="flex flex-col w-full relative pb-28 pt-24 px-4 max-w-[1280px] mx-auto min-h-screen">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-[26px] sm:text-[32px] font-bold text-[#121b2e] leading-tight">
              Learning Hub
            </h1>
            <p className="text-[#434654] text-[15px]">Pick up where you left off</p>
          </div>

          {onOpenAITutor && (
            <button
              onClick={() => onOpenAITutor()}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#1550d3] to-[#7857f8] text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer w-fit"
            >
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span>AI Tutor Study Assistant</span>
            </button>
          )}
        </div>

        {/* Section 1: My Courses */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] sm:text-[24px] font-bold text-[#121b2e]">
              My Courses
            </h2>
            <span className="text-[13px] font-medium text-[#737686]">
              4 รายวิชาที่ลงทะเบียน
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => {
              const isStarted = course.progress > 0;
              const hasDue = course.assignmentsDue > 0;

              return (
                <div
                  key={course.id}
                  className={`bg-[#e9edff]/60 hover:bg-[#e9edff]/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4 relative overflow-hidden group hover:shadow-md transition-all duration-300 border border-white/60 ${
                    course.progress === 0 ? 'opacity-85' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-sm"
                        style={{ backgroundColor: course.color }}
                      >
                        <span className="material-symbols-outlined text-[26px]">
                          {course.icon}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[16px] sm:text-[17px] text-[#121b2e] group-hover:text-[#1550d3] transition-colors">
                          {course.thaiTitle}
                        </h3>
                        <span
                          className={`text-[12px] font-semibold ${
                            hasDue
                              ? 'text-[#ba1a1a]'
                              : isStarted
                              ? 'text-[#00694d]'
                              : 'text-[#737686]'
                          }`}
                        >
                          {course.statusText}
                        </span>
                      </div>
                    </div>
                    <span
                      className="font-bold text-[16px]"
                      style={{ color: course.color }}
                    >
                      {course.progress}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-white/70 rounded-full overflow-hidden relative z-10 border border-slate-200/50">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${course.progress}%`,
                        backgroundColor: course.color,
                      }}
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2 relative z-10">
                    <button
                      onClick={() => onOpenCourseModal(course)}
                      className={`py-2.5 rounded-xl font-semibold text-[13px] transition-all flex items-center justify-center gap-1 shadow-sm active:scale-98 cursor-pointer ${
                        course.progress > 0
                          ? 'bg-[#1550d3] text-white hover:bg-[#1a53d6]'
                          : 'bg-white text-[#1550d3] border border-[#1550d3]/30 hover:bg-[#1550d3]/5'
                      }`}
                    >
                      <span>{course.progress > 0 ? 'Continue' : 'Start'}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {course.progress > 0 ? 'play_arrow' : 'arrow_forward'}
                      </span>
                    </button>

                    {onOpenAITutor && (
                      <button
                        onClick={() => onOpenAITutor(course)}
                        className="py-2.5 rounded-xl font-semibold text-[13px] bg-white hover:bg-[#eef2ff] text-[#1550d3] border border-[#1550d3]/30 transition-all flex items-center justify-center gap-1 shadow-xs active:scale-98 cursor-pointer"
                        title="ถาม AI Tutor สำหรับวิชานี้"
                      >
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        <span>AI Tutor</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Gamification (My Progress) */}
        <section>
          <h2 className="text-[20px] sm:text-[24px] font-bold text-[#121b2e] mb-3">
            My Progress
          </h2>
          <div className="bg-[#3c6bed] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            {/* Background Decorative Star SVG */}
            <svg
              className="absolute top-0 right-0 w-36 h-36 text-white/10 -mt-6 -mr-6 transform rotate-12 pointer-events-none"
              fill="currentColor"
              viewBox="0 0 100 100"
            >
              <path d="M50 0L61 39H100L68 61L80 100L50 76L20 100L32 61L0 39H39L50 0Z" />
            </svg>

            {/* Level & XP row */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white text-[#1550d3] flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[32px] fill-1">
                    military_tech
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white/80 uppercase tracking-widest">
                    Current Level
                  </div>
                  <div className="text-[24px] sm:text-[28px] font-bold leading-tight">
                    Level {user.level}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">
                  XP
                </div>
                <div className="text-[22px] sm:text-[26px] font-bold">
                  {user.xp.toLocaleString()}{' '}
                  <span className="text-white/60 text-[14px]">/ 3,000</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden relative z-10 mb-6">
              <div className="h-full bg-white rounded-full w-[82%] relative">
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>

            {/* Achievements row */}
            <h3 className="text-[14px] font-bold mb-3 relative z-10 uppercase tracking-wide text-white/90">
              Recent Achievements
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 relative z-10 no-scrollbar snap-x">
              {MOCK_ACHIEVEMENTS.map((ach) => (
                <div
                  key={ach.id}
                  className={`shrink-0 w-36 bg-white/15 rounded-2xl p-3.5 backdrop-blur-md border snap-center flex flex-col justify-between transition-transform hover:scale-105 ${
                    ach.unlocked
                      ? 'border-white/20'
                      : 'opacity-55 border-dashed border-white/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-white text-[24px] mb-2">
                    {ach.icon}
                  </span>
                  <div>
                    <div className="text-[13px] font-bold truncate">{ach.title}</div>
                    <div className="text-[11px] text-white/80 font-medium">
                      {ach.unlocked ? `+${ach.xpBonus} XP` : ach.progressText}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Leaderboard */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] sm:text-[24px] font-bold text-[#121b2e]">
              Leaderboard
            </h2>
            <div className="flex bg-[#e1e8ff] rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setLeaderboardTab('today')}
                className={`px-3 py-1 text-[12px] font-semibold rounded-lg transition-all ${
                  leaderboardTab === 'today'
                    ? 'bg-white shadow-xs text-[#1550d3]'
                    : 'text-[#434654] hover:text-[#121b2e]'
                }`}
              >
                วันนี้
              </button>
              <button
                onClick={() => setLeaderboardTab('week')}
                className={`px-3 py-1 text-[12px] font-semibold rounded-lg transition-all ${
                  leaderboardTab === 'week'
                    ? 'bg-white shadow-xs text-[#1550d3]'
                    : 'text-[#434654] hover:text-[#121b2e]'
                }`}
              >
                สัปดาห์
              </button>
              <button
                onClick={() => setLeaderboardTab('month')}
                className={`px-3 py-1 text-[12px] font-semibold rounded-lg transition-all ${
                  leaderboardTab === 'month'
                    ? 'bg-white shadow-xs text-[#1550d3]'
                    : 'text-[#434654] hover:text-[#121b2e]'
                }`}
              >
                เดือน
              </button>
            </div>
          </div>

          <div className="bg-[#e9edff]/50 rounded-2xl shadow-sm overflow-hidden border border-white/70">
            {leaderboardList.map((item) => {
              const isFirst = item.rank === 1;

              return (
                <div
                  key={item.name}
                  className={`flex items-center p-4 transition-colors ${
                    isFirst
                      ? 'bg-[#1550d3]/8 border-l-4 border-[#1550d3]'
                      : 'border-b border-slate-200/50 hover:bg-white/40'
                  }`}
                >
                  {/* Rank Number */}
                  <div
                    className={`w-8 font-bold text-[18px] ${
                      isFirst ? 'text-[#1550d3]' : 'text-[#434654]'
                    }`}
                  >
                    {item.rank}
                  </div>

                  {/* Avatar with optional star */}
                  <div className="relative mr-3.5 shrink-0">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-white"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: item.color || '#5f3add' }}
                      >
                        {item.avatarLetter || item.name.charAt(0)}
                      </div>
                    )}
                    {isFirst && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                        <span className="material-symbols-outlined text-[12px] text-white fill-1">
                          star
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name and Subject */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="font-bold text-[14px] text-[#121b2e] truncate flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.isCurrentUser && (
                        <span className="px-1.5 py-0.2 rounded bg-[#1550d3]/15 text-[#1550d3] text-[10px] font-semibold">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="text-[12px] text-[#434654] truncate">
                      {item.subject}
                    </div>
                  </div>

                  {/* XP score */}
                  <div
                    className={`font-bold text-[14px] sm:text-[15px] shrink-0 ${
                      isFirst ? 'text-[#1550d3]' : 'text-[#434654]'
                    }`}
                  >
                    {item.xp.toLocaleString()} XP
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
