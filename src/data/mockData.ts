import { UserProfile, Course, ScheduleItem, Facility, DigitalTwinNode, Assignment, LeaderboardUser, Achievement, NotificationItem } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6zHVLYDq-hhbktcsiFLZrcl3Pd-N5dcfdBfwvIV1RkVNAVuuVA8UzMOIyBVp-EOR5c2eFuIWire-XZQ96hiITrAMiiaDZUSZKXEm5BF_HQc6t0u9N7c6IfWEocA6V1Y6GCogPrVzUCwzc1QteR1EkVuFOYSgaHaz3XLnx9RsbiMvJTvQkjrmxL823p3vCLKHvR-d77dhPqsPMEiwZxp5fUYZxHSBmubD3V3DzM1NTyT6NZqSOSSFj',
  headerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYNhpiXKLEvTnySyGw-v2quUHHcsTakc-mK-_sCS_rE0MGwnVC8kzCfqLjvJ_bd2d_UM4OaCwl4vh9FrG751nnTAcnvA88WKBmDv0-aLrCAXCk05PD1J-CFY7yux9g274hmCP3erYL0-G91NsPOrT43RVGn3gJsVfPlT-mlpjYdi9JvK8oCFB0uCIV3A3pbLEoDvu6dvUJH3asrBwdQz2SpmT-xU35gF8pPC5M1ulrtpFozm3aZ40X',
  cardAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHn2hPdAlDeOSCtDidVqvDEB_GLUhO8aEFRM-SzQiqwsBQdGFiMAEe04nIcMxFmf8ZAd53VIjbOoAahqN6wcOkftLOCR0iaiKI_QCiY2OkVPDRCYsdrSOe4wwECvNQoNX3ASk1qrxHQqKigZNyLaJP0ek7Z5JRNOv0msERKt8LdFHNwR4GK0ts7Xw9p6P0nAibBRB-wktH1KefLkFPXX_7Ky_RBqO_gCbqCWbYRRYovh-RTeFsJGyR',
  leaderboardTop: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOREA-NP4LnIvIe8ID3_2M7-8Xjakln86Tv_50cvhLX1lFmKDrZMXG_5LGvuqVXp5UIZEDQfOQ6a4R7_jEsVgc2U8150NQPwz8Sfer5BPY3VZ4rPcfR3CphedST4lAhEolFZ2_YFhlq9ffv0yVaTR7bpqO_kADsJ76i582aBDxfX5xH5ScZJCjvzQia_nvSrSdFRi0tXEXIXc6d2BKpdlHayEL5SKreuRdacj-peoejrEvYHkKgR2p',
  campusBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABwX1EFKPkGVKS1DRRjM17sn1Yg2qRWhFVU8FwVYGHyPLwP-6_Bnl73Dx5VaU9Y293kdUKcM7gmE8gebuAZAyQZJEnoxUV0mSBGu0GwQbLgB5aATJ-TngcuqtDrFY96lDiTb4ietUJ6l4IX6g_ZTpOpTlrbCcPgfxKfi-Db83HJfsW_DnlhVSbc0AJ92WCzOlqOWBonBLCSDHIGpgZSojiHamyIXdZNvLTt-mdTSoVWEr1i6VmqVbe',
  chipNfc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAafOx_e_SRZFyIKrkUN6H_VSNz9ieHorIwKjzSGbYe5Ay9zN9Q7a2GF9MmIGPKQrQ4ja-GfZbLPyHCB23iGLpnMJlAiYOoQ0-JEwdumumZMYGF0bkcR53TRunUrFwcGmtkaZvIxd7QoWOTHyRw09oswyVsGeofyzo3nQmTpEfI1RZCBfPETjFSovNKFr_6ie6FjZclJGXHuMbIphqquBKzVo2YvHdSOcIkF6HXhp6mq4xrTtAJ1MKZ'
};

