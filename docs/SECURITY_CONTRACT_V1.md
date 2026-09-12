# SmartAttend Security Contract v1

Status: Frozen design contract for Phase 1

This document defines the cryptographic, challenge, BLE-token, expiration, replay, and error contracts that later implementation phases must follow.

This document does not implement any feature. It does not change the Prisma schema, APIs, Android code, BLE behavior, authentication, or attendance behavior.

## 1. Scope and current repository state

The current repository has:

- JWT authentication using `jsonwebtoken`.
- Password hashing using `bcryptjs`.
- A `StudentDevice` model containing `studentId`, `publicKey`, and `isActive`.
- Android BLE advertising and scanning through a custom React Native native module.
- A student BLE verification endpoint that currently accepts `sessionId` and `rssi`.
- A simulated mobile device-registration screen.

The current repository does not have:

- EC key-pair generation.
- Android Keystore integration.
- Signature generation or verification.
- Registration challenges.
- Attendance challenges.
- Refresh-token sessions.
- BLE token hashing or replay protection.

The existing `publicKey` and `cryptographicKey` values are therefore identifiers only, not proof of private-key possession.

## 2. Versioning

The frozen contract version is:

```text
SmartAttend:v1
```

The version appears as the first line of every canonical signing payload. Future incompatible changes must use a new contract version and must not silently reinterpret v1 payloads.

## 3. Cryptographic contract

| Item | Frozen value |
|---|---|
| Key algorithm | EC |
| Curve | P-256 / secp256r1 |
| Signature algorithm | SHA256withECDSA |
| Signature format | ASN.1 DER-encoded ECDSA signature |
| Public-key format | DER-encoded SubjectPublicKeyInfo (SPKI) |
| Text encoding | UTF-8 |
| Binary transport encoding | Base64url without padding |
| Backend implementation | Node.js built-in `node:crypto` APIs; no new third-party crypto dependency required |
| Android implementation | Android platform `java.security` and `android.security.keystore` APIs |

### Public-key transport

The public key sent to the backend is represented exactly as:

```text
EC public key object
    ↓
DER/SPKI bytes
    ↓
Base64url without padding
    ↓
JSON string
```

The backend decodes the Base64url value to DER/SPKI bytes and imports it as an EC public key. PEM, raw X9.62 point bytes, compressed points, hexadecimal, and JSON Web Key representations are not valid v1 public-key representations.

### Signature transport

The signature is represented exactly as:

```text
DER-encoded ECDSA signature bytes
    ↓
Base64url without padding
    ↓
JSON string
```

The IEEE P1363 `r || s` format is not valid for v1. The Android and Node.js implementations must both use the DER signature format produced and accepted by `SHA256withECDSA`/Node `crypto` verification.

### Private-key rule

The private key is generated and retained inside Android Keystore. It must never:

- Be returned to React Native JavaScript.
- Be stored in AsyncStorage, SecureStore, files, logs, navigation parameters, or API payloads.
- Be included in BLE advertisements.
- Be sent to the backend.

Only the public key and a signature are allowed to cross the native/JavaScript boundary.

## 4. Canonical signing format

Android and the backend must not independently serialize objects. Both sides must construct the same ordered line format defined here.

Canonical payload rules:

1. Lines are joined with one ASCII line-feed byte (`0x0A`).
2. There is no trailing line feed.
3. Field order is fixed by the examples below.
4. Field names are lowercase ASCII.
5. Values use only the formats defined by this document.
6. No whitespace is added before or after values.
7. The complete canonical string is encoded as UTF-8.
8. The UTF-8 bytes are passed directly to `SHA256withECDSA`; no application-level hash is added first.

The canonical form is an ASCII-safe key-value record, not JSON:

```text
SmartAttend:v1
purpose=<purpose>
...
```

Because values are restricted to UUIDs, decimal integers, RFC3339 UTC timestamps, and Base64url strings, v1 does not define escaping or normalization. Any value outside those formats must be rejected before signing or verification.

## 5. Attendance challenge contract

### Challenge response

The backend returns this logical object after validating the submitted BLE session token:

