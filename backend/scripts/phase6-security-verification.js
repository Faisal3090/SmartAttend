import assert from "node:assert/strict";
import { createSign, createVerify, generateKeyPairSync, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  canonicalAttendancePayload,
  decodeBase64Url,
  encodeBase64Url,
  sha256Hex,
} from "../src/utils/securityContract.js";

const root = resolve(import.meta.dirname, "..");
const controller = readFileSync(resolve(root, "src/controllers/attendanceController.js"), "utf8");
const scanner = readFileSync(resolve(root, "../mobile/android/app/src/main/java/com/institution/smartattend/ble/AndroidBleScanner.kt"), "utf8");

const token = encodeBase64Url(randomBytes(16));
assert.equal(decodeBase64Url(token, 16).length, 16);
assert.notEqual(token, "481");
assert.equal(sha256Hex(decodeBase64Url(token, 16)).length, 64);

const challenge = encodeBase64Url(randomBytes(32));
const { privateKey, publicKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
const publicKeyText = publicKey.export({ type: "spki", format: "der" }).toString("base64url");
const payload = canonicalAttendancePayload({
  challengeId: "phase6-challenge",
  challenge,
  sessionId: 481,
  studentId: 7,
  deviceId: 9,
  publicKey: publicKeyText,
  expiresAt: "2026-09-12T12:00:00.000Z",
});
const signature = createSign("sha256").update(payload, "utf8").sign(privateKey);
assert.equal(createVerify("sha256").update(payload, "utf8").verify(publicKey, signature), true);
assert.equal(createVerify("sha256").update(`${payload}\nmodified`, "utf8").verify(publicKey, signature), false);

const wrong = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
assert.equal(createVerify("sha256").update(payload, "utf8").verify(wrong.publicKey, signature), false);

assert.match(controller, /consumedAt: null/);
assert.match(controller, /if \(!consumedChallenge\)/);
assert.doesNotMatch(controller, /result\.rssi|rssi\s*:/i);
assert.doesNotMatch(scanner, /result\.rssi|RSSI/);

console.log("Phase 6 security verification passed");
