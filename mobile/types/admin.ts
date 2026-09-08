/**
 * SmartAttend — TypeScript Type Definitions
 * Admin entity
 */
export interface Admin {
  id: string;
  adminId: string;
  fullName: string;
  institutionName: string;
  email: string;
  role: 'super_admin' | 'admin' | 'operator';
  permissions: string[];
}

export interface AdminDashboardStats {
  totalStudents: number;
  totalFaculty: number;
  activeClasses: number;
  pendingDeviceRequests: number;
  unreadNotifications: number;
}