export const INITIAL_USER: UserProfile = {
  id: 'sn-usr-01',
  name: 'WORAWUT PETCHRAYA',
  thaiName: 'วรวุฒิ เพ็ชรระยา',
  studentId: '66040217',
  email: 'worawut.p@schoolnexus.ac.th',
  role: 'student',
  avatar: ASSETS.cardAvatar,
  level: 24,
  xp: 2840,
  nextLevelXp: 3000,
  streakDays: 7,
  grade: 'มัธยมศึกษาปีที่ 6',
  room: 'ห้อง 1 (Sci-Tech AI)',
  major: 'วิทยาศาสตร์-เทคโนโลยีคอมพิวเตอร์',
  gpa: 3.92,
  advisor: 'ดร. สมนึก เจริญศิลป์',
  rfidCard: 'NFC-SN-8849-2026'
};

export const MOCK_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch-1',
    time: '09:00',
    startTime: '09:00',
    endTime: '10:30',
    title: 'วิทยาการคำนวณ',
    subjectCode: 'CS30201',
    room: 'Room 402 • Lab',
    building: 'อาคารวิศวกรรมคอมพิวเตอร์',
    status: 'active',
    instructor: 'อ. กิตติพงษ์ เลิศพิริยะ'
  },
  {
    id: 'sch-2',
    time: '11:00',
    startTime: '11:00',
    endTime: '12:30',
    title: 'การออกแบบ',
    subjectCode: 'DS20104',
    room: 'Design Studio A',
    building: 'อาคารนวัตกรรมศิลปะ',
    status: 'upcoming',
    instructor: 'อ. พัชรา รัตนไพศาล'
  },
  {
    id: 'sch-3',
    time: '13:00',
    startTime: '13:00',
    endTime: '14:30',
    title: 'Multimedia',
    subjectCode: 'MM30102',
    room: 'Mac Lab 2',
    building: 'อาคารมีเดียดิจิทัล',
    status: 'upcoming',
    instructor: 'อ. นิติภัทร สุขสม'
  },
  {
    id: 'sch-4',
    time: '15:00',
    startTime: '15:00',
    endTime: '16:30',
    title: 'คณิตศาสตร์',
    subjectCode: 'MA30101',
    room: 'Room 105',
    building: 'อาคารเรียนรวม 1',
    status: 'upcoming',
    instructor: 'อ. วิภาวี ดำรงฤทธิ์'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'cs-1',
    title: 'Computer Science',
    thaiTitle: 'วิทยาการคำนวณ',
    code: 'CS30201',
    icon: 'computer',
    color: '#1550d3',
    progress: 75,
    assignmentsDue: 2,
    statusText: '2 assignments due',
    instructor: 'อ. กิตติพงษ์ เลิศพิริยะ',
    room: 'Lab 402',
    description: 'การพัฒนาอัลกอริทึม โครงสร้างข้อมูล และการประยุกต์ใช้ AI ในการแก้ปัญหาเชิงคำนวณระดับสูง',
    lessons: [
      { id: 'l-1', title: 'บทที่ 1: การเขียนโปรแกรมโครงสร้างเชิงวัตถุ (OOP)', duration: '45 นาที', completed: true, type: 'video' },
      { id: 'l-2', title: 'บทที่ 2: Tree and Graph Data Structures', duration: '60 นาที', completed: true, type: 'reading' },
      { id: 'l-3', title: 'บทที่ 3: Machine Learning Model Fundamentals', duration: '90 นาที', completed: true, type: 'lab' },
      { id: 'l-4', title: 'บทที่ 4: Full-Stack Integration & API Testing', duration: '40 นาที', completed: false, type: 'lab' },
      { id: 'l-5', title: 'แบบทดสอบท้ายบท: Comprehensive CS Quiz', duration: '30 นาที', completed: false, type: 'quiz' }
    ]
  },
  {
    id: 'ds-1',
    title: 'Design & UI/UX',
    thaiTitle: 'การออกแบบ',
    code: 'DS20104',
    icon: 'palette',
    color: '#5f3add',
    progress: 40,
    assignmentsDue: 1,
    statusText: '1 assignment due',
    instructor: 'อ. พัชรา รัตนไพศาล',
    room: 'Studio A',
    description: 'การออกแบบประสบการณ์ผู้ใช้ (UI/UX), การวางระบบ Design Token, Glassmorphism และ Micro-interactions',
    lessons: [
      { id: 'l-6', title: 'หลักการ Visual Hierarchy และ Gestalt Principles', duration: '35 นาที', completed: true, type: 'video' },
      { id: 'l-7', title: 'ระบบ Color Palette & Dark/Light Mode Tokens', duration: '50 นาที', completed: true, type: 'reading' },
      { id: 'l-8', title: 'Figma Component Systems & Auto Layout', duration: '75 นาที', completed: false, type: 'lab' },
      { id: 'l-9', title: 'การทำ Interactive Prototype และ Motion Animation', duration: '45 นาที', completed: false, type: 'video' }
    ]
  },
  {
    id: 'mm-1',
    title: 'Multimedia Production',
    thaiTitle: 'Multimedia',
    code: 'MM30102',
    icon: 'movie',
    color: '#00694d',
    progress: 90,
    assignmentsDue: 0,
    statusText: 'Up to date',
    instructor: 'อ. นิติภัทร สุขสม',
    room: 'Mac Lab 2',
    description: 'กระบวนการผลิตสื่อดิจิทัล วิดีโอสตรีมมิ่ง โมชันกราฟิก และการตัดต่อเสียงแบบมืออาชีพ',
    lessons: [
      { id: 'l-10', title: 'Storyboard & Camera Angles', duration: '40 นาที', completed: true, type: 'video' },
      { id: 'l-11', title: '4K Color Grading & Post Production', duration: '60 นาที', completed: true, type: 'lab' },
      { id: 'l-12', title: 'Spatial Audio Design & Mixing', duration: '50 นาที', completed: true, type: 'lab' },
      { id: 'l-13', title: 'Final Project Screening', duration: '90 นาที', completed: false, type: 'reading' }
    ]
  },
  {
    id: 'ma-1',
    title: 'Advanced Mathematics',
    thaiTitle: 'คณิตศาสตร์',
    code: 'MA30101',
    icon: 'calculate',
    color: '#737686',
    progress: 0,
    assignmentsDue: 1,
    statusText: 'Not started',
    instructor: 'อ. วิภาวี ดำรงฤทธิ์',
    room: 'Room 105',
    description: 'แคลคูลัสประยุกต์ เวกเตอร์ในสามมิติ เมทริกซ์ และความน่าจะเป็นสำหรับปัญญาประดิษฐ์',
    lessons: [
      { id: 'l-14', title: 'ลิมิตและความต่อเนื่องของฟังก์ชัน', duration: '55 นาที', completed: false, type: 'video' },
      { id: 'l-15', title: 'อนุพันธ์ของฟังก์ชันพีชคณิตและฟังก์ชันตรีโกณมิติ', duration: '60 นาที', completed: false, type: 'reading' },
      { id: 'l-16', title: 'การอินทิเกรตจำกัดเขตและการหาพื้นที่ใต้กราฟ', duration: '80 นาที', completed: false, type: 'lab' }
    ]
  }
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'as-1',
    title: 'Coding Project',
    subject: 'วิทยาการคำนวณ',
    subjectCode: 'CS30201',
    categoryColor: '#5f3add',
    dueDate: '2026-08-18T23:59:00',
    dueRelative: 'Due: Tomorrow',
    status: 'in_progress',
    progress: 45,
    maxScore: 100,
    currentScore: '- / 100',
    description: 'พัฒนาเว็บแอปพลิเคชัน Full-stack พร้อมระบบ Authentication และฐานข้อมูล เชื่อมต่อ REST API',
    attachmentsCount: 3
  },
  {
    id: 'as-2',
    title: 'UI Design',
    subject: 'การออกแบบ',
    subjectCode: 'DS20104',
    categoryColor: '#00694d',
    dueDate: '2026-08-22T17:00:00',
    dueRelative: 'Due: Friday',
    status: 'submitted',
    progress: 100,
    maxScore: 100,
    currentScore: 'รอตรวจ',
    description: 'ออกแบบหน้าจอ Mobile Application สำหรับ Smart School Glassmorphism พร้อมแบบจำลอง Figma prototype',
    submittedAt: '16 สิงหาคม 2026, 18:24 น.',
    attachmentsCount: 4
  },
  {
    id: 'as-3',
    title: 'Math Quiz',
    subject: 'คณิตศาสตร์',
    subjectCode: 'MA30101',
    categoryColor: '#ba1a1a',
    dueDate: '2026-08-16T16:00:00',
    dueRelative: 'Due: Yesterday',
    status: 'overdue',
    progress: 0,
    maxScore: 20,
    currentScore: '0 / 20',
    description: 'แบบทดสอบออนไลน์บทที่ 3 เรื่องเมทริกซ์และดีเทอร์มิแนนต์จำนวน 20 ข้อแบบจับเวลา',
    attachmentsCount: 1
  },
  {
    id: 'as-4',
    title: 'Multimedia Sound Mix',
    subject: 'Multimedia',
    subjectCode: 'MM30102',
    categoryColor: '#1550d3',
    dueDate: '2026-08-25T12:00:00',
    dueRelative: 'Due: Next Tuesday',
    status: 'to_submit',
    progress: 80,
    maxScore: 50,
    currentScore: '- / 50',
    description: 'บันทึกเสียงและมิกซ์ Foley Sound สำหรับภาพยนตร์สั้นความยาว 2 นาที',
    attachmentsCount: 2
  }
];

