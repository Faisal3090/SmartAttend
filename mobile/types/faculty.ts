/**
 * SmartAttend — TypeScript Type Definitions
 * Faculty entity
 */
export interface Faculty {
  id: string;
  facultyId: string;
  fullName: string;
  department: string;
  email: string;
  mobile?: string;
  assignedSubjects: string[];
  assignedClasses: string[];
  status: 'active' | 'inactive';
  profilePhoto?: string;
}

export interface FacultyDashboardData {
  faculty: Faculty;
  todayClassCount: number;
  labSessionCount: number;
  avgAttendancePercent: number;
  nextClass?: ClassSummary;
}

export interface ClassSummary {
  id: string;
  subjectName: string;
  subjectCode: string;
  section: string;
  room: string;
  startTime: string;
  endTime: string;
  date: string;
  classType: 'lecture' | 'lab' | 'tutorial';
  enrolledCount: number;
  startsInMinutes?: number;
}
