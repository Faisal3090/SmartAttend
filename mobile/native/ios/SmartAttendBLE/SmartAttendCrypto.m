#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SmartAttendCrypto, NSObject)
RCT_EXTERN_METHOD(hasDeviceKey:(RCTPromiseResolveBlock)resolve)
RCT_EXTERN_METHOD(getOrCreateDevicePublicKey:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(signRegistrationPayload:(NSString *)challengeId
                  challenge:(NSString *)challenge
                  studentId:(nonnull NSNumber *)studentId
                  publicKey:(NSString *)publicKey
                  expiresAt:(NSString *)expiresAt
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(signAttendancePayload:(NSString *)challengeId
                  challenge:(NSString *)challenge
                  sessionId:(nonnull NSNumber *)sessionId
                  studentId:(nonnull NSNumber *)studentId
                  deviceId:(nonnull NSNumber *)deviceId
                  publicKey:(NSString *)publicKey
                  expiresAt:(NSString *)expiresAt
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(deleteDeviceKey:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end
