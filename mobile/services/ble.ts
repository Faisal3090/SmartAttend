import { NativeEventEmitter, NativeModules } from 'react-native';

const { SmartAttendBLE } = NativeModules;

if (!SmartAttendBLE) {
  console.warn(
    'SmartAttendBLE native module is not available.'
  );
}

const bleEvents = SmartAttendBLE
  ? new NativeEventEmitter(SmartAttendBLE)
  : null;

export type BleDetection = {
  id: string;
};

export const BLEService = {
  async requestPermissions(): Promise<boolean> {
    if (!SmartAttendBLE) {
      console.warn('SmartAttendBLE native module is not available. Ensure you are running a native development build (npx expo run:android) rather than standard Expo Go.');
      return false;
    }

    return await SmartAttendBLE.requestPermissions();
  },

  startTeacherBroadcast(sessionToken: string) {
    if (!SmartAttendBLE) {
      console.warn('SmartAttendBLE native module is not available. Native BLE broadcast skipped.');
      return;
    }

    SmartAttendBLE.startTeacherBroadcast(sessionToken);
  },

  stopTeacherBroadcast() {
    SmartAttendBLE?.stopTeacherBroadcast();
  },

  startStudentScanning(
    callback: (data: BleDetection) => void
  ) {
    if (!bleEvents || !SmartAttendBLE) {
      console.warn('SmartAttendBLE native module is not available. Native BLE scanning skipped.');
      return { remove: () => {} };
    }

    const subscription = bleEvents.addListener(
      'SmartAttendSessionDetected',
      callback
    );

    SmartAttendBLE.startStudentScanning();

    return subscription;
  },

  stopStudentScanning() {
    SmartAttendBLE?.stopStudentScanning();
  },

  stopAll() {
    SmartAttendBLE?.stopAll();
  },
};
