# STITCH_SCREEN_MAP.md
## SmartAttend — Stitch Prototype → React Native Screen Mapping

All 45 Stitch prototype folders are mapped below.
Generated from: `stitch_smartattend_mobile_app_onboarding/`

---

## ✅ Implemented (Phase 1)

| Stitch Folder | React Native Route | Status |
|---|---|---|
| `smartattend_logo` | `assets/SmartAttendLogo.tsx` | ✅ SVG Component |
| `smartattend_login` | `app/login.tsx` | ✅ Complete |
| `device_registration` | `app/(student)/device-registration.tsx` | ✅ Complete |
| `registration_successful` | `app/(student)/registration-success.tsx` | ✅ Complete |
| `student_home` | `app/(student)/index.tsx` | ✅ Complete |
| `faculty_dashboard` | `app/(faculty)/index.tsx` | ✅ Complete |
| `admin_dashboard` | `app/(admin)/index.tsx` | ✅ Complete |

---

## 🔵 Phase 2 — Student Screens

| Stitch Folder | React Native Route | Status |
|---|---|---|
| `my_timetable` | `app/(student)/timetable.tsx` | 🔵 Stub |
| `smartattend_student_interface` | `app/(student)/attendance.tsx` | 🔵 Stub |
| `home_attendance_ongoing` | `app/(student)/attendance-ongoing.tsx` | ⬜ Not started |
| `attendance_check_requirements_in_progress` | `app/(student)/attendance-check.tsx` | ⬜ Not started |
| `location_check_in_progress` | `app/(student)/location-check.tsx` | ⬜ Not started |
| `all_checks_passed_ready_to_mark` | `app/(student)/checks-passed.tsx` | ⬜ Not started |
| `attendance_marked_successfully` | `app/(student)/attendance-marked.tsx` | ⬜ Not started |
| `attendance_history_1` | `app/(student)/history.tsx` | 🔵 Stub |
| `attendance_history_2` | `app/(student)/history-detail.tsx` | ⬜ Not started |
| `subject_wise_attendance` | `app/(student)/subject-attendance.tsx` | ⬜ Not started |
| `subject_details_data_structures` | `app/(student)/subject-detail.tsx` | ⬜ Not started |
| `notifications` | `app/(student)/notifications.tsx` | ⬜ Not started |

---

## 🔵 Phase 2 — Faculty Screens

| Stitch Folder | React Native Route | Status |
|---|---|---|
| `today_s_timetable` | `app/(faculty)/timetable.tsx` | 🔵 Stub |
| `class_details` | `app/(faculty)/class-detail.tsx` | ⬜ Not started |
| `manage_edit_class` | `app/(faculty)/manage-class.tsx` | ⬜ Not started |
| `start_attendance` | `app/(faculty)/start-attendance.tsx` | ⬜ Not started |
| `ble_session_active` | `app/(faculty)/ble-session.tsx` | ⬜ Phase 5 (BLE) |
| `live_student_participation` | `app/(faculty)/live-participation.tsx` | ⬜ Not started |
| `attendance_review` | `app/(faculty)/attendance-review.tsx` | ⬜ Not started |
| `manual_exceptions` | `app/(faculty)/manual-exceptions.tsx` | ⬜ Not started |
| `finalize_attendance` | `app/(faculty)/finalize-attendance.tsx` | ⬜ Not started |
| `attendance_summary` | `app/(faculty)/attendance-summary.tsx` | ⬜ Not started |
| `faculty_notifications` | `app/(faculty)/notifications.tsx` | ⬜ Not started |
| `faculty_profile` | `app/(faculty)/profile.tsx` | 🔵 Stub |
| `session_expired` | `app/(faculty)/session-expired.tsx` | ⬜ Not started |

---

## 🔵 Phase 2 — Admin Screens

| Stitch Folder | React Native Route | Status |
|---|---|---|
| `student_management` | `app/(admin)/student-management.tsx` | ⬜ Not started |
| `student_account_setup` | `app/(admin)/student-account-setup.tsx` | ⬜ Not started |
| `student_profile_device` | `app/(admin)/student-profile.tsx` | ⬜ Not started |
| `faculty_management` | `app/(admin)/faculty-management.tsx` | ⬜ Not started |
| `bulk_academic_update` | `app/(admin)/bulk-update.tsx` | ⬜ Not started |
| `academic_master` | `app/(admin)/academic-master.tsx` | ⬜ Not started |
| `timetable_import` | `app/(admin)/timetable-import.tsx` | ⬜ Not started |
| `timetable_management` | `app/(admin)/timetable-management.tsx` | 🔵 Stub |
| `publish_timetable` | `app/(admin)/publish-timetable.tsx` | ⬜ Not started |
| `system_users_roles` | `app/(admin)/system-users.tsx` | 🔵 Stub |
| `audit_logs` | `app/(admin)/audit-logs.tsx` | ⬜ Not started |
| `system_settings` | `app/(admin)/settings.tsx` | ⬜ Not started |
| `reports_analytics` | `app/(admin)/reports.tsx` | ⬜ Not started |

---

## Legend

| Icon | Meaning |
|---|---|
| ✅ | Fully implemented in Phase 1 |
| 🔵 | Route exists, placeholder content |
| ⬜ | Not yet created |
| 🔵 Phase 5 | BLE-dependent — deferred to Phase 5 |
