import { NativeModules, Platform } from 'react-native';

type SmartAttendCryptoModule = {
  hasDeviceKey(): Promise<boolean>;
  getOrCreateDevicePublicKey(): Promise<string>;
  deleteDeviceKey(): Promise<boolean>;
  signRegistrationPayload(
    challengeId: string,
    challenge: string,
    studentId: number,
    publicKey: string,
    expiresAt: string,
  ): Promise<string>;
  signAttendancePayload(
    challengeId: string,
    challenge: string,
    sessionId: number,
    studentId: number,
    deviceId: number,
    publicKey: string,
    expiresAt: string,
  ): Promise<string>;
};

const cryptoModule = NativeModules.SmartAttendCrypto as
  | SmartAttendCryptoModule
  | undefined;

function getModule(): SmartAttendCryptoModule {
  if (!cryptoModule) {
    throw new Error(`Secure device key storage is unavailable on ${Platform.OS}`);
  }
  return cryptoModule;
}

export const DeviceCrypto = {
  async hasDeviceKey(): Promise<boolean> {
    return getModule().hasDeviceKey();
  },

  async getOrCreateDevicePublicKey(): Promise<string> {
    return getModule().getOrCreateDevicePublicKey();
  },

  async signRegistrationPayload(
    challengeId: string,
    challenge: string,
    studentId: number,
    publicKey: string,
    expiresAt: string,
  ): Promise<string> {
    return getModule().signRegistrationPayload(
      challengeId,
      challenge,
      studentId,
      publicKey,
      expiresAt,
    );
  },

  async signAttendancePayload(
    challengeId: string,
    challenge: string,
    sessionId: number,
    studentId: number,
    deviceId: number,
    publicKey: string,
    expiresAt: string,
  ): Promise<string> {
    return getModule().signAttendancePayload(
      challengeId,
      challenge,
      sessionId,
      studentId,
      deviceId,
      publicKey,
      expiresAt,
    );
  },

  async deleteDeviceKey(): Promise<boolean> {
    return getModule().deleteDeviceKey();
  },
};
