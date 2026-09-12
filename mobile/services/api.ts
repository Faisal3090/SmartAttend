const API_BASE_URL = "http://192.168.1.3:5000/api";

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
};

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    token,
  } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export type RegistrationChallenge = {
  challengeId: string;
  challenge: string;
  studentId: number;
  publicKey: string;
  expiresAt: string;
};

export async function startDeviceRegistration(
  accessToken: string,
  publicKey: string,
): Promise<RegistrationChallenge> {
  const response = await apiRequest<{
    success: boolean;
    data: RegistrationChallenge;
  }>('/student/device/register/start', {
    method: 'POST',
    token: accessToken,
    body: { publicKey },
  });

  return response.data;
}

export async function completeDeviceRegistration(
  accessToken: string,
  payload: {
    challengeId: string;
    challenge: string;
    publicKey: string;
    signature: string;
  },
) {
  return apiRequest<{
    success: boolean;
    message: string;
    data: {
      id: number;
      studentId: number;
      publicKey: string;
      keyId: string;
      status: string;
    };
  }>('/student/device/register/complete', {
    method: 'POST',
    token: accessToken,
    body: payload,
  });
}

export type AttendanceChallenge = {
  challengeId: string;
  challenge: string;
  sessionId: number;
  studentId: number;
  deviceId: number;
  publicKey: string;
  algorithm: string;
  curve: string;
  signatureAlgorithm: string;
  expiresAt: string;
};

export async function startAttendanceChallenge(
  accessToken: string,
  sessionToken: string,
): Promise<AttendanceChallenge> {
  const response = await apiRequest<{
    success: boolean;
    data: AttendanceChallenge;
  }>('/attendance/student/ble/challenge', {
    method: 'POST',
    token: accessToken,
    body: { sessionToken },
  });

  return response.data;
}

export async function completeAttendanceChallenge(
  accessToken: string,
  payload: {
    challengeId: string;
    challenge: string;
    signature: string;
  },
) {
  return apiRequest<{
    success: boolean;
    message: string;
    data: { id: number; sessionId: number; studentId: number; status: string };
  }>('/attendance/student/ble/verify', {
    method: 'POST',
    token: accessToken,
    body: payload,
  });
}
