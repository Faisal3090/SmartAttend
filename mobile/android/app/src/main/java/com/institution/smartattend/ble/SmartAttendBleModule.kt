package com.institution.smartattend.ble

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

class SmartAttendBleModule(private val context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {

    private val manager = AndroidBleManager(context)
    override fun getName(): String = "SmartAttendBLE"

    @ReactMethod
    fun addListener(eventName: String) {}

    @ReactMethod
    fun removeListeners(count: Int) {}

    @ReactMethod
    fun requestPermissions(promise: Promise) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
            val permission = Manifest.permission.ACCESS_FINE_LOCATION
            if (ActivityCompat.checkSelfPermission(context, permission) == PackageManager.PERMISSION_GRANTED) {
                promise.resolve(true)
                return
            }
            val activity = context.currentActivity
            if (activity == null) {
                promise.reject("NO_ACTIVITY", "Bluetooth permission request requires an active screen")
                return
            }
            ActivityCompat.requestPermissions(activity, arrayOf(permission), 5001)
            promise.resolve(false)
            return
        }

        val required = arrayOf(
            Manifest.permission.BLUETOOTH_SCAN,
            Manifest.permission.BLUETOOTH_ADVERTISE,
            Manifest.permission.BLUETOOTH_CONNECT,
        )
        val missing = required.filter {
            ActivityCompat.checkSelfPermission(context, it) != PackageManager.PERMISSION_GRANTED
        }
        if (missing.isEmpty()) {
            promise.resolve(true)
            return
        }

        val activity = context.currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "Bluetooth permission request requires an active screen")
            return
        }
        ActivityCompat.requestPermissions(activity, missing.toTypedArray(), 5001)
        // The JS API is boolean-based; the caller retries after the system prompt.
        promise.resolve(false)
    }

    @ReactMethod
    fun startTeacherBroadcast(token: String) {
        if (!manager.startTeacherBroadcast(token)) emitError("BLE_ADVERTISING_UNAVAILABLE")
    }

    @ReactMethod
    fun stopTeacherBroadcast() = manager.stopTeacherBroadcast()

    @ReactMethod
    fun startStudentScanning() {
        if (!manager.startStudentScanning { token ->
                val params = Arguments.createMap()
                params.putString("id", token)
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("SmartAttendSessionDetected", params)
                manager.stopStudentScanning()
            }) {
            emitError("BLE_SCANNING_UNAVAILABLE")
        }
    }

    @ReactMethod
    fun stopStudentScanning() = manager.stopStudentScanning()

    @ReactMethod
    fun stopAll() = manager.stopAll()

    private fun emitError(code: String) {
        val params = Arguments.createMap()
        params.putString("code", code)
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("SmartAttendBleError", params)
    }

    override fun invalidate() {
        manager.stopAll()
        super.invalidate()
    }
}
