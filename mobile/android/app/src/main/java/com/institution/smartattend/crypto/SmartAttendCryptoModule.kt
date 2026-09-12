package com.institution.smartattend.crypto

import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.security.KeyPairGenerator
import java.security.KeyStore
import java.security.Signature

class SmartAttendCryptoModule(private val context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {

    companion object {
        private const val MODULE_NAME = "SmartAttendCrypto"
        private const val KEY_ALIAS = "smartattend.device.ec.p256.v1"
        private const val KEYSTORE = "AndroidKeyStore"
        private const val ALGORITHM = "EC"
        private const val CURVE = "P-256"
        private const val SIGNATURE_ALGORITHM = "SHA256withECDSA"
        private const val VERSION = "SmartAttend:v1"
    }

    override fun getName(): String = MODULE_NAME

    @ReactMethod
    fun hasDeviceKey(promise: Promise) {
        try {
            promise.resolve(loadKeyStore().containsAlias(KEY_ALIAS))
        } catch (error: Exception) {
            promise.reject("KEYSTORE_UNAVAILABLE", "Android Keystore is unavailable", error)
        }
    }

    @ReactMethod
    fun getOrCreateDevicePublicKey(promise: Promise) {
        try {
            promise.resolve(publicKeyBase64Url(ensureKeyPair().public.encoded))
        } catch (error: Exception) {
            promise.reject("KEY_GENERATION_FAILED", "Unable to access the device key", error)
        }
    }

    @ReactMethod
    fun signRegistrationPayload(
        challengeId: String,
        challenge: String,
        studentId: Int,
        publicKey: String,
        expiresAt: String,
        promise: Promise,
    ) {
        sign(
            canonical = listOf(
                VERSION,
                "purpose=device-registration",
                "challengeId=$challengeId",
                "challenge=$challenge",
                "studentId=$studentId",
                "algorithm=$ALGORITHM",
                "curve=$CURVE",
                "publicKey=$publicKey",
                "expiresAt=$expiresAt",
            ).joinToString("\n"),
            expectedPublicKey = publicKey,
            promise = promise,
        )
    }

    @ReactMethod
    fun signAttendancePayload(
        challengeId: String,
        challenge: String,
        sessionId: Int,
        studentId: Int,
        deviceId: Int,
        publicKey: String,
        expiresAt: String,
        promise: Promise,
    ) {
        sign(
            canonical = listOf(
                VERSION,
                "purpose=attendance",
                "challengeId=$challengeId",
                "challenge=$challenge",
                "sessionId=$sessionId",
                "studentId=$studentId",
                "deviceId=$deviceId",
                "algorithm=$ALGORITHM",
                "curve=$CURVE",
                "publicKey=$publicKey",
                "expiresAt=$expiresAt",
            ).joinToString("\n"),
            expectedPublicKey = publicKey,
            promise = promise,
        )
    }

    @ReactMethod
    fun deleteDeviceKey(promise: Promise) {
        try {
            loadKeyStore().deleteEntry(KEY_ALIAS)
            promise.resolve(true)
        } catch (error: Exception) {
            promise.reject("KEY_DELETE_FAILED", "Unable to delete the device key", error)
        }
    }

    private fun sign(canonical: String, expectedPublicKey: String, promise: Promise) {
        try {
            val keyPair = ensureKeyPair()
            val actualPublicKey = publicKeyBase64Url(keyPair.public.encoded)
            if (actualPublicKey != expectedPublicKey) {
                promise.reject("DEVICE_KEY_MISMATCH", "Registered public key does not match this device key")
                return
            }
            val signature = Signature.getInstance(SIGNATURE_ALGORITHM)
            signature.initSign(keyPair.private)
            signature.update(canonical.toByteArray(Charsets.UTF_8))
            promise.resolve(Base64.encodeToString(signature.sign(), Base64.URL_SAFE or Base64.NO_WRAP or Base64.NO_PADDING))
        } catch (error: Exception) {
            promise.reject("SIGNING_FAILED", "Unable to sign with the device key", error)
        }
    }

    private fun ensureKeyPair(): java.security.KeyPair {
        val keyStore = loadKeyStore()
        if (!keyStore.containsAlias(KEY_ALIAS)) {
            val generator = KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_EC, KEYSTORE)
            generator.initialize(
                KeyGenParameterSpec.Builder(
                    KEY_ALIAS,
                    KeyProperties.PURPOSE_SIGN,
                )
                    .setDigests(KeyProperties.DIGEST_SHA256)
                    .setAlgorithmParameterSpec(java.security.spec.ECGenParameterSpec("secp256r1"))
                    .build(),
            )
            generator.generateKeyPair()
        }
        val privateKey = keyStore.getKey(KEY_ALIAS, null) as java.security.PrivateKey
        val certificate = keyStore.getCertificate(KEY_ALIAS)
        return java.security.KeyPair(certificate.publicKey, privateKey)
    }

    private fun loadKeyStore(): KeyStore = KeyStore.getInstance(KEYSTORE).apply { load(null) }

    private fun publicKeyBase64Url(encoded: ByteArray): String =
        Base64.encodeToString(encoded, Base64.URL_SAFE or Base64.NO_WRAP or Base64.NO_PADDING)
}