export const MOCK_FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Main Building',
    category: 'Administrative & General',
    icon: 'domain',
    status: 'open',
    statusLabel: 'Open',
    activeRooms: 16,
    occupancy: 420,
    capacity: 600,
    temperature: '24.2°C',
    airQuality: 'AQI 18 (Good)',
    wifiLoad: '48%',
    description: 'อาคารอำนวยการหลัก ศูนย์รับสมัคร สำนักวิชาการ และห้องโถงกิจกรรมกลาง'
  },
  {
    id: 'fac-2',
    name: 'Science Lab',
    category: 'Bio & Chem Wings',
    icon: 'science',
    status: 'available',
    statusLabel: 'Available',
    activeRooms: 6,
    occupancy: 88,
    capacity: 150,
    temperature: '22.0°C',
    airQuality: 'AQI 12 (Excellent)',
    wifiLoad: '35%',
    description: 'ห้องปฏิบัติการเคมี ชีววิทยา และฟิสิกส์ชั้นสูง พร้อมตู้ดูดควันและอุปกรณ์เซฟตี้ครบวงจร'
  },
  {
    id: 'fac-3',
    name: 'Computer Lab',
    category: 'CS & Engineering',
    icon: 'computer',
    status: 'available',
    statusLabel: 'Available',
    activeRooms: 8,
    occupancy: 124,
    capacity: 200,
    temperature: '21.5°C',
    airQuality: 'AQI 14 (Excellent)',
    wifiLoad: '82%',
    description: 'ศูนย์คอมพิวเตอร์และปัญญาประดิษฐ์ พร้อม High Performance GPU Cluster และ Apple Silicon Mac Studio'
  },
  {
    id: 'fac-4',
    name: 'Library',
    category: 'Study & Archives',
    icon: 'local_library',
    status: 'busy',
    statusLabel: 'Busy',
    activeRooms: 12,
    occupancy: 310,
    capacity: 350,
    temperature: '23.0°C',
    airQuality: 'AQI 20 (Good)',
    wifiLoad: '91%',
    description: 'ห้องสมุดดิจิทัล Co-working space, Pods ห้องประชุมส่วนตัว และคลังวิจัยออนไลน์'
  },
  {
    id: 'fac-5',
    name: 'Creative Studio',
    category: 'Arts & Design',
    icon: 'palette',
    status: 'open',
    statusLabel: 'Open',
    activeRooms: 4,
    occupancy: 64,
    capacity: 100,
    temperature: '23.8°C',
    airQuality: 'AQI 16 (Good)',
    wifiLoad: '54%',
    description: 'สตูดิโอถ่ายภาพ Greenscreen สตูดิโอบันทึกเสียง และห้องเวิร์กช็อปงานสถาปัตยกรรม'
  }
];

