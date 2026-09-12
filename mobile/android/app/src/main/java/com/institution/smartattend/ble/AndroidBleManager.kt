package com.institution.smartattend.ble

import android.content.Context

internal class AndroidBleManager(context: Context) {
    private val advertiser = AndroidBleAdvertiser(context)
    private val scanner = AndroidBleScanner(context)

    fun startTeacherBroadcast(token: String): Boolean = advertiser.start(token)
    fun stopTeacherBroadcast() = advertiser.stop()
    fun startStudentScanning(onToken: (String) -> Unit): Boolean = scanner.start(onToken)
    fun stopStudentScanning() = scanner.stop()
    fun stopAll() {
        advertiser.stop()
        scanner.stop()
    }
}
