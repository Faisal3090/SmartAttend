package com.institution.smartattend.ble

import android.Manifest
import android.annotation.SuppressLint
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.bluetooth.le.BluetoothLeScanner
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanResult
import android.bluetooth.le.ScanSettings
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.os.ParcelUuid
import androidx.core.content.ContextCompat

internal class AndroidBleScanner(private val context: Context) {
    private val adapter: BluetoothAdapter?
        get() = (context.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager).adapter
    private val scanner: BluetoothLeScanner?
        get() = adapter?.bluetoothLeScanner
    private var scanning = false
    private var onToken: ((String) -> Unit)? = null

    @SuppressLint("MissingPermission")
    fun start(listener: (String) -> Unit): Boolean {
        if (!hasPermission() || adapter?.isEnabled != true || scanner == null || scanning) return false
        onToken = listener
        scanner!!.startScan(
            null,
            ScanSettings.Builder().setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY).build(),
            callback,
        )
        scanning = true
        return true
    }

    @SuppressLint("MissingPermission")
    fun stop() {
        if (scanning && hasPermission()) scanner?.stopScan(callback)
        scanning = false
        onToken = null
    }

    private val callback = object : ScanCallback() {
        override fun onScanResult(callbackType: Int, result: ScanResult) {
            val record = result.scanRecord ?: return
            val uuid = ParcelUuid(AndroidBleAdvertiser.SERVICE_UUID)
            if (record.serviceUuids?.contains(uuid) != true) return

            val token = record.manufacturerSpecificData?.get(0xFFFF)
                ?.toString(Charsets.UTF_8)
                ?: record.deviceName
                ?: return
            if (BleTokenValidator.isValid(token)) onToken?.invoke(token)
        }

        override fun onScanFailed(errorCode: Int) {
            scanning = false
            onToken = null
            println("SmartAttend BLE scanning failed: $errorCode")
        }
    }

    private fun hasPermission(): Boolean =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.BLUETOOTH_SCAN,
            ) == PackageManager.PERMISSION_GRANTED
        } else {
            ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.ACCESS_FINE_LOCATION,
            ) == PackageManager.PERMISSION_GRANTED
        }
}
