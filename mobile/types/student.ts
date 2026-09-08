/**
 * SmartAttend — TypeScript Type Definitions
 * Student entity
 */
export type AccountStatus = 'active' | 'inactive' | 'suspended';
export type DeviceStatus = 'unregistered' | 'registered' | 'revoked';

export interface Student {
  id: string;
  usn: string;
  fullName: string;
  department: string;
  gender: 'male' | 'female' | 'other';
  mobile?: string;
  year: number;
  semester: number;
  section: string;
  accountStatus: AccountStatus;
  deviceStatus: DeviceStatus;
  email?: string;
  profilePhoto?: string;
}

export interface StudentAttendanceSummary {
  subjectCode: string;
  subjectName: string;
  totalClasses: number;
  attended: number;
  percentage: number;
}

export interface StudentSession {
  student: Student;
  deviceRegistered: boolean;
  overallAttendancePercent: number;
}