export const MOCK_DIGITAL_TWIN: DigitalTwinNode[] = [
  {
    id: 'node-1',
    code: 'LAB 01',
    type: 'Computer Science Lab',
    icon: 'science',
    status: 'optimal',
    statusText: 'Active',
    power: '1.4 kW (Normal)',
    temp: '22.1°C',
    devices: 42,
    lastPing: 'Just now'
  },
  {
    id: 'node-2',
    code: 'LAB 02',
    type: 'Hardware Engineering',
    icon: 'engineering',
    status: 'alert',
    statusText: 'Maint.',
    power: '0.2 kW (Offline)',
    temp: '26.4°C (HVAC Check)',
    devices: 6,
    lastPing: '2m ago'
  },
  {
    id: 'node-3',
    code: 'CLASS 01',
    type: 'Smart Lecture Room',
    icon: 'school',
    status: 'optimal',
    statusText: 'Active',
    power: '0.8 kW (Normal)',
    temp: '23.5°C',
    devices: 38,
    lastPing: 'Just now'
  },
  {
    id: 'node-4',
    code: 'IOT-HUB-04',
    type: 'Campus Environmental Sensor',
    icon: 'sensors',
    status: 'optimal',
    statusText: 'Active',
    power: '0.05 kW',
    temp: '24.0°C',
    devices: 18,
    lastPing: 'Just now'
  }
];

