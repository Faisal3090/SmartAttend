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
  rssi: number;
};

export const BLEService = {
  async requestPermissions(): Promise<boolean> {
    if (!SmartAttendBLE) {
      throw new Error('SmartAttendBLE native module is not available');
    }

    return await SmartAttendBLE.requestPermissions();
  },

  startTeacherBroadcast(sessionId: string) {
    if (!SmartAttendBLE) {
      throw new Error('SmartAttendBLE native module is not available');
    }

    SmartAttendBLE.startTeacherBroadcast(sessionId);
  },

  stopTeacherBroadcast() {
    SmartAttendBLE?.stopTeacherBroadcast();
  },

  startStudentScanning(
    callback: (data: BleDetection) => void
  ) {
    if (!bleEvents) {
      throw new Error('SmartAttendBLE native module is not available');
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

  startTeacherScanning(
    callback: (data: BleDetection) => void
  ) {
    if (!bleEvents) {
      throw new Error('SmartAttendBLE native module is not available');
    }

    const subscription = bleEvents.addListener(
      'SmartAttendStudentDetected',
      callback
    );

    SmartAttendBLE.startTeacherScanning();

    return subscription;
  },

  stopTeacherScanning() {
    SmartAttendBLE?.stopTeacherScanning();
  },

  stopAll() {
    SmartAttendBLE?.stopAll();
  },
};