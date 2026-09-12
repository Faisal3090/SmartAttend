package com.institution.smartattend.ble

import android.Manifest
import android.annotation.SuppressLint
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.bluetooth.le.AdvertiseCallback
import android.bluetooth.le.AdvertiseData
import android.bluetooth.le.AdvertiseSettings
import android.content.Context
import android.content.pm.PackageManager
import android.os.ParcelUuid
import androidx.core.content.ContextCompat

internal class AndroidBleAdvertiser(private val context: Context) {
    companion object {
        val SERVICE_UUID: java.util.UUID =
            java.util.UUID.fromString("7b3c0001-8f2a-4c91-a8d2-123456789abc")
        private const val MANUFACTURER_ID = 0xFFFF
    }

    private val adapter: BluetoothAdapter?
        get() = (context.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager).adapter
    private val advertiser
        get() = adapter?.bluetoothLeAdvertiser

    private val callback = object : AdvertiseCallback() {
        override fun onStartSuccess(settingsInEffect: AdvertiseSettings?) {
            println("SmartAttend BLE advertising started")
        }

        override fun onStartFailure(errorCode: Int) {
            println("SmartAttend BLE advertising failed: $errorCode")
        }
    }

    @SuppressLint("MissingPermission")
    fun start(token: String): Boolean {
        if (!hasPermission()) return false
        if (!BleTokenValidator.isValid(token)) return false
        val bluetoothAdapter = adapter ?: return false
        if (!bluetoothAdapter.isEnabled) return false
        val bleAdvertiser = advertiser ?: return false

        stop()

        val mainData = AdvertiseData.Builder()
            .addServiceUuid(ParcelUuid(SERVICE_UUID))
            .setIncludeDeviceName(false)
            .setIncludeTxPowerLevel(false)
            .build()

        // The opaque token is the only application data in the packet.
        val tokenBytes = token.toByteArray(Charsets.UTF_8)
        val scanResponse = AdvertiseData.Builder()
            .setIncludeDeviceName(false)
            .setIncludeTxPowerLevel(false)
            .addManufacturerData(MANUFACTURER_ID, tokenBytes)
            .build()

        val settings = AdvertiseSettings.Builder()
            .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
            .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_MEDIUM)
            .setConnectable(false)
            .build()

        bleAdvertiser.startAdvertising(settings, mainData, scanResponse, callback)
        return true
    }

    @SuppressLint("MissingPermission")
    fun stop() {
        if (!hasPermission()) return
        advertiser?.stopAdvertising(callback)
    }

    private fun hasPermission(): Boolean =
        android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.S ||
            ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.BLUETOOTH_ADVERTISE,
            ) == PackageManager.PERMISSION_GRANTED
}
