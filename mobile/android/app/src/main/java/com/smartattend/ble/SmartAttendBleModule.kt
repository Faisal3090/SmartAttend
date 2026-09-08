package com.smartattend.ble

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class SmartAttendBleModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private val bleManager =
        AndroidBleManager(reactContext)

    companion object {
        private const val PERMISSION_REQUEST_CODE = 5001
    }

    override fun getName(): String {
        return "SmartAttendBLE"
    }

    @ReactMethod
fun addListener(eventName: String) {
    // Required by React Native NativeEventEmitter.
}

@ReactMethod
fun removeListeners(count: Int) {
    // Required by React Native NativeEventEmitter.
}

    private fun sendEvent(
        eventName: String,
        id: String,
        rssi: Int
    ) {
        val params = Arguments.createMap()

        params.putString("id", id)
        params.putInt("rssi", rssi)

        reactContext
            .getJSModule(
                DeviceEventManagerModule.RCTDeviceEventEmitter::class.java
            )
            .emit(eventName, params)
    }

    @ReactMethod
    fun requestPermissions(promise: Promise) {

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
            promise.resolve(true)
            return
        }

        val permissions = arrayOf(
            Manifest.permission.BLUETOOTH_SCAN,
            Manifest.permission.BLUETOOTH_CONNECT,
            Manifest.permission.BLUETOOTH_ADVERTISE
        )

        val missingPermissions = permissions.filter {
            ActivityCompat.checkSelfPermission(
                reactContext,
                it
            ) != PackageManager.PERMISSION_GRANTED
        }

        if (missingPermissions.isEmpty()) {
            promise.resolve(true)
            return
        }

        val activity = reactContext.currentActivity

        if (activity == null) {
            promise.reject(
                "NO_ACTIVITY",
                "Unable to request Bluetooth permissions because the activity is not available."
            )
            return
        }

        ActivityCompat.requestPermissions(
            activity,
            missingPermissions.toTypedArray(),
            PERMISSION_REQUEST_CODE
        )

        promise.resolve(true)
    }

    @ReactMethod
    fun startTeacherBroadcast(sessionId: String) {
        bleManager.startTeacherBroadcast(sessionId)
    }

    @ReactMethod
    fun stopTeacherBroadcast() {
        bleManager.stopTeacherBroadcast()
    }

    @ReactMethod
    fun startStudentBroadcast(cryptographicId: String) {
        bleManager.startStudentBroadcast(cryptographicId)
    }

    @ReactMethod
    fun stopStudentBroadcast() {
        bleManager.stopStudentBroadcast()
    }

    @ReactMethod
    fun startStudentScanning() {
        bleManager.startStudentScanning { sessionId, rssi ->
            sendEvent(
                "SmartAttendSessionDetected",
                sessionId,
                rssi
            )
        }
    }

    @ReactMethod
    fun startTeacherScanning() {
        bleManager.startTeacherScanning { studentId, rssi ->
            sendEvent(
                "SmartAttendStudentDetected",
                studentId,
                rssi
            )
        }
    }

    @ReactMethod
    fun stopStudentScanning() {
        bleManager.stopStudentScanning()
    }

    @ReactMethod
    fun stopTeacherScanning() {
        bleManager.stopTeacherScanning()
    }

    @ReactMethod
    fun stopAll() {
        bleManager.stopAll()
    }

    override fun invalidate() {
        bleManager.stopAll()
        super.invalidate()
    }
}