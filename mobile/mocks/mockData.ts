/**
 * SmartAttend — Central Mock Data
 * ⚠️  DEV ONLY — Replace with real REST API in Phase 3
 *
 * All mock data is centralized here and organized by entity type.
 * UI components should import from this file instead of hard-coding values.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type AttendanceStatus = 'present' | 'absent' | 'unmarked' | 'excused';
export type SessionStatus = 'completed' | 'expired' | 'cancelled' | 'ongoing' | 'upcoming';
export type SubjectStatus = 'safe' | 'warning' | 'critical';

// ─── Students ─────────────────────────────────────────────────────────────────

export const MOCK_STUDENT = {
  id: 'stu-001',
  usn: '01CS123',
  name: 'Rohit Kumar',
  department: 'Computer Science & Engineering',
  departmentShort: 'CSE',
  year: '3rd Year',
  semester: 'Semester 5',
  section: 'A',
  email: 'rohit.kumar@university.edu',
  phone: '+91 9876543210',
  device: {
    registered: true,
    deviceId: 'DEV-A1B2C3',
    registeredOn: '01 Jan 2024',
    model: 'Samsung Galaxy S21',
  },
};

export const MOCK_STUDENTS = [
  {
    id: 'stu-001', usn: '01CS123', name: 'Rohit Kumar', department: 'CSE',
    year: '3rd Year', semester: '5', section: 'A', email: 'rohit.kumar@university.edu',
    phone: '+91 9876543210', status: 'active', attendance: 88, attendancePercentage: 88,
    deviceRegistered: true, deviceBound: true, boundDeviceName: 'Samsung Galaxy S21',
  },
  {
    id: 'stu-002', usn: '01CS124', name: 'Priya Sharma', department: 'CSE',
    year: '3rd Year', semester: '5', section: 'A', email: 'priya.sharma@university.edu',
    phone: '+91 9876543211', status: 'active', attendance: 92, attendancePercentage: 92,
    deviceRegistered: true, deviceBound: true, boundDeviceName: 'iPhone 13 Pro',
  },
  {
    id: 'stu-003', usn: '01CS125', name: 'Amit Patel', department: 'CSE',
    year: '3rd Year', semester: '5', section: 'A', email: 'amit.patel@university.edu',
    phone: '+91 9876543212', status: 'active', attendance: 65, attendancePercentage: 65,
    deviceRegistered: false, deviceBound: false, boundDeviceName: '',
  },
  {
    id: 'stu-004', usn: '01CS126', name: 'Neha Joshi', department: 'CSE',
    year: '3rd Year', semester: '5', section: 'B', email: 'neha.joshi@university.edu',
    phone: '+91 9876543213', status: 'active', attendance: 78, attendancePercentage: 78,
    deviceRegistered: true, deviceBound: true, boundDeviceName: 'OnePlus 9',
  },
  {
    id: 'stu-005', usn: '01CS127', name: 'Vikram Singh', department: 'CSE',
    year: '3rd Year', semester: '5', section: 'B', email: 'vikram.singh@university.edu',
    phone: '+91 9876543214', status: 'inactive', attendance: 45, attendancePercentage: 45,
    deviceRegistered: true, deviceBound: true, boundDeviceName: 'Pixel 6',
  },
  {
    id: 'stu-006', usn: '01EC101', name: 'Sunita Reddy', department: 'ECE',
    year: '2nd Year', semester: '3', section: 'A', email: 'sunita.reddy@university.edu',
    phone: '+91 9876543215', status: 'active', attendance: 95, attendancePercentage: 95,
    deviceRegistered: true, deviceBound: true, boundDeviceName: 'iPhone 14',
  },
];

// ─── Faculty ──────────────────────────────────────────────────────────────────

export const MOCK_FACULTY = {
  id: 'fac-001',
  facultyId: 'FAC123',
  name: 'Prof. Rohit Sharma',
  department: 'Computer Science & Engineering',
  departmentShort: 'CSE',
  designation: 'Associate Professor',
  email: 'rohit.sharma@university.edu',
  phone: '+91 9876540001',
  subjects: ['Data Structures', 'Algorithms', 'DBMS'],
};

export const MOCK_FACULTY_LIST = [
  {
    id: 'fac-001', facultyId: 'FAC123', name: 'Prof. Rohit Sharma',
    department: 'CSE', designation: 'Associate Professor',
    email: 'rohit.sharma@university.edu', phone: '+91 9876540001',
    subjects: ['Data Structures', 'Algorithms'], status: 'active', classes: 4,
  },
  {
    id: 'fac-002', facultyId: 'FAC124', name: 'Dr. Sunita Verma',
    department: 'CSE', designation: 'Professor',
    email: 'sunita.verma@university.edu', phone: '+91 9876540002',
    subjects: ['Digital Logic', 'Computer Architecture'], status: 'active', classes: 3,
  },
  {
    id: 'fac-003', facultyId: 'FAC125', name: 'Dr. M. Campbell',
    department: 'PHY', designation: 'Assistant Professor',
    email: 'm.campbell@university.edu', phone: '+91 9876540003',
    subjects: ['Physics', 'Quantum Mechanics'], status: 'active', classes: 2,
  },
  {
    id: 'fac-004', facultyId: 'FAC126', name: 'Prof. A. Stewart',
    department: 'ENG', designation: 'Lecturer',
    email: 'a.stewart@university.edu', phone: '+91 9876540004',
    subjects: ['English Communication'], status: 'active', classes: 5,
  },
];

// ─── Admin ────────────────────────────────────────────────────────────────────

export const MOCK_ADMIN = {
  id: 'adm-001',
  adminId: 'ADMIN001',
  name: 'System Admin',
  role: 'Super Admin',
  email: 'admin@smartattend.edu',
  phone: '+91 9999000001',
};

// ─── Subjects ─────────────────────────────────────────────────────────────────

export const MOCK_SUBJECTS = [
  {
    id: 'sub-001', code: 'CS501', name: 'Data Structures',
    faculty: 'Prof. Rohit Sharma', credits: 4,
    totalClasses: 50, attended: 41, percentage: 82,
    status: 'safe' as SubjectStatus,
    icon: 'account_tree',
    description: 'Study of fundamental data structures including arrays, linked lists, trees, graphs and their algorithms.',
  },
  {
    id: 'sub-002', code: 'MA501', name: 'Mathematics',
    faculty: 'Prof. R. Narayanan', credits: 4,
    totalClasses: 49, attended: 37, percentage: 75,
    status: 'safe' as SubjectStatus,
    icon: 'functions',
    description: 'Advanced mathematics covering calculus, linear algebra, and discrete mathematics.',
  },
  {
    id: 'sub-003', code: 'CS502', name: 'Digital Logic',
    faculty: 'Dr. Sunita V.', credits: 3,
    totalClasses: 47, attended: 32, percentage: 68,
    status: 'warning' as SubjectStatus,
    icon: 'memory',
    description: 'Digital circuits, boolean algebra, combinational and sequential logic design.',
    warningMessage: 'Attendance critical. Attend next 4 classes to reach 75%.',
  },
  {
    id: 'sub-004', code: 'PH501', name: 'Physics',
    faculty: 'Dr. M. Campbell', credits: 3,
    totalClasses: 45, attended: 36, percentage: 80,
    status: 'safe' as SubjectStatus,
    icon: 'science',
    description: 'Fundamentals of physics including mechanics, optics, and electromagnetism.',
  },
  {
    id: 'sub-005', code: 'EN501', name: 'English',
    faculty: 'Prof. A. Stewart', credits: 2,
    totalClasses: 41, attended: 32, percentage: 78,
    status: 'safe' as SubjectStatus,
    icon: 'menu_book',
    description: 'English communication skills, technical writing, and professional communication.',
  },
];

// ─── Timetable ────────────────────────────────────────────────────────────────

export const MOCK_TIMETABLE: Record<string, Array<{
  id: string; subject: string; room: string; faculty: string;
  startTime: string; endTime: string; section: string;
  status: 'past' | 'ongoing' | 'upcoming' | 'next';
}>> = {
  Mon: [
    { id: 't1', subject: 'Mathematics', room: 'Room 205', faculty: 'Prof. R. Narayanan', startTime: '08:00 AM', endTime: '09:00 AM', section: 'CSE 3A', status: 'past' },
    { id: 't2', subject: 'Data Structures', room: 'Room 201', faculty: 'Prof. Rohit Sharma', startTime: '10:00 AM', endTime: '11:00 AM', section: 'CSE 3A', status: 'ongoing' },
    { id: 't3', subject: 'Digital Logic', room: 'Room 203', faculty: 'Dr. Sunita V.', startTime: '11:15 AM', endTime: '12:15 PM', section: 'CSE 3A', status: 'upcoming' },
    { id: 't4', subject: 'Physics', room: 'Room 204', faculty: 'Dr. M. Campbell', startTime: '02:00 PM', endTime: '03:00 PM', section: 'CSE 3A', status: 'upcoming' },
    { id: 't5', subject: 'English', room: 'Room 101', faculty: 'Prof. A. Stewart', startTime: '03:15 PM', endTime: '04:15 PM', section: 'CSE 3A', status: 'upcoming' },
  ],
  Tue: [
    { id: 't6', subject: 'Data Structures', room: 'Room 201', faculty: 'Prof. Rohit Sharma', startTime: '09:00 AM', endTime: '10:00 AM', section: 'CSE 3A', status: 'past' },
    { id: 't7', subject: 'Physics', room: 'Room 204', faculty: 'Dr. M. Campbell', startTime: '11:00 AM', endTime: '12:00 PM', section: 'CSE 3A', status: 'upcoming' },
    { id: 't8', subject: 'English', room: 'Room 101', faculty: 'Prof. A. Stewart', startTime: '02:00 PM', endTime: '03:00 PM', section: 'CSE 3A', status: 'upcoming' },
  ],
  Wed: [
    { id: 't9', subject: 'Mathematics', room: 'Room 205', faculty: 'Prof. R. Narayanan', startTime: '08:00 AM', endTime: '09:00 AM', section: 'CSE 3A', status: 'past' },
    { id: 't10', subject: 'Digital Logic', room: 'Room 203', faculty: 'Dr. Sunita V.', startTime: '10:00 AM', endTime: '11:00 AM', section: 'CSE 3A', status: 'upcoming' },
    { id: 't11', subject: 'Data Structures Lab', room: 'Lab 301', faculty: 'Prof. Rohit Sharma', startTime: '02:00 PM', endTime: '04:00 PM', section: 'CSE 3A', status: 'upcoming' },
  ],
  Thu: [
    { id: 't12', subject: 'Physics', room: 'Room 204', faculty: 'Dr. M. Campbell', startTime: '09:00 AM', endTime: '10:00 AM', section: 'CSE 3A', status: 'upcoming' },
    { id: 't13', subject: 'Mathematics', room: 'Room 205', faculty: 'Prof. R. Narayanan', startTime: '11:00 AM', endTime: '12:00 PM', section: 'CSE 3A', status: 'upcoming' },
  ],
  Fri: [
    { id: 't14', subject: 'English', room: 'Room 101', faculty: 'Prof. A. Stewart', startTime: '09:00 AM', endTime: '10:00 AM', section: 'CSE 3A', status: 'upcoming' },
    { id: 't15', subject: 'Digital Logic', room: 'Room 203', faculty: 'Dr. Sunita V.', startTime: '10:15 AM', endTime: '11:15 AM', section: 'CSE 3A', status: 'upcoming' },
    { id: 't16', subject: 'Data Structures', room: 'Room 201', faculty: 'Prof. Rohit Sharma', startTime: '02:00 PM', endTime: '03:00 PM', section: 'CSE 3A', status: 'upcoming' },
  ],
};

// ─── Faculty Timetable ────────────────────────────────────────────────────────

export const MOCK_FACULTY_TIMETABLE: Record<string, Array<{
  id: string; subject: string; room: string; section: string;
  startTime: string; endTime: string; studentsEnrolled: number;
  status: 'past' | 'ongoing' | 'upcoming' | 'next';
}>> = {
  Mon: [
    { id: 'ft1', subject: 'Data Structures', room: 'Room 201', section: 'CSE 3A', startTime: '10:00 AM', endTime: '11:00 AM', studentsEnrolled: 68, status: 'ongoing' },
    { id: 'ft2', subject: 'Algorithms', room: 'Room 202', section: 'CSE 3B', startTime: '12:00 PM', endTime: '01:00 PM', studentsEnrolled: 65, status: 'upcoming' },
    { id: 'ft3', subject: 'Data Structures Lab', room: 'Lab 301', section: 'CSE 3A', startTime: '02:00 PM', endTime: '04:00 PM', studentsEnrolled: 30, status: 'upcoming' },
  ],
  Tue: [
    { id: 'ft4', subject: 'Data Structures', room: 'Room 201', section: 'CSE 3B', startTime: '09:00 AM', endTime: '10:00 AM', studentsEnrolled: 65, status: 'upcoming' },
    { id: 'ft5', subject: 'Algorithms', room: 'Room 202', section: 'CSE 3A', startTime: '11:00 AM', endTime: '12:00 PM', studentsEnrolled: 68, status: 'upcoming' },
  ],
  Wed: [
    { id: 'ft6', subject: 'Data Structures Lab', room: 'Lab 302', section: 'CSE 3B', startTime: '02:00 PM', endTime: '04:00 PM', studentsEnrolled: 32, status: 'upcoming' },
  ],
  Thu: [
    { id: 'ft7', subject: 'Data Structures', room: 'Room 201', section: 'CSE 3A', startTime: '10:00 AM', endTime: '11:00 AM', studentsEnrolled: 68, status: 'upcoming' },
    { id: 'ft8', subject: 'Algorithms', room: 'Room 202', section: 'CSE 3B', startTime: '02:00 PM', endTime: '03:00 PM', studentsEnrolled: 65, status: 'upcoming' },
  ],
  Fri: [
    { id: 'ft9', subject: 'Data Structures', room: 'Room 201', section: 'CSE 3B', startTime: '09:00 AM', endTime: '10:00 AM', studentsEnrolled: 65, status: 'upcoming' },
    { id: 'ft10', subject: 'Algorithms', room: 'Room 202', section: 'CSE 3A', startTime: '11:00 AM', endTime: '12:00 PM', studentsEnrolled: 68, status: 'upcoming' },
  ],
};

// ─── Attendance Sessions ───────────────────────────────────────────────────────

export const MOCK_ATTENDANCE_SESSIONS = [
  {
    id: 'ses-001',
    subject: 'Data Structures', subjectCode: 'CS501',
    section: 'CSE 3A', room: 'Room 201',
    date: '20 May 2024', startTime: '10:00 AM', endTime: '11:00 AM',
    status: 'completed' as SessionStatus,
    present: 61, absent: 7, unmarked: 0, total: 68,
    attendanceRate: 89.7,
    faculty: 'Prof. Rohit Sharma',
    icon: 'account_tree',
  },
  {
    id: 'ses-002',
    subject: 'Digital Logic', subjectCode: 'CS502',
    section: 'CSE 3A', room: 'Room 203',
    date: '17 May 2024', startTime: '02:00 PM', endTime: '03:00 PM',
    status: 'completed' as SessionStatus,
    present: 55, absent: 9, unmarked: 0, total: 64,
    attendanceRate: 85.9,
    faculty: 'Dr. Sunita V.',
    icon: 'memory',
  },
  {
    id: 'ses-003',
    subject: 'Mathematics', subjectCode: 'MA501',
    section: 'CSE 3A', room: 'Room 205',
    date: '15 May 2024', startTime: '10:00 AM', endTime: '11:00 AM',
    status: 'expired' as SessionStatus,
    present: 38, absent: 18, unmarked: 2, total: 58,
    attendanceRate: 63.3,
    faculty: 'Prof. R. Narayanan',
    icon: 'functions',
  },
  {
    id: 'ses-004',
    subject: 'Physics', subjectCode: 'PH501',
    section: 'CSE 3A', room: 'Room 204',
    date: '14 May 2024', startTime: '02:00 PM', endTime: '03:00 PM',
    status: 'completed' as SessionStatus,
    present: 60, absent: 5, unmarked: 0, total: 65,
    attendanceRate: 92.3,
    faculty: 'Dr. M. Campbell',
    icon: 'science',
  },
  {
    id: 'ses-005',
    subject: 'English', subjectCode: 'EN501',
    section: 'CSE 3A', room: 'Room 101',
    date: '13 May 2024', startTime: '03:15 PM', endTime: '04:15 PM',
    status: 'cancelled' as SessionStatus,
    present: 0, absent: 0, unmarked: 68, total: 68,
    attendanceRate: 0,
    faculty: 'Prof. A. Stewart',
    icon: 'menu_book',
  },
];

// ─── Student Session (for current user) ───────────────────────────────────────

export const MOCK_STUDENT_SESSION = {
  nextClass: {
    subject: 'Data Structures',
    section: 'CSE 3A',
    room: 'Room 201',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    minutesUntil: 25,
    faculty: 'Prof. Rohit Sharma',
  },
  overallAttendance: 76,
  weeklyGoal: 88,
  totalPresent: 178,
  totalClasses: 232,
  status: 'Eligible',
};

// ─── Notifications ────────────────────────────────────────────────────────────

export const MOCK_STUDENT_NOTIFICATIONS = [
  {
    id: 'notif-001',
    type: 'attendance',
    title: 'Attendance Window Open',
    message: 'Data Structures class attendance is currently open. Mark your attendance now.',
    time: '10:02 AM',
    date: 'Today',
    read: false,
    icon: 'how_to_reg',
    color: '#16A34A',
  },
  {
    id: 'notif-002',
    type: 'warning',
    title: 'Low Attendance Warning',
    message: 'Your Digital Logic attendance is at 68%. Attend next 4 classes to avoid penalty.',
    time: '9:00 AM',
    date: 'Today',
    read: false,
    icon: 'warning',
    color: '#F59E0B',
  },
  {
    id: 'notif-003',
    type: 'info',
    title: 'Timetable Updated',
    message: 'Thursday Physics class has been rescheduled to Room 301.',
    time: 'Yesterday',
    date: '19 May 2024',
    read: true,
    icon: 'calendar_today',
    color: '#0645e5',
  },
  {
    id: 'notif-004',
    type: 'success',
    title: 'Attendance Confirmed',
    message: 'Your presence was recorded for Digital Logic on 17 May.',
    time: '3:15 PM',
    date: '17 May 2024',
    read: true,
    icon: 'check_circle',
    color: '#16A34A',
  },
  {
    id: 'notif-005',
    type: 'info',
    title: 'Mid-Term Schedule Released',
    message: 'Mid-term examination schedule for Semester 5 has been published.',
    time: '10:00 AM',
    date: '15 May 2024',
    read: true,
    icon: 'event_note',
    color: '#0032af',
  },
];

export const MOCK_FACULTY_NOTIFICATIONS = [
  {
    id: 'fnotif-001',
    type: 'reminder',
    title: 'Class Starting in 15 Minutes',
    message: 'Data Structures CSE 3A in Room 201 starts at 10:00 AM.',
    time: '9:45 AM',
    date: 'Today',
    read: false,
    icon: 'alarm',
    color: '#0645e5',
  },
  {
    id: 'fnotif-002',
    type: 'admin',
    title: 'Attendance Submission Deadline',
    message: 'Submit CSE semester attendance logs by Friday 5 PM.',
    time: '8:00 AM',
    date: 'Today',
    read: false,
    icon: 'campaign',
    color: '#F59E0B',
  },
  {
    id: 'fnotif-003',
    type: 'info',
    title: 'Room Change',
    message: 'Thursday Algorithms class moved to Room 305 due to maintenance.',
    time: 'Yesterday',
    date: '19 May 2024',
    read: true,
    icon: 'meeting_room',
    color: '#0032af',
  },
  {
    id: 'fnotif-004',
    type: 'success',
    title: 'Attendance Finalized',
    message: 'Digital Logic CSE 3A session attendance successfully finalized.',
    time: '4:00 PM',
    date: '17 May 2024',
    read: true,
    icon: 'check_circle',
    color: '#16A34A',
  },
];

// ─── Live Session Students ────────────────────────────────────────────────────

export const MOCK_LIVE_SESSION_STUDENTS = [
  { id: 'stu-001', name: 'Rohit Kumar', usn: '01CS123', status: 'present', joinedAt: '10:02 AM' },
  { id: 'stu-002', name: 'Priya Sharma', usn: '01CS124', status: 'present', joinedAt: '10:01 AM' },
  { id: 'stu-003', name: 'Amit Patel', usn: '01CS125', status: 'present', joinedAt: '10:03 AM' },
  { id: 'stu-004', name: 'Neha Joshi', usn: '01CS126', status: 'processing', joinedAt: '' },
  { id: 'stu-005', name: 'Vikram Singh', usn: '01CS127', status: 'absent', joinedAt: '' },
  { id: 'stu-006', name: 'Kavita Rao', usn: '01CS128', status: 'present', joinedAt: '10:04 AM' },
  { id: 'stu-007', name: 'Suresh Kumar', usn: '01CS129', status: 'present', joinedAt: '10:02 AM' },
  { id: 'stu-008', name: 'Anjali Mehta', usn: '01CS130', status: 'absent', joinedAt: '' },
  { id: 'stu-009', name: 'Rajan Pillai', usn: '01CS131', status: 'present', joinedAt: '10:05 AM' },
  { id: 'stu-010', name: 'Deepa Nair', usn: '01CS132', status: 'processing', joinedAt: '' },
];

// ─── Admin Dashboard Stats ────────────────────────────────────────────────────

export const MOCK_ADMIN_STATS = {
  totalStudents: 1248,
  totalFaculty: 87,
  activeSessionsToday: 12,
  avgAttendanceToday: 82,
  pendingDeviceRegistrations: 14,
  studentsAtRisk: 38,
  departments: 6,
  coursesThisSemester: 48,
};

// ─── Audit Logs ───────────────────────────────────────────────────────────────

export const MOCK_AUDIT_LOGS = [
  {
    id: 'log-001',
    action: 'Attendance Session Created',
    description: 'Faculty FAC123 started attendance for Data Structures CSE 3A',
    user: 'Prof. Rohit Sharma', userId: 'FAC123',
    timestamp: '20 May 2024, 10:00 AM',
    type: 'attendance', severity: 'info',
  },
  {
    id: 'log-002',
    action: 'Manual Override',
    description: 'Student 01CS125 marked present manually by FAC123',
    user: 'Prof. Rohit Sharma', userId: 'FAC123',
    timestamp: '20 May 2024, 11:05 AM',
    type: 'override', severity: 'warning',
  },
  {
    id: 'log-003',
    action: 'Device Registered',
    description: 'New device registered for student 01CS124 (Samsung Galaxy S21)',
    user: 'Priya Sharma', userId: '01CS124',
    timestamp: '19 May 2024, 2:30 PM',
    type: 'device', severity: 'info',
  },
  {
    id: 'log-004',
    action: 'Timetable Published',
    description: 'Admin ADMIN001 published Week 3 timetable for all departments',
    user: 'System Admin', userId: 'ADMIN001',
    timestamp: '18 May 2024, 9:00 AM',
    type: 'timetable', severity: 'info',
  },
  {
    id: 'log-005',
    action: 'Session Cancelled',
    description: 'English CSE 3A session cancelled by admin due to faculty absence',
    user: 'System Admin', userId: 'ADMIN001',
    timestamp: '13 May 2024, 3:00 PM',
    type: 'attendance', severity: 'error',
  },
  {
    id: 'log-006',
    action: 'Bulk Student Import',
    description: '42 new student accounts created from CSV import',
    user: 'System Admin', userId: 'ADMIN001',
    timestamp: '01 May 2024, 10:00 AM',
    type: 'user', severity: 'info',
  },
];

// ─── Reports ──────────────────────────────────────────────────────────────────

export const MOCK_REPORT_SUMMARY = {
  month: 'May 2024',
  totalSessions: 148,
  avgAttendance: 79.6,
  topDepartment: 'Computer Science',
  topDepartmentRate: 84.2,
  lowestDepartment: 'Civil Engineering',
  lowestDepartmentRate: 67.1,
  studentsAtRisk: 38,
  improvement: +2.3, // vs last month
};

export const MOCK_DEPARTMENT_STATS = [
  { dept: 'CSE', sessions: 52, avgAttendance: 84.2, students: 320 },
  { dept: 'ECE', sessions: 38, avgAttendance: 78.5, students: 280 },
  { dept: 'ME', sessions: 28, avgAttendance: 73.1, students: 240 },
  { dept: 'CE', sessions: 18, avgAttendance: 67.1, students: 180 },
  { dept: 'EEE', sessions: 12, avgAttendance: 81.4, students: 160 },
];

// ─── Timetable Management ─────────────────────────────────────────────────────

export const MOCK_MANAGED_TIMETABLE = [
  {
    id: 'tt-001', subject: 'Data Structures', subjectCode: 'CS501',
    faculty: 'Prof. Rohit Sharma', section: 'CSE 3A', room: 'Room 201',
    day: 'Monday', startTime: '10:00 AM', endTime: '11:00 AM',
    status: 'published',
  },
  {
    id: 'tt-002', subject: 'Algorithms', subjectCode: 'CS503',
    faculty: 'Prof. Rohit Sharma', section: 'CSE 3B', room: 'Room 202',
    day: 'Monday', startTime: '12:00 PM', endTime: '01:00 PM',
    status: 'published',
  },
  {
    id: 'tt-003', subject: 'Mathematics', subjectCode: 'MA501',
    faculty: 'Prof. R. Narayanan', section: 'CSE 3A', room: 'Room 205',
    day: 'Monday', startTime: '08:00 AM', endTime: '09:00 AM',
    status: 'published',
  },
  {
    id: 'tt-004', subject: 'Digital Logic', subjectCode: 'CS502',
    faculty: 'Dr. Sunita V.', section: 'CSE 3A', room: 'Room 203',
    day: 'Wednesday', startTime: '10:00 AM', endTime: '11:00 AM',
    status: 'draft',
  },
];

// ─── System Users ─────────────────────────────────────────────────────────────

export const MOCK_SYSTEM_USERS = [
  { id: 'usr-001', name: 'System Admin', email: 'admin@smartattend.edu', role: 'Super Admin', status: 'active', lastLogin: 'Today, 9:00 AM' },
  { id: 'usr-002', name: 'Dr. Registrar', email: 'registrar@smartattend.edu', role: 'Registrar', status: 'active', lastLogin: 'Yesterday' },
  { id: 'usr-003', name: 'HOD CSE', email: 'hod.cse@smartattend.edu', role: 'HOD', status: 'active', lastLogin: 'Today, 8:30 AM' },
  { id: 'usr-004', name: 'IT Support', email: 'itsupport@smartattend.edu', role: 'Support', status: 'active', lastLogin: '18 May 2024' },
];

// Alias Exports for components
export const mockStudents = MOCK_STUDENTS;
export const mockFaculty = MOCK_FACULTY_LIST;
export const mockAuditLogs = MOCK_AUDIT_LOGS;
export const mockAttendanceSessions = MOCK_ATTENDANCE_SESSIONS;
export const mockFacultyClasses = MOCK_FACULTY_TIMETABLE.Mon;
export const mockNotifications = {
  faculty: MOCK_FACULTY_NOTIFICATIONS,
  student: MOCK_STUDENT_NOTIFICATIONS,
};
export const mockReports = {
  overallAttendanceRate: MOCK_REPORT_SUMMARY.avgAttendance,
  totalSessionsConducted: MOCK_REPORT_SUMMARY.totalSessions,
  flaggedExceptions: MOCK_REPORT_SUMMARY.studentsAtRisk,
  departmentStats: MOCK_DEPARTMENT_STATS.map((d) => ({
    department: d.dept,
    students: d.students,
    attendanceRate: d.avgAttendance,
  })),
};
export const MOCK_FACULTY_DASHBOARD = {
  name: MOCK_FACULTY.name,
  designation: MOCK_FACULTY.designation,
  department: MOCK_FACULTY.department,
  totalClassesToday: 4,
  activeClass: MOCK_FACULTY_TIMETABLE.Mon[0],
};

