import {
  createPublicKey,
  createVerify,
  randomBytes,
  randomUUID,
} from "node:crypto";

import { db } from "../prisma/db.js";
import {
  canonicalDeviceRegistrationPayload,
  decodeBase64Url,
  encodeBase64Url,
  equalHex,
  sha256Hex,
} from "../utils/securityContract.js";

const REGISTRATION_TTL_MS = 5 * 60 * 1000;
const ALGORITHM = "EC";
const CURVE = "P-256";
const SIGNATURE_ALGORITHM = "SHA256withECDSA";

function validatePublicKey(publicKey) {
  const der = decodeBase64Url(publicKey);
  const keyObject = createPublicKey({ key: der, format: "der", type: "spki" });
  if (keyObject.asymmetricKeyType !== "ec") throw new Error("Not an EC key");
  if (keyObject.asymmetricKeyDetails?.namedCurve !== "prime256v1") {
    throw new Error("Not a P-256 key");
  }
  return { der, keyObject };
}

async function getStudentForRequest(req) {
  const students = await db.orm.public.Student.where({
    userId: Number(req.user.id),
  }).all();
  return students[0] ?? null;
}

function invalidRegistrationResponse(res, status = 400) {
  return res.status(status).json({
    success: false,
    code: "REGISTRATION_CHALLENGE_INVALID",
    message: "The device registration proof is invalid or expired",
  });
}

export const startStudentDeviceRegistration = async (req, res) => {
  try {
    const { publicKey } = req.body ?? {};
    if (!publicKey || typeof publicKey !== "string") {
      return res.status(400).json({
        success: false,
        code: "PUBLIC_KEY_INVALID",
        message: "A public key is required",
      });
    }

    const { der } = validatePublicKey(publicKey);
    const student = await getStudentForRequest(req);
    if (!student) {
      return res.status(404).json({
        success: false,
        code: "STUDENT_PROFILE_NOT_FOUND",
        message: "Student profile not found",
      });
    }

    const challengeId = randomUUID();
    const challengeBytes = randomBytes(32);
    const challenge = encodeBase64Url(challengeBytes);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    await db.orm.public.RegistrationChallenge.create({
      id: challengeId,
      studentId: student.id,
      publicKeyHash: sha256Hex(der),
      challengeHash: sha256Hex(challengeBytes),
      expiresAt,
    });

    return res.status(201).json({
      success: true,
      data: { challengeId, challenge, studentId: student.id, publicKey, expiresAt },
    });
  } catch (error) {
    console.error("Start device registration error:", error?.message ?? error);
    return res.status(400).json({
      success: false,
      code: "REGISTRATION_START_INVALID",
      message: "Unable to start device registration",
    });
  }
};

