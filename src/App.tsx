import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './components/LoginScreen';
import { DashboardView } from './components/DashboardView';
import { LearningView } from './components/LearningView';
import { CampusView } from './components/CampusView';
import { AssignmentsView } from './components/AssignmentsView';
import { ProfileView } from './components/ProfileView';
import { AITutorSidebar } from './components/AITutorSidebar';

// Modals
import { CourseModal } from './components/modals/CourseModal';
import { AssignmentModal } from './components/modals/AssignmentModal';
import { CreateTaskModal } from './components/modals/CreateTaskModal';
import { FacilityModal } from './components/modals/FacilityModal';
import { CampusMapModal } from './components/modals/CampusMapModal';
import { NodeModal } from './components/modals/NodeModal';
import { ScheduleModal } from './components/modals/ScheduleModal';
import { GpaModal } from './components/modals/GpaModal';
import { CalendarModal } from './components/modals/CalendarModal';
import { SearchModal } from './components/modals/SearchModal';
import { NotificationDrawer } from './components/modals/NotificationDrawer';
import { QRScannerModal } from './components/modals/QRScannerModal';
import { DigitalIdModal } from './components/modals/DigitalIdModal';
import { CampusPulseModal, CampusPulseTab } from './components/modals/CampusPulseModal';

// Mock Data
import { INITIAL_USER, MOCK_NOTIFICATIONS, DEMO_PRESET_USERS } from './data/mockData';
import { UserProfile, UserRole, Course, Assignment, Facility, DigitalTwinNode, ScheduleItem, NotificationItem } from './types';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Modals state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedNode, setSelectedNode] = useState<DigitalTwinNode | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(null);

  const [showCreateTaskModal, setShowCreateTaskModal] = useState<boolean>(false);
  const [showCampusMapModal, setShowCampusMapModal] = useState<boolean>(false);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [showGpaModal, setShowGpaModal] = useState<boolean>(false);
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState<boolean>(false);
  const [showQrScannerModal, setShowQrScannerModal] = useState<boolean>(false);
  const [showDigitalIdModal, setShowDigitalIdModal] = useState<boolean>(false);
  const [showCampusPulseModal, setShowCampusPulseModal] = useState<boolean>(false);
  const [campusPulseInitialTab, setCampusPulseInitialTab] = useState<CampusPulseTab>('overview');

  // AI Tutor Sidebar state
  const [showAITutorSidebar, setShowAITutorSidebar] = useState<boolean>(false);
  const [aiTutorFocusCourse, setAiTutorFocusCourse] = useState<Course | null>(null);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const handleOpenAITutor = (course?: Course | null) => {
    setAiTutorFocusCourse(course || null);
    setShowAITutorSidebar(true);
  };

  const handleOpenCampusPulse = (tab: CampusPulseTab = 'overview') => {
    setCampusPulseInitialTab(tab);
    setShowCampusPulseModal(true);
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setCurrentTab('dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleSwitchRole = (role: UserRole) => {
    const updatedUser = DEMO_PRESET_USERS[role] || DEMO_PRESET_USERS.student;
    setUser(updatedUser);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleUpdateCourseProgress = (courseId: string, newProgress: number) => {
    // Progress updated in modal
  };

  const handleSubmitAssignmentWork = (assignmentId: string, progress: number, notes: string) => {
    // Add success notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'ส่งงานเรียบร้อยแล้ว',
      message: `คุณได้ส่งงานสำเร็จแล้ว ระบบจะแจ้งเตือนเมื่ออาจารย์ตรวจเสร็จ`,
      time: 'เมื่อสักครู่',
      type: 'assignment',
      read: false,
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleCreateTask = (newTask: Assignment) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'สร้างภาระงานใหม่',
      message: `เพิ่มงาน "${newTask.title}" ในระบบเรียบร้อยแล้ว`,
      time: 'เมื่อสักครู่',
      type: 'assignment',
      read: false,
    };
    setNotifications([newNotif, ...notifications]);
    setCurrentTab('assignments');
  };

  // If user is not logged in, render the Login Screen
  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#121b2e] flex flex-col font-['Noto_Sans_Thai',sans-serif] selection:bg-[#1550d3] selection:text-white">
      {/* Fixed Top Header */}
      <Header
        currentTab={currentTab}
        user={user}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenNotifications={() => setShowNotificationDrawer(true)}
        onOpenProfile={() => setCurrentTab('profile')}
        onOpenAITutor={() => handleOpenAITutor(null)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full flex flex-col">
        {currentTab === 'dashboard' && (
          <DashboardView
            user={user}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenScheduleModal={(item) => {
              setSelectedSchedule(item || null);
              setShowScheduleModal(true);
            }}
            onOpenIdCardModal={() => setShowDigitalIdModal(true)}
            onOpenQrScanner={() => setShowQrScannerModal(true)}
            onOpenGpaModal={() => setShowGpaModal(true)}
            onOpenCalendarModal={() => setShowCalendarModal(true)}
            onOpenAITutor={() => handleOpenAITutor(null)}
            onOpenCampusPulse={(tab) => handleOpenCampusPulse(tab)}
          />
        )}

        {currentTab === 'campus' && (
          <CampusView
            onOpenFacilityModal={(fac) => setSelectedFacility(fac)}
            onOpenNodeModal={(node) => setSelectedNode(node)}
            onOpenCampusMap={() => setShowCampusMapModal(true)}
          />
        )}

        {currentTab === 'learning' && (
          <LearningView
            user={user}
            onOpenCourseModal={(course) => setSelectedCourse(course)}
            onOpenAITutor={(course) => handleOpenAITutor(course)}
          />
        )}

        {currentTab === 'assignments' && (
          <AssignmentsView
            onOpenAssignmentModal={(as) => setSelectedAssignment(as)}
            onOpenCreateTaskModal={() => setShowCreateTaskModal(true)}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            user={user}
            onSwitchRole={handleSwitchRole}
            onSignOut={handleSignOut}
            onOpenQrScanner={() => setShowQrScannerModal(true)}
            onOpenGpaModal={() => setShowGpaModal(true)}
          />
        )}
      </main>

      {/* Floating AI Tutor FAB Button (Bottom Right) */}
      <button
        onClick={() => handleOpenAITutor(null)}
        className="fixed right-4 bottom-24 sm:bottom-28 z-40 px-4 py-3 bg-gradient-to-r from-[#1550d3] to-[#7857f8] text-white rounded-full shadow-lg shadow-[#1550d3]/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold text-[13px] border border-white/30 cursor-pointer group"
        title="เปิด AI Tutor ผู้ช่วยการเรียนส่วนตัว"
        aria-label="Open AI Tutor"
      >
        <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
          auto_awesome
        </span>
        <span className="hidden sm:inline">AI Tutor</span>
        <span className="w-2 h-2 rounded-full bg-[#20C997] animate-pulse" />
      </button>

      {/* Fixed Floating Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        pendingTasksCount={1}
      />

      {/* AI Tutor Sidebar Panel */}
      <AITutorSidebar
        isOpen={showAITutorSidebar}
        onClose={() => setShowAITutorSidebar(false)}
        user={user}
        initialCourse={aiTutorFocusCourse}
      />

      {/* Interactive Modals */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onUpdateProgress={handleUpdateCourseProgress}
        onOpenAITutor={(course) => handleOpenAITutor(course)}
      />

      <AssignmentModal
        assignment={selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        onSubmitWork={handleSubmitAssignmentWork}
      />

      <CreateTaskModal
        isOpen={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
        onCreateTask={handleCreateTask}
      />

      <FacilityModal
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
      />

      <CampusMapModal
        isOpen={showCampusMapModal}
        onClose={() => setShowCampusMapModal(false)}
        onSelectFacility={(fac) => setSelectedFacility(fac)}
      />

      <NodeModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />

      <ScheduleModal
        isOpen={showScheduleModal}
        selectedItem={selectedSchedule}
        onClose={() => {
          setShowScheduleModal(false);
          setSelectedSchedule(null);
        }}
      />

      <GpaModal
        user={user}
        isOpen={showGpaModal}
        onClose={() => setShowGpaModal(false)}
      />

      <CalendarModal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      />

      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onNavigate={(tab, item) => {
          setCurrentTab(tab);
          if (tab === 'learning' && item) setSelectedCourse(item);
          if (tab === 'assignments' && item) setSelectedAssignment(item);
          if (tab === 'campus' && item) setSelectedFacility(item);
        }}
      />

      <NotificationDrawer
        isOpen={showNotificationDrawer}
        onClose={() => setShowNotificationDrawer(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onClearNotifications={handleClearNotifications}
      />

      <QRScannerModal
        isOpen={showQrScannerModal}
        onClose={() => setShowQrScannerModal(false)}
      />

      <DigitalIdModal
        user={user}
        isOpen={showDigitalIdModal}
        onClose={() => setShowDigitalIdModal(false)}
        onOpenScanner={() => setShowQrScannerModal(true)}
      />

      <CampusPulseModal
        isOpen={showCampusPulseModal}
        initialTab={campusPulseInitialTab}
        onClose={() => setShowCampusPulseModal(false)}
        totalStudents={1248}
      />
    </div>
  );
}