export const MOCK_LEADERBOARD: { [key: string]: LeaderboardUser[] } = {
  today: [
    { rank: 1, name: 'Worawut', subject: 'วิทยาการคำนวณ', xp: 2840, avatar: ASSETS.leaderboardTop, isCurrentUser: true },
    { rank: 2, name: 'Student A', subject: 'การออกแบบ', xp: 2750, avatarLetter: 'A', color: '#7857f8' },
    { rank: 3, name: 'Student B', subject: 'Multimedia', xp: 2600, avatarLetter: 'B', color: '#008562' },
    { rank: 4, name: 'Student C', subject: 'คณิตศาสตร์', xp: 2420, avatarLetter: 'C', color: '#d9e2fc' },
    { rank: 5, name: 'Student D', subject: 'วิทยาศาสตร์', xp: 2100, avatarLetter: 'D', color: '#d9e2fc' },
    { rank: 6, name: 'Student E', subject: 'ภาษาอังกฤษ', xp: 1950, avatarLetter: 'E', color: '#e1e8ff' }
  ],
  week: [
    { rank: 1, name: 'Worawut', subject: 'วิทยาการคำนวณ', xp: 14250, avatar: ASSETS.leaderboardTop, isCurrentUser: true },
    { rank: 2, name: 'Student A', subject: 'การออกแบบ', xp: 13900, avatarLetter: 'A', color: '#7857f8' },
    { rank: 3, name: 'Student F', subject: 'หุ่นยนต์ & AI', xp: 13100, avatarLetter: 'F', color: '#1550d3' },
    { rank: 4, name: 'Student B', subject: 'Multimedia', xp: 12800, avatarLetter: 'B', color: '#008562' },
    { rank: 5, name: 'Student C', subject: 'คณิตศาสตร์', xp: 11400, avatarLetter: 'C', color: '#d9e2fc' }
  ],
  month: [
    { rank: 1, name: 'Student F', subject: 'หุ่นยนต์ & AI', xp: 58200, avatarLetter: 'F', color: '#1550d3' },
    { rank: 2, name: 'Worawut', subject: 'วิทยาการคำนวณ', xp: 56400, avatar: ASSETS.leaderboardTop, isCurrentUser: true },
    { rank: 3, name: 'Student A', subject: 'การออกแบบ', xp: 54100, avatarLetter: 'A', color: '#7857f8' },
    { rank: 4, name: 'Student B', subject: 'Multimedia', xp: 49800, avatarLetter: 'B', color: '#008562' },
    { rank: 5, name: 'Student D', subject: 'วิทยาศาสตร์', xp: 45200, avatarLetter: 'D', color: '#d9e2fc' }
  ]
};

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach-1', title: '7 Day Streak', icon: 'local_fire_department', xpBonus: 50, unlocked: true },
  { id: 'ach-2', title: 'Fast Learner', icon: 'task_alt', xpBonus: 100, unlocked: true },
  { id: 'ach-3', title: 'Code Ninja', icon: 'lock', xpBonus: 160, unlocked: false, progressText: '160 XP to go' },
  { id: 'ach-4', title: 'Campus Pioneer', icon: 'military_tech', xpBonus: 200, unlocked: true },
  { id: 'ach-5', title: 'Top Scorer', icon: 'emoji_events', xpBonus: 300, unlocked: false, progressText: 'อันดับ 1 ในสัปดาห์' }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'คาบเรียนกำลังเริ่ม',
    message: 'วิทยาการคำนวณ (Lab 402) จะเริ่มในอีก 15 นาที',
    time: '10 นาทีที่แล้ว',
    type: 'class',
    read: false
  },
  {
    id: 'n-2',
    title: 'การบ้านใกล้ครบกำหนด',
    message: 'Coding Project กำหนดส่งพรุ่งนี้ เวลา 23:59 น.',
    time: '1 ชั่วโมงที่แล้ว',
    type: 'assignment',
    read: false
  },
  {
    id: 'n-3',
    title: 'ผลคะแนนสอบประกาศแล้ว',
    message: 'คะแนนสอบกลางภาควิชาการออกแบบ ได้รับ 94/100 (เกรด 4)',
    time: 'เมื่อวานนี้',
    type: 'grade',
    read: true
  },
  {
    id: 'n-4',
    title: 'ประกาศจากระบบดิจิทัลแคมปัส',
    message: 'ห้องคอมพิวเตอร์ Lab 02 ปิดปรับปรุงระบบเครือข่ายความเร็วสูง',
    time: '2 วันที่แล้ว',
    type: 'system',
    read: true
  }
];