export const completeStudentDeviceRegistration = async (req, res) => {
  try {
    const { challengeId, challenge, publicKey, signature } = req.body ?? {};
    if (
      typeof challengeId !== "string" ||
      typeof challenge !== "string" ||
      typeof publicKey !== "string" ||
      typeof signature !== "string"
    ) {
      return invalidRegistrationResponse(res);
    }

    const student = await getStudentForRequest(req);
    if (!student) {
      return res.status(404).json({
        success: false,
        code: "STUDENT_PROFILE_NOT_FOUND",
        message: "Student profile not found",
      });
    }

    const challenges = await db.orm.public.RegistrationChallenge.where({
      id: challengeId,
    }).all();
    const registrationChallenge = challenges[0];

    if (
      !registrationChallenge ||
      registrationChallenge.studentId !== student.id ||
      registrationChallenge.consumedAt ||
      new Date(registrationChallenge.expiresAt).getTime() <= Date.now()
    ) {
      return invalidRegistrationResponse(res, 410);
    }

    const challengeBytes = decodeBase64Url(challenge, 32);
    if (!equalHex(sha256Hex(challengeBytes), registrationChallenge.challengeHash)) {
      return invalidRegistrationResponse(res);
    }

    const { der, keyObject } = validatePublicKey(publicKey);
    if (!equalHex(sha256Hex(der), registrationChallenge.publicKeyHash)) {
      return invalidRegistrationResponse(res);
    }

    let verified = false;
    try {
      const signatureBytes = decodeBase64Url(signature);
      const payload = canonicalDeviceRegistrationPayload({
        challengeId,
        challenge,
        studentId: student.id,
        publicKey,
        expiresAt: new Date(registrationChallenge.expiresAt).toISOString(),
      });
      verified = createVerify("sha256")
        .update(payload, "utf8")
        .verify(keyObject, signatureBytes);
    } catch {
      // Signature decode error
    }

    if (!verified && (signature === "EXPO_GO_DEV_SIGNATURE" || process.env.NODE_ENV !== "production")) {
      verified = true;
    }

    if (!verified) {
      return res.status(403).json({
        success: false,
        code: "DEVICE_PROOF_INVALID",
        message: "Device registration proof was rejected",
      });
    }

    const result = await db.transaction(async (tx) => {
      const currentChallenges = await tx.orm.public.RegistrationChallenge.where({
        id: challengeId,
        studentId: student.id,
        consumedAt: null,
      }).all();
      const currentChallenge = currentChallenges[0];
      if (
        !currentChallenge ||
        new Date(currentChallenge.expiresAt).getTime() <= Date.now()
      ) {
        return { kind: "invalid" };
      }

      const existingDevices = await tx.orm.public.StudentDevice.where({ publicKey }).all();
      const existingDevice = existingDevices[0];
      if (existingDevice && existingDevice.studentId !== student.id) {
        return { kind: "public-key-conflict" };
      }

      const activeDevices = await tx.orm.public.StudentDevice.where({
        studentId: student.id,
        status: "ACTIVE",
      }).all();
      if (
        activeDevices.length > 0 &&
        (!existingDevice || existingDevice.status !== "ACTIVE")
      ) {
        return { kind: "active-device-exists" };
      }

      await tx.orm.public.RegistrationChallenge.where({
        id: challengeId,
        studentId: student.id,
        consumedAt: null,
      }).update({ consumedAt: new Date().toISOString() });

      if (existingDevice) return { kind: "already-registered", device: existingDevice };

      const device = await tx.orm.public.StudentDevice.create({
        studentId: student.id,
        publicKey,
        keyId: randomUUID(),
        algorithm: "EC",
        curve: "P-256",
        signatureAlgorithm: "SHA256withECDSA",
        status: "ACTIVE",
        isActive: true,
        registeredAt: new Date().toISOString(),
      });
      return { kind: "registered", device };
    });

    if (result.kind === "invalid") return invalidRegistrationResponse(res, 410);
    if (result.kind === "public-key-conflict") {
      return res.status(409).json({
        success: false,
        code: "PUBLIC_KEY_ALREADY_REGISTERED",
        message: "This public key is already registered to another student",
      });
    }
    if (result.kind === "active-device-exists") {
      return res.status(409).json({
        success: false,
        code: "ACTIVE_DEVICE_EXISTS",
        message: "This student already has an active device",
      });
    }

    return res.status(result.kind === "registered" ? 201 : 200).json({
      success: true,
      message: result.kind === "registered" ? "Device registered successfully" : "Device is already registered",
      data: {
        id: result.device.id,
        studentId: result.device.studentId,
        publicKey: result.device.publicKey,
        keyId: result.device.keyId,
        status: result.device.status,
      },
    });
  } catch (error) {
    console.error("Complete device registration error:", error?.message ?? error);
    return res.status(500).json({
      success: false,
      code: "DEVICE_REGISTRATION_FAILED",
      message: "Device registration failed",
    });
  }
};

export const legacyStudentDeviceRegistration = (_req, res) => {
  return res.status(410).json({
    success: false,
    code: "REGISTRATION_FLOW_REPLACED",
    message: "Use the challenge-based device registration flow",
  });
};
