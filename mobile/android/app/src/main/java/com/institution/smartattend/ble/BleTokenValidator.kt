package com.institution.smartattend.ble

import android.util.Base64

internal object BleTokenValidator {
    private const val TOKEN_BYTES = 16
    private const val BASE64_FLAGS = Base64.URL_SAFE or Base64.NO_WRAP or Base64.NO_PADDING

    fun isValid(value: String): Boolean {
        if (!value.matches(Regex("^[A-Za-z0-9_-]+$"))) return false
        return try {
            val decoded = Base64.decode(value, BASE64_FLAGS)
            decoded.size == TOKEN_BYTES &&
                Base64.encodeToString(decoded, BASE64_FLAGS) == value
        } catch (_: IllegalArgumentException) {
            false
        }
    }
}
