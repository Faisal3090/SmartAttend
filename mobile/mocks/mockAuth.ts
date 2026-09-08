/**
 * SmartAttend — Mock Authentication Data
 * ⚠️  DEV ONLY — Replace with real REST API in Phase 3
 *
 * These credentials are for development testing ONLY.
 * They must never appear in production builds.
 */

import { LoginResponse } from '../types/auth';

interface MockCredential {
  id: string;
  password: string;
  response: LoginResponse;
}

const MOCK_CREDENTIALS: MockCredential[] = [
  {
    id: '01CS123',
    password: 'student123',
    response: {
      user: {
        id: 'stu-001',
        role: 'student',
        displayName: 'Rohit Kumar',
      },
      accessToken: 'mock-student-access-token',
      refreshToken: 'mock-student-refresh-token',
    },
  },
  {
    id: 'FAC123',
    password: 'faculty123',
    response: {
      user: {
        id: 'fac-001',
        role: 'faculty',
        displayName: 'Prof. Rohit Sharma',
      },
      accessToken: 'mock-faculty-access-token',
      refreshToken: 'mock-faculty-refresh-token',
    },
  },
  {
    id: 'ADMIN001',
    password: 'admin123',
    response: {
      user: {
        id: 'adm-001',
        role: 'admin',
        displayName: 'System Admin',
      },
      accessToken: 'mock-admin-access-token',
      refreshToken: 'mock-admin-refresh-token',
    },
  },
];

/**
 * Simulates a backend login call.
 * Returns a LoginResponse on success, throws on failure.
 */
export async function mockLogin(
  identifier: string,
  password: string
): Promise<LoginResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const cleanId = identifier.trim().toLowerCase();

  const match = MOCK_CREDENTIALS.find(
    (c) =>
      c.id.toLowerCase() === cleanId &&
      c.password === password
  );

  if (match) return match.response;

  // Dev fallback: allow testing with key role strings or standard passwords
  if (cleanId.includes('student') || cleanId.startsWith('01cs') || cleanId.startsWith('stu')) {
    return MOCK_CREDENTIALS[0].response;
  }
  if (cleanId.includes('faculty') || cleanId.startsWith('fac') || cleanId.startsWith('prof')) {
    return MOCK_CREDENTIALS[1].response;
  }
  if (cleanId.includes('admin') || cleanId.startsWith('adm')) {
    return MOCK_CREDENTIALS[2].response;
  }

  throw new Error('Invalid credentials. Standard test accounts:\nStudent: 01CS123 / student123\nFaculty: FAC123 / faculty123\nAdmin: ADMIN001 / admin123');
}
