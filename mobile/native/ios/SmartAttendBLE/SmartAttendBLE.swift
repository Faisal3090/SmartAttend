import CoreBluetooth
import Foundation
import React

@objc(SmartAttendBLE)
final class SmartAttendBLE: RCTEventEmitter, CBPeripheralManagerDelegate, CBCentralManagerDelegate {
  private static let serviceUUID = CBUUID(string: "7B3C0001-8F2A-4C91-A8D2-123456789ABC")
  private static let manufacturerID: UInt16 = 0xFFFF

  private var peripheralManager: CBPeripheralManager?
  private var centralManager: CBCentralManager?
  private var pendingPermission: RCTPromiseResolveBlock?
  private var pendingPermissionReject: RCTPromiseRejectBlock?
  private var advertisingToken: String?
  private var scanning = false

  override init() {
    super.init()
    peripheralManager = CBPeripheralManager(delegate: self, queue: nil)
    centralManager = CBCentralManager(delegate: self, queue: nil)
  }

  override class func requiresMainQueueSetup() -> Bool { true }

  override func supportedEvents() -> [String] {
    ["SmartAttendSessionDetected", "SmartAttendBleError"]
  }

  @objc(requestPermissions:rejecter:)
  func requestPermissions(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let state = peripheralManager?.state, state != .unknown else {
      pendingPermission = resolve
      pendingPermissionReject = reject
      return
    }
    resolve(state == .poweredOn)
    if state != .poweredOn { emitError(codeFor(state)) }
  }

  @objc(startTeacherBroadcast:)
  func startTeacherBroadcast(_ token: String) {
    guard validateToken(token) else {
      emitError("INVALID_SESSION_TOKEN")
      return
    }
    guard let manager = peripheralManager else {
      emitError("BLE_ADVERTISING_UNAVAILABLE")
      return
    }
    guard manager.state == .poweredOn else {
      emitError(codeFor(manager.state))
      return
    }

    manager.stopAdvertising()
    advertisingToken = token
    manager.startAdvertising([
      CBAdvertisementDataServiceUUIDsKey: [Self.serviceUUID],
      CBAdvertisementDataLocalNameKey: token
    ])
  }

  @objc(stopTeacherBroadcast)
  func stopTeacherBroadcast() {
    peripheralManager?.stopAdvertising()
    advertisingToken = nil
  }

  @objc(startStudentScanning)
  func startStudentScanning() {
    guard let manager = centralManager else {
      emitError("BLE_SCANNING_UNAVAILABLE")
      return
    }
    guard manager.state == .poweredOn else {
      emitError(codeFor(manager.state))
      return
    }
    guard !scanning else { return }

    scanning = true
    manager.scanForPeripherals(
      withServices: [Self.serviceUUID],
      options: [CBCentralManagerScanOptionAllowDuplicatesKey: false]
    )
  }

  @objc(stopStudentScanning)
  func stopStudentScanning() {
    centralManager?.stopScan()
    scanning = false
  }

  @objc(stopAll)
  func stopAll() {
    stopTeacherBroadcast()
    stopStudentScanning()
  }

  func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
    if peripheral.state == .poweredOn {
      pendingPermission?(true)
    } else {
      pendingPermission?(false)
      emitError(codeFor(peripheral.state))
    }
    pendingPermission = nil
    pendingPermissionReject = nil
  }

  func centralManagerDidUpdateState(_ central: CBCentralManager) {
    if central.state != .poweredOn && scanning {
      stopStudentScanning()
      emitError(codeFor(central.state))
    }
  }

  func centralManager(
    _ central: CBCentralManager,
    didDiscover peripheral: CBPeripheral,
    advertisementData: [String: Any],
    rssi _: NSNumber
  ) {
    guard let token = tokenFrom(advertisementData), validateToken(token) else { return }
    sendEvent(withName: "SmartAttendSessionDetected", body: ["id": token])
    stopStudentScanning()
  }

  override func invalidate() {
    stopAll()
    super.invalidate()
  }

  private func tokenFrom(_ advertisementData: [String: Any]) -> String? {
    if let localName = advertisementData[CBAdvertisementDataLocalNameKey] as? String,
       validateToken(localName) {
      return localName
    }

    guard let data = advertisementData[CBAdvertisementDataManufacturerDataKey] as? Data else {
      return nil
    }
    let payload: Data = data.count >= 2 && data[0] == UInt8(Self.manufacturerID & 0xFF)
      && data[1] == UInt8(Self.manufacturerID >> 8)
      ? Data(data.dropFirst(2))
      : data
    return String(data: payload, encoding: .utf8)
  }

  private func validateToken(_ token: String) -> Bool {
    let standard = token
      .replacingOccurrences(of: "-", with: "+")
      .replacingOccurrences(of: "_", with: "/")
    let padded = standard + String(repeating: "=", count: (4 - standard.count % 4) % 4)
    guard let data = Data(base64Encoded: padded), data.count == 16 else { return false }
    return data.base64EncodedString()
      .replacingOccurrences(of: "+", with: "-")
      .replacingOccurrences(of: "/", with: "_")
      .replacingOccurrences(of: "=", with: "") == token
  }

  private func codeFor(_ state: CBManagerState) -> String {
    switch state {
    case .poweredOff: return "BLUETOOTH_POWERED_OFF"
    case .unauthorized: return "BLUETOOTH_PERMISSION_DENIED"
    case .unsupported: return "BLE_UNSUPPORTED"
    case .resetting: return "BLUETOOTH_RESETTING"
    case .unknown: return "BLUETOOTH_STATE_UNKNOWN"
    @unknown default: return "BLE_UNAVAILABLE"
    }
  }

  private func emitError(_ code: String) {
    sendEvent(withName: "SmartAttendBleError", body: ["code": code])
  }
}