```json
{
  "challengeId": "8f4c7a1d-4d20-4a13-8e0a-2c0ccdc7c9f5",
  "challenge": "base64url-32-byte-value",
  "sessionId": 481,
  "studentId": 42,
  "deviceId": 17,
  "expiresAt": "2026-09-11T12:30:10Z"
}
```

`studentId` and `deviceId` are server-derived values. The client must not be allowed to choose them. They are included in the response so the exact same values can be included in the signature payload.

### Attendance signing payload

The exact attendance payload is:

```text
SmartAttend:v1
purpose=attendance
challengeId=<challengeId>
challenge=<challenge>
sessionId=<sessionId>
studentId=<studentId>
deviceId=<deviceId>
expiresAt=<expiresAt>
```

The fields must appear in exactly this order. `<challenge>` is the Base64url transport value returned by the backend, not a re-encoded or decoded variant.

### Attendance signing sequence

```text
Attendance challenge object
    ↓
Canonical attendance payload above
    ↓
UTF-8 bytes
    ↓
Android Keystore SHA256withECDSA signing
    ↓
DER signature bytes
    ↓
Base64url without padding
    ↓
Backend verification
```

### Attendance verification binding

The backend verifies all of the following against server state:

- Authenticated user is the student in the challenge.
- Registered active device is the device in the challenge.
- Public key belongs to that device.
- Attendance session ID is the session mapped from the accepted BLE token.
- Challenge ID is unused and unexpired.
- Signature is valid over the exact canonical payload.
- Student is enrolled in the session class.
- Attendance does not already exist for the session/student pair.

The client-provided `studentId` or `deviceId` must never be accepted as identity authority.

## 6. Attendance challenge randomness and storage

| Item | Frozen value |
|---|---|
| Random challenge size | 32 bytes / 256 bits |
| Random source | Backend cryptographically secure random source, equivalent to Node `crypto.randomBytes(32)` |
| Transport | Base64url without padding |
| Database storage | SHA-256 hash of the decoded 32-byte challenge, represented as lowercase hexadecimal |
| Raw challenge persistence | Not required after response generation; must not be logged |
| Lifetime | 60 seconds from server creation time |
| Use | Exactly once |

The challenge hash is for lookup and replay state. Signature verification uses the exact challenge transport value returned to the client, reconstructed into the canonical payload.

## 7. Registration challenge contract

Registration is separate from attendance and uses a distinct purpose value.

### Registration flow

1. The authenticated student generates an EC P-256 key pair in Android Keystore.
2. The public key is exported as Base64url DER/SPKI.
3. The student sends the public key and algorithm metadata to request a registration challenge.
4. The backend creates a challenge bound to the authenticated student and submitted public-key hash.
5. Android signs the registration payload using the new private key.
6. The backend verifies the signature using the submitted public key.
7. Only then does the backend register the public key.

This proves possession of the private key corresponding to the submitted public key. It does not claim hardware attestation; hardware attestation is outside the v1 contract.

### Registration challenge response

```json
{
  "challengeId": "d2c3a0a8-8123-4b0d-b20b-8dd1fa05d5b3",
  "challenge": "base64url-32-byte-value",
  "studentId": 42,
  "publicKey": "base64url-der-spki-value",
  "expiresAt": "2026-09-11T12:25:00Z"
}
```

The `studentId` is server-derived. The public key in the response must be byte-for-byte the public key submitted for that registration attempt.

### Registration signing payload

```text
SmartAttend:v1
purpose=device-registration
challengeId=<challengeId>
challenge=<challenge>
studentId=<studentId>
algorithm=EC
curve=P-256
publicKey=<publicKey>
expiresAt=<expiresAt>
```

### Registration challenge rules

| Item | Frozen value |
|---|---|
| Random challenge size | 32 bytes / 256 bits |
| Random source | Backend cryptographically secure random source |
| Transport | Base64url without padding |
| Storage | SHA-256 hash of decoded challenge, lowercase hexadecimal |
| Lifetime | 5 minutes from server creation time |
| Use | Exactly once |
| Binding | Authenticated student plus submitted public-key hash |

Registration never accepts a public key without a valid signature from its corresponding private key.

## 8. BLE session-token contract

The numeric database session ID is not a BLE authorization token.

```text
Database session ID ≠ BLE authorization token
```

### Token format

