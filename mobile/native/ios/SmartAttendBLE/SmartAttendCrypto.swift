import Foundation
import React
import Security

@objc(SmartAttendCrypto)
final class SmartAttendCrypto: NSObject {
  private let tag = "com.institution.smartattend.devicekey.v1".data(using: .utf8)!
  private let version = "SmartAttend:v1"

  @objc static func requiresMainQueueSetup() -> Bool { false }

  @objc(hasDeviceKey:)
  func hasDeviceKey(_ resolve: @escaping RCTPromiseResolveBlock) {
    resolve(privateKey() != nil)
  }

  @objc(getOrCreateDevicePublicKey:rejecter:)
  func getOrCreateDevicePublicKey(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    do { resolve(try publicKeyBase64Url(ensurePrivateKey())) }
    catch { reject("KEY_GENERATION_FAILED", "Unable to access the device key", error) }
  }

  @objc(signRegistrationPayload:challenge:studentId:publicKey:expiresAt:resolver:rejecter:)
  func signRegistrationPayload(
    _ challengeId: String,
    challenge: String,
    studentId: NSNumber,
    publicKey: String,
    expiresAt: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    sign(
      lines: [version, "purpose=device-registration", "challengeId=\(challengeId)",
              "challenge=\(challenge)", "studentId=\(studentId.intValue)",
              "algorithm=EC", "curve=P-256", "publicKey=\(publicKey)",
              "expiresAt=\(expiresAt)"],
      expectedPublicKey: publicKey,
      resolve: resolve,
      reject: reject
    )
  }

  @objc(signAttendancePayload:challenge:sessionId:studentId:deviceId:publicKey:expiresAt:resolver:rejecter:)
  func signAttendancePayload(
    _ challengeId: String,
    challenge: String,
    sessionId: NSNumber,
    studentId: NSNumber,
    deviceId: NSNumber,
    publicKey: String,
    expiresAt: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    sign(
      lines: [version, "purpose=attendance", "challengeId=\(challengeId)",
              "challenge=\(challenge)", "sessionId=\(sessionId.intValue)",
              "studentId=\(studentId.intValue)", "deviceId=\(deviceId.intValue)",
              "algorithm=EC", "curve=P-256", "publicKey=\(publicKey)",
              "expiresAt=\(expiresAt)"],
      expectedPublicKey: publicKey,
      resolve: resolve,
      reject: reject
    )
  }

  @objc(deleteDeviceKey:rejecter:)
  func deleteDeviceKey(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let query: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom,
      kSecAttrApplicationTag as String: tag
    ]
    let status = SecItemDelete(query as CFDictionary)
    if status == errSecSuccess || status == errSecItemNotFound { resolve(true) }
    else { reject("KEY_DELETE_FAILED", "Unable to delete the device key", nil) }
  }

  private func sign(
    lines: [String],
    expectedPublicKey: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    do {
      let key = try ensurePrivateKey()
      guard try publicKeyBase64Url(key) == expectedPublicKey else {
        reject("DEVICE_KEY_MISMATCH", "Registered public key does not match this device key", nil)
        return
      }
      var error: Unmanaged<CFError>?
      guard let signature = SecKeyCreateSignature(
        key,
        SecKeyAlgorithm.ecdsaSignatureMessageX962SHA256,
        Data(lines.joined(separator: "\n")).asCFData,
        &error
      ) as Data? else {
        throw error?.takeRetainedValue() ?? NSError(domain: "SmartAttendCrypto", code: 1)
      }
      resolve(signature.base64URLEncodedString())
    } catch { reject("SIGNING_FAILED", "Unable to sign with the device key", error) }
  }

  private func ensurePrivateKey() throws -> SecKey {
    if let existing = privateKey() { return existing }
    let attributes: [String: Any] = [
      kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom,
      kSecAttrKeySizeInBits as String: 256,
      kSecPrivateKeyAttrs as String: [
        kSecAttrIsPermanent as String: true,
        kSecAttrApplicationTag as String: tag
      ]
    ]
    var error: Unmanaged<CFError>?
    guard let key = SecKeyCreateRandomKey(attributes as CFDictionary, &error) else {
      throw error?.takeRetainedValue() ?? NSError(domain: "SmartAttendCrypto", code: 2)
    }
    return key
  }

  private func privateKey() -> SecKey? {
    let query: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom,
      kSecAttrApplicationTag as String: tag,
      kSecReturnRef as String: true
    ]
    var result: CFTypeRef?
    return SecItemCopyMatching(query as CFDictionary, &result) == errSecSuccess
      ? (result as! SecKey)
      : nil
  }

  private func publicKeyBase64Url(_ privateKey: SecKey) throws -> String {
    guard let publicKey = SecKeyCopyPublicKey(privateKey) else { throw NSError(domain: "SmartAttendCrypto", code: 3) }
    var error: Unmanaged<CFError>?
    guard let raw = SecKeyCopyExternalRepresentation(publicKey, &error) as Data? else {
      throw error?.takeRetainedValue() ?? NSError(domain: "SmartAttendCrypto", code: 4)
    }
    let prefix: [UInt8] = [0x30, 0x59, 0x30, 0x13, 0x06, 0x07, 0x2A, 0x86, 0x48, 0xCE, 0x3D, 0x02, 0x01, 0x06, 0x08, 0x2A, 0x86, 0x48, 0xCE, 0x3D, 0x03, 0x01, 0x07, 0x03, 0x42, 0x00]
    return Data(prefix + raw).base64URLEncodedString()
  }
}

private extension Data {
  var asCFData: CFData { self as CFData }

  func base64URLEncodedString() -> String {
    base64EncodedString().replacingOccurrences(of: "+", with: "-")
      .replacingOccurrences(of: "/", with: "_")
      .replacingOccurrences(of: "=", with: "")
  }
}
