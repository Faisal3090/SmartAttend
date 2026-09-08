/**
 * SmartAttend — TypeScript Type Definitions
 * Attendance & Class entities
 */

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type SessionStatus = 'active' | 'completed' | 'expired' | 'cancelled';
export type AttendanceSource = 'ble' | 'manual' | 'override';

export interface AttendanceRecord {
  id: string;
  classId: string;
  studentId: string;
  status: AttendanceStatus;
  timestamp: string;
  verificationState: 'verified' | 'pending' | 'failed';
  source: AttendanceSource;
  reason?: string;
}

export interface AttendanceSession {
  id: string;
  classId: string;
  facultyId: string;
  startTime: string;
  endTime: string;
  serviceUuid: string;
  sessionChallenge: string;
  status: SessionStatus;
}

export interface Class {
  id: string;
  subject: string;
  subjectCode: string;
  section: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  classType: 'lecture' | 'lab' | 'tutorial';
  facultyId: string;
  enrolledCount: number;
}