| Item | Frozen value |
|---|---|
| Raw token size | 16 bytes / 128 bits |
| Random source | Backend cryptographically secure random source |
| Transport | Base64url without padding |
| Payload size | 22 ASCII characters for 16 bytes, compatible with current legacy BLE payload limits |
| Database representation | SHA-256 hash of decoded token, lowercase hexadecimal |
| Scope | One attendance session only |
| Lifetime | Exactly the server-side attendance-session lifetime |
| Contents | Opaque random value only |

The advertisement must not contain:

- Numeric database session ID as authorization material.
- Student ID or register number.
- JWT or password.
- Private key.
- Public key.
- Personal information.

The backend maps the received token hash to an active `AttendanceSession`. The raw token does not need to be stored.

### Token lookup

```text
BLE token received
    ↓
Base64url decode and validate 16 bytes
    ↓
SHA-256 decoded bytes
    ↓
Lookup token hash
    ↓
Require active, unexpired session
```

The token is a discovery mechanism and session selector. It is not a substitute for the attendance signature.

## 9. Expiration rules

All expiration decisions use backend server time and UTC timestamps. Mobile timers are display and lifecycle aids only.

| Object | Frozen lifetime/rule |
|---|---|
| Attendance session | Maximum 15 minutes from creation, capped by the scheduled class end; server `expiresAt` is authoritative |
| BLE session token | Same `expiresAt` as its attendance session |
| Attendance challenge | 60 seconds from creation |
| Registration challenge | 5 minutes from creation |
| Clock skew | No client clock is trusted; backend compares its own current time |

An attendance session is invalid when it is closed or when server time is at or after `expiresAt`, regardless of whether the faculty UI still displays it as active.

## 10. Replay-protection contract

Every challenge is:

```text
one-time use
+ bound to student
+ bound to device
+ bound to attendance session
+ time-limited
```

Required state transition:

```text
UNUSED
   ↓ successful verified request
CONSUMED
```

Any later request using the same challenge must be rejected, including a request with the same valid signature.

The eventual backend implementation must consume the challenge and create attendance in a transaction or equivalent atomic operation so concurrent requests cannot both succeed.

Attendance also requires a database-level unique `(sessionId, studentId)` constraint to protect against concurrent duplicate requests.

## 11. Device-identity contract

The registered device is identified by the backend's `StudentDevice` record.

Identity authority is:

```text
authenticated user/session
        +
backend-selected active StudentDevice
```

The client must not authenticate by submitting arbitrary `studentId` or `deviceId` values.

For attendance, the backend selects the active device associated with the authenticated student, creates the challenge using that device ID, and verifies the public key stored for that device.

For registration, the authenticated student identity comes from the authenticated session, while the submitted public key is accepted only after proof of possession.

## 12. Error contract

External responses should avoid revealing unnecessary cryptographic details. Internal logs may record diagnostic categories, but must never log private keys, raw challenges, or signatures.

| Condition | External category | Suggested HTTP status |
|---|---|---:|
| Missing/invalid authentication | `AUTHENTICATION_REQUIRED` | 401 |
| Invalid or expired access session | `AUTHENTICATION_INVALID` | 401 |
| Inactive student/account | `ACCOUNT_INACTIVE` | 403 |
| Revoked/inactive device | `DEVICE_REVOKED` | 403 |
| Invalid/unknown BLE token | `ATTENDANCE_SESSION_INVALID` | 403 |
| Expired BLE token/session | `ATTENDANCE_SESSION_EXPIRED` | 410 |
| Closed attendance session | `ATTENDANCE_SESSION_CLOSED` | 409 |
| Invalid/expired registration challenge | `REGISTRATION_CHALLENGE_INVALID` | 400/410 |
| Invalid/expired attendance challenge | `ATTENDANCE_CHALLENGE_INVALID` | 400/410 |
| Consumed attendance challenge | `ATTENDANCE_CHALLENGE_CONSUMED` | 409 |
| Invalid signature | `DEVICE_PROOF_INVALID` | 403 |
| Student not enrolled | `STUDENT_NOT_ENROLLED` | 403 |
| Duplicate attendance | `ATTENDANCE_ALREADY_RECORDED` | 409 |

The client may receive a generic verification failure for cryptographic errors. It must not be told whether a public key, challenge, or signature was almost valid.

