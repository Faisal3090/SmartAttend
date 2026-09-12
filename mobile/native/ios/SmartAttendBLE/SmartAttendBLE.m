#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(SmartAttendBLE, RCTEventEmitter)
RCT_EXTERN_METHOD(requestPermissions:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(startTeacherBroadcast:(NSString *)token)
RCT_EXTERN_METHOD(stopTeacherBroadcast)
RCT_EXTERN_METHOD(startStudentScanning)
RCT_EXTERN_METHOD(stopStudentScanning)
RCT_EXTERN_METHOD(stopAll)
@end
