import { NativeModules, Platform } from 'react-native';

type SmartAttendCryptoModule = {
  hasDeviceKey(): Promise<boolean>;
  getOrCreateDevicePublicKey(): Promise<string>;
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
  if (Platform.OS !== 'android' || !cryptoModule) {
    throw new Error('Android Keystore is unavailable on this device');
  }
  return cryptoModule;
}

export const DeviceCrypto = {
  async hasDeviceKey(): Promise<boolean> {
    if (!cryptoModule) return true;
    return cryptoModule.hasDeviceKey();
  },

  async getOrCreateDevicePublicKey(): Promise<string> {
    if (!cryptoModule) {
      console.warn('SmartAttendCrypto native module unavailable. Using Expo Go fallback device public key.');
      return 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAERVwXIiWoiBJEB5Q3WTy1ArUmKC7hjTaPfWLmJ1o_0R0K9bD-0ogTkq1awUIz17Jj4oF8P-BXckejYyBpPAPMKw';
    }
    return cryptoModule.getOrCreateDevicePublicKey();
  },

  async signRegistrationPayload(
    challengeId: string,
    challenge: string,
    studentId: number,
    publicKey: string,
    expiresAt: string,
  ): Promise<string> {
    if (!cryptoModule) {
      console.warn('SmartAttendCrypto native module unavailable. Using Expo Go fallback registration signature.');
      return 'EXPO_GO_DEV_SIGNATURE';
    }
    return cryptoModule.signRegistrationPayload(
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
    if (!cryptoModule) {
      console.warn('SmartAttendCrypto native module unavailable. Using Expo Go fallback attendance signature.');
      return 'EXPO_GO_DEV_SIGNATURE';
    }
    return cryptoModule.signAttendancePayload(
      challengeId,
      challenge,
      sessionId,
      studentId,
      deviceId,
      publicKey,
      expiresAt,
    );
  },
};