## 13. RSSI decision

RSSI is not part of attendance authorization.

RSSI may exist as BLE scanner output, because Android's `ScanResult` naturally exposes it. It is classified only as:

```text
BLE scanner metadata
        ↓
NOT USED FOR SECURITY
        ↓
NOT USED FOR ATTENDANCE AUTHORIZATION
```

The v1 contract defines no RSSI threshold, scoring, distance estimation, calibration, validation, acceptance, rejection, or formula. Changing RSSI must not change the authorization result.

## 14. Repository compatibility notes

### Backend

The backend currently depends on:

- `jsonwebtoken`
- `bcryptjs`
- Express
- Prisma Next/Postgres tooling

No third-party EC/signature library is currently declared. Node's built-in `node:crypto` is the intended implementation surface for v1.

### Mobile

The mobile project is Expo/React Native with a checked-in Android project and a custom native BLE module. `expo-secure-store` exists, but it is not a replacement for Android Keystore private-key operations. The eventual key implementation must use Android platform Keystore APIs through a native module.

### Existing BLE payload limits

The current advertiser has legacy service/manufacturer payload limits. The frozen 16-byte raw BLE token becomes 22 Base64url characters, which is intentionally selected to fit the current short manufacturer-data path. The implementation must still verify the final Android advertisement size.

### Existing device registration

The current `/api/student/device` endpoint accepts a raw public-key string without proof of possession, and the current mobile registration screen is simulated. Phase 2 must replace that behavior with the registration challenge contract above.

### Existing attendance

The current student endpoint accepts `sessionId` and `rssi`. Phase 2 must replace that security-critical behavior with BLE-token validation and the attendance challenge/signature contract. RSSI must not be carried as an authorization input.

## 15. Canonical signing examples

### Attendance example

Logical input:

```json
{
  "challengeId": "8f4c7a1d-4d20-4a13-8e0a-2c0ccdc7c9f5",
  "challenge": "QkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkI",
  "sessionId": 481,
  "studentId": 42,
  "deviceId": 17,
  "expiresAt": "2026-09-11T12:30:10Z"
}
```

Canonical representation:

```text
SmartAttend:v1
purpose=attendance
challengeId=8f4c7a1d-4d20-4a13-8e0a-2c0ccdc7c9f5
challenge=QkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkI
sessionId=481
studentId=42
deviceId=17
expiresAt=2026-09-11T12:30:10Z
```

Processing:

```text
canonical string
    ↓ UTF-8 encode
SHA256withECDSA using Android Keystore private key
    ↓ DER signature bytes
Base64url without padding
    ↓ JSON signature field
backend verifies with stored DER/SPKI public key
```

The example contains no real private key and is illustrative test data only.

### Registration example

Canonical representation:

```text
SmartAttend:v1
purpose=device-registration
challengeId=d2c3a0a8-8123-4b0d-b20b-8dd1fa05d5b3
challenge=Q0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0M
studentId=42
algorithm=EC
curve=P-256
publicKey=<base64url-der-spki-value>
expiresAt=2026-09-11T12:25:00Z
```

The public-key value is the exact Base64url DER/SPKI string submitted for the registration attempt.

## 16. Verification rules summary

The future backend must verify:

1. Input encoding and field formats.
2. Authenticated user and role.
3. Active user account.
4. Active registered device.
5. Attendance token hash and session state.
6. Challenge hash, binding, expiry, and unused state.
7. Exact canonical payload bytes.
8. EC P-256 public key.
9. DER ECDSA signature using SHA256withECDSA.
10. Student enrollment.
11. Duplicate attendance constraint.
12. Atomic challenge consumption and attendance creation.

RSSI is deliberately absent from this list.

## 17. Phase boundary

Phase 1 freezes this document only. Later phases may implement the contract after explicit approval.

Phase 1 does not:

- Modify application source.
- Modify Prisma schema.
- Create migrations.
- Add Android Keystore code.
- Change BLE advertising or scanning.
- Change JWT or authentication behavior.
- Change attendance endpoints.
- Change React Native attendance screens.
- Add refresh tokens.
- Add admin reset.
- Remove student logout.
- Add RSSI security logic.
