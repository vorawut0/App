export type UserRole = 'student' | 'teacher' | 'admin' | 'parent';

export interface UserProfile {
  id: string;
  name: string;
  thaiName: string;
  studentId: string;
  email: string;
  role: UserRole;
  avatar: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  grade: string;
  room: string;
  major: string;
  gpa: number;
  advisor: string;
  rfidCard: string;
}

export interface Course {
  id: string;
  title: string;
  thaiTitle: string;
  code: string;
  icon: string;
  color: string;
  progress: number;
  assignmentsDue: number;
  statusText: string;
  instructor: string;
  room: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'reading' | 'quiz' | 'lab';
}

export interface ScheduleItem {
  id: string;
  time: string;
  startTime: string;
  endTime: string;
  title: string;
  subjectCode: string;
  room: string;
  building: string;
  status: 'active' | 'upcoming' | 'completed';
  instructor: string;
}

export interface Facility {
  id: string;
  name: string;
  category: string;
  icon: string;
  status: 'open' | 'available' | 'busy' | 'closed';
  statusLabel: string;
  activeRooms?: number;
  occupancy?: number;
  capacity?: number;
  temperature?: string;
  airQuality?: string;
  wifiLoad?: string;
  description?: string;
}

export interface DigitalTwinNode {
  id: string;
  code: string;
  type: string;
  icon: string;
  status: 'optimal' | 'warning' | 'alert';
  statusText: string;
  power: string;
  temp: string;
  devices: number;
  lastPing: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  categoryColor: string;
  dueDate: string;
  dueRelative: string;
  status: 'in_progress' | 'submitted' | 'overdue' | 'to_submit';
  progress: number;
  maxScore: number;
  currentScore?: number | string;
  description: string;
  submittedAt?: string;
  attachmentsCount?: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  subject: string;
  xp: number;
  avatar?: string;
  avatarLetter?: string;
  color?: string;
  isCurrentUser?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  xpBonus: number;
  unlocked: boolean;
  progressText?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'assignment' | 'class' | 'grade' | 'system';
  read: boolean;
}