export const DEMO_PRESET_USERS: { [key: string]: UserProfile } = {
  student: {
    id: 'sn-std-01',
    name: 'WORAWUT PETCHRAYA',
    thaiName: 'วรวุฒิ เพ็ชรระยา',
    studentId: '66040217',
    email: 'worawut.p@schoolnexus.ac.th',
    role: 'student',
    avatar: ASSETS.cardAvatar,
    level: 24,
    xp: 2840,
    nextLevelXp: 3000,
    streakDays: 7,
    grade: 'มัธยมศึกษาปีที่ 6/1',
    room: 'ห้อง 601',
    major: 'วิทยาศาสตร์-คอมพิวเตอร์',
    gpa: 3.92,
    advisor: 'ดร. สมนึก เจริญศิลป์',
    rfidCard: 'NFC-SN-8849-2026'
  },
  teacher: {
    id: 'sn-tch-01',
    name: 'KITTIPONG LERTPIRIYA',
    thaiName: 'อาจารย์ กิตติพงษ์ เลิศพิริยะ',
    studentId: 'T-55104',
    email: 'kittipong.l@schoolnexus.ac.th',
    role: 'teacher',
    avatar: ASSETS.headerAvatar,
    level: 50,
    xp: 12500,
    nextLevelXp: 15000,
    streakDays: 45,
    grade: 'อาจารย์ประจำภาควิชา',
    room: 'ห้องพักครู 401',
    major: 'Computer Science Department Head',
    gpa: 4.00,
    advisor: 'ผู้อำนวยการโรงเรียน',
    rfidCard: 'NFC-TCH-0021-2026'
  },
  admin: {
    id: 'sn-adm-01',
    name: 'ADMINISTRATOR SYSTEM',
    thaiName: 'ผู้ดูแลระบบไอทีและแคมปัส',
    studentId: 'ADM-001',
    email: 'admin.it@schoolnexus.ac.th',
    role: 'admin',
    avatar: ASSETS.headerAvatar,
    level: 99,
    xp: 99999,
    nextLevelXp: 100000,
    streakDays: 365,
    grade: 'IT & Facilities Operations',
    room: 'Server Room Data Center',
    major: 'System Architecture & IoT Campus',
    gpa: 4.00,
    advisor: 'School Board',
    rfidCard: 'NFC-ROOT-0001'
  },
  parent: {
    id: 'sn-par-01',
    name: 'PARENT PETCHRAYA',
    thaiName: 'ผู้ปกครอง นายสมบัติ เพ็ชรระยา',
    studentId: 'P-66040217',
    email: 'sombat.p@gmail.com',
    role: 'parent',
    avatar: ASSETS.cardAvatar,
    level: 12,
    xp: 1450,
    nextLevelXp: 2000,
    streakDays: 14,
    grade: 'ผู้ปกครองของ วรวุฒิ เพ็ชรระยา (ม.6/1)',
    room: 'นักเรียนในความดูแล: 1 คน',
    major: 'Parent Association',
    gpa: 3.92,
    advisor: 'ดร. สมนึก เจริญศิลป์',
    rfidCard: 'NFC-PAR-3301'
  }
};
