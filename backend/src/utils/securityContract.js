import {
  createHash,
  timingSafeEqual,
} from "node:crypto";

export const SECURITY_VERSION = "SmartAttend:v1";
export const DEVICE_ALGORITHM = "EC";
export const DEVICE_CURVE = "P-256";
export const SIGNATURE_ALGORITHM = "SHA256withECDSA";

export function encodeBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

export function decodeBase64Url(value, expectedLength = null) {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length % 4 === 1 ||
    !/^[A-Za-z0-9_-]+$/.test(value)
  ) {
    throw new Error("Invalid base64url value");
  }

  const decoded = Buffer.from(value, "base64url");
  if (expectedLength !== null && decoded.length !== expectedLength) {
    throw new Error("Invalid binary length");
  }
  if (decoded.toString("base64url") !== value) {
    throw new Error("Non-canonical base64url value");
  }
  return decoded;
}

export function sha256Hex(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function equalHex(left, right) {
  if (typeof left !== "string" || typeof right !== "string") return false;
  const leftBuffer = Buffer.from(left, "hex");
  const rightBuffer = Buffer.from(right, "hex");
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function canonicalDeviceRegistrationPayload({
  challengeId,
  challenge,
  studentId,
  publicKey,
  expiresAt,
}) {
  return [
    SECURITY_VERSION,
    "purpose=device-registration",
    `challengeId=${challengeId}`,
    `challenge=${challenge}`,
    `studentId=${studentId}`,
    `algorithm=${DEVICE_ALGORITHM}`,
    `curve=${DEVICE_CURVE}`,
    `publicKey=${publicKey}`,
    `expiresAt=${expiresAt}`,
  ].join("\n");
}

export function canonicalAttendancePayload({
  challengeId,
  challenge,
  sessionId,
  studentId,
  deviceId,
  publicKey,
  expiresAt,
}) {
  return [
    SECURITY_VERSION,
    "purpose=attendance",
    `challengeId=${challengeId}`,
    `challenge=${challenge}`,
    `sessionId=${sessionId}`,
    `studentId=${studentId}`,
    `deviceId=${deviceId}`,
    `algorithm=${DEVICE_ALGORITHM}`,
    `curve=${DEVICE_CURVE}`,
    `publicKey=${publicKey}`,
    `expiresAt=${expiresAt}`,
  ].join("\n");
}
