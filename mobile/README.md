# 📱 SMARTATTEND — Next-Gen Student Attendance Management System

**SMARTATTEND** is a high-performance, institutional attendance verification platform built with **React Native**, **Expo SDK 57**, **Expo Router**, and a modern Tailwind-inspired visual design system. 

It unifies **Students**, **Faculty**, and **Administrators** into a single mobile codebase featuring a **Unified Single Login**, role-based layout guarding, interactive dashboards, and complete simulated BLE/Geofence verification flows across **45 UI prototype screens**.

---

## 🔑 Test Credentials (Single Unified Login)

There is **only ONE login screen** (`/login`) for all 3 user roles. Entering credentials automatically routes the user to their respective protected interface.

| Role | ID / Username | Dev Password | Dashboard Route |
|---|---|---|---|
| 🎓 **Student** | `01CS123` | `student123` | `/(student)/` |
| 👨‍🏫 **Faculty** | `FAC123` | `faculty123` | `/(faculty)/` |
| 🛡️ **Admin** | `ADMIN001` | `admin123` | `/(admin)/` |

> ℹ️ *All authentication credentials and session states use a dev-ready local state container (`AuthProvider.tsx` & `mockAuth.ts`).*

---

## 🌟 Feature Breakdown & Completed Screen Inventory (45 Screens)

### 🎓 1. STUDENT ROLE (17 Screens)
- **Unified Login**: `/login` — Secure entry point with role auto-detection.
- **Student Home**: `/(student)/` — Active greeting, next class countdown hero card, attendance goal bar, and 6 quick action cards.
- **My Timetable**: `/(student)/timetable` — 5-day interactive day switcher, live ongoing class indicators, room tags, and lunch break dividers.
- **Subject-Wise Attendance**: `/(student)/attendance` — Overall percentage ring, course breakdown list, safety threshold pills, and detailed subject progress.
- **Subject Details**: `/(student)/subject-details` — Per-subject session history, credit weights, faculty contacts, and requirement alerts.
- **Attendance Verification Steps**:
  1. **Attendance Reminder**: `/(student)/attendance-reminder` — Live session countdown banner and check-in prompt.
  2. **Attendance Check**: `/(student)/attendance-check` — Animated BLE beacon signal scan, GPS geofence lock, and hardware binding check.
  3. **Location Check**: `/(student)/location-check` — Classroom distance calculation (meter radius) and location lock.
  4. **All Checks Passed**: `/(student)/all-checks-passed` — Pre-submission summary card.
  5. **Attendance Marked**: `/(student)/attendance-marked` — Digital transaction receipt (`#ATT-849204`) with cryptographic timestamp.
- **History & Audit**: `/(student)/history` & `/(student)/history-detail` — Attendance audit log listing BLE RSSI signal data, GPS coordinates, and device hardware UUIDs.
- **Notifications**: `/(student)/notifications` — Unread indicators, mark-all-read action, and status-coded notification cards.
- **Hardware Binding & Profile**: `/(student)/device-registration`, `/(student)/registration-success`, `/(student)/profile` — One-student-one-device lock audit card with testing sign-out control.

---

### 👨‍🏫 2. FACULTY ROLE (14 Screens)
- **Faculty Dashboard**: `/(faculty)/` — Greeting, upcoming lecture countdown hero card, daily class insight bar, quick actions, and campus broadcast feed.
- **Today's Timetable**: `/(faculty)/timetable` — Interactive schedule cards with quick actions to view details or start live session.
- **Class Details**: `/(faculty)/class-details` — Enrolled count, average attendance metrics, venue details, and class management controls.
- **Manage / Edit Class**: `/(faculty)/manage-class` — Configure grace periods, venue overrides, and session cancellation.
- **Attendance Session Lifecycle**:
  1. **Start Attendance**: `/(faculty)/start-attendance` — Duration picker (5m to 30m) and BLE/Geofence security toggles.
  2. **BLE Session Active**: `/(faculty)/ble-session` — Live radar pulse animation, countdown display, and real-time student check-in counters.
  3. **Live Roster**: `/(faculty)/live-participation` — Real-time student check-in list with Present/Absent/Processing filters.
  4. **Session Expired**: `/(faculty)/session-expired` — Automated window lock with 5-minute extension option.
  5. **Attendance Review**: `/(faculty)/attendance-review` — Summary statistics grid and manual exception alerts.
  6. **Manual Exceptions**: `/(faculty)/manual-exceptions` — Override weak BLE signal flags and approve/reject manual presence requests.
  7. **Finalize Ledger**: `/(faculty)/finalize-attendance` — Permanently lock attendance log and sync with institutional record.
- **Notifications, History & Profile**: `/(faculty)/notifications`, `/(faculty)/attendance`, `/(faculty)/profile` — Detailed session archives and faculty profile with sign-out.

---

### 🛡️ 3. ADMIN ROLE (14 Screens)
- **Admin Dashboard**: `/(admin)/` — Real-time overview metrics (Total Students, Faculty, Active Classes) and 3x3 interactive quick action grid.
- **Student Management**: `/(admin)/students` — Student directory, live search by USN/Name/Dept, and device binding status tags.
- **Student Account Provisioning**: `/(admin)/student-setup` — Form for enrolling new students and dispatching registration tokens.
- **Hardware Device Audit**: `/(admin)/student-profile` — Hardware UUID lock inspector with remote device unbinding action.
- **Faculty Directory**: `/(admin)/faculty` — Faculty directory with assigned course tags.
- **Bulk Academic Update**: `/(admin)/bulk-update` — Batch semester promotion tool for entire department cohorts.
- **Academic Structure Master**: `/(academic-master)` — Department, course, faculty, and student quota breakdown.
- **Timetable Management & Import**:
  1. `/(admin)/timetable-import` — Drag & drop CSV schedule file uploader with syntax validation.
  2. `/(admin)/timetable` — Master schedule builder and slot manager.
  3. `/(admin)/publish-timetable` — Institutional broadcast confirmation card.
- **System Users & Roles**: `/(admin)/users` — User role management (Super Admin, Registrar, HOD, Support) and navigation shortcuts.
- **Audit Logs & Governance**: `/(admin)/audit-logs` — Security audit trail logging manual overrides, device registrations, and administrative actions.
- **System Settings**: `/(admin)/settings` — Global rules for binding locks, GPS geofence radius, and BLE signal transmission power.
- **Reports & Analytics**: `/(admin)/reports` — Department attendance comparison bars and PDF/CSV export generation.

---

## 🛠️ Technology Stack & Architecture

- **Core Framework**: React Native (SDK 57) + Expo
- **Routing & Navigation**: Expo Router (File-based router with stack and tab groups)
- **Language**: TypeScript (100% strict type safety — 0 errors on `npx tsc --noEmit`)
- **Icons & Graphics**: `@expo/vector-icons` (Ionicons) + `react-native-svg`
- **Authentication**: Custom Context-based `AuthProvider.tsx` with role route guards
- **Mock Data Layer**: Centralized entity store in `mocks/mockData.ts`
- **Styling**: Vanilla React Native `StyleSheet` with design tokens (`colors.ts`, `typography.ts`, `spacing.ts`)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on mobile (optional) or browser

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Tejasdev-97/Smart_Attend.git
cd Smart_Attend/SmartAttend
npm install
```

### 3. Running the App locally

#### Start Expo Dev Server (Web + Mobile QR)
```bash
npx expo start
```

#### Run directly in Web Browser
```bash
npx expo start --web
```

#### Run in Tunnel Mode (To test on mobile over internet)
```bash
npx expo start --tunnel
```

---

## 📂 Directory Structure

```
SmartAttend/
├── app/
│   ├── _layout.tsx                 ← Root Layout (Auth Provider & Stack)
│   ├── index.tsx                   ← Entry point (Auto-redirect)
│   ├── login.tsx                   ← Unified Single Login Screen
│   ├── (student)/                  ← Protected Student Routes (17 screens)
│   │   ├── _layout.tsx             ← Student Tab Bar & Navigation Guard
│   │   ├── index.tsx               ← Student Dashboard
│   │   ├── timetable.tsx           ← My Timetable
│   │   ├── attendance.tsx          ← Subject-wise Attendance
│   │   ├── subject-details.tsx     ← Course Details & Logs
│   │   ├── attendance-check.tsx    ← BLE/GPS Verification Step
│   │   ├── location-check.tsx      ← Geofence Distance Calculation
│   │   ├── all-checks-passed.tsx   ← Pre-submission Summary
│   │   ├── attendance-marked.tsx   ← Transaction Receipt
│   │   ├── history-detail.tsx      ← Verification Log Detail
│   │   └── profile.tsx             ← Profile & Device Binding
│   ├── (faculty)/                  ← Protected Faculty Routes (14 screens)
│   │   ├── _layout.tsx             ← Faculty Tab Bar & Navigation Guard
│   │   ├── index.tsx               ← Faculty Dashboard
│   │   ├── timetable.tsx           ← Today's Schedule
│   │   ├── class-details.tsx       ← Class Overview & Stats
│   │   ├── start-attendance.tsx    ← Session Duration & Security Config
│   │   ├── ble-session.tsx         ← Active BLE Beacon Broadcaster
│   │   ├── live-participation.tsx  ← Live Roster & Student Counter
│   │   ├── manual-exceptions.tsx   ← Manual Signal Override
│   │   └── finalize-attendance.tsx ← Lock Ledger Confirmation
│   └── (admin)/                    ← Protected Admin Routes (14 screens)
│       ├── _layout.tsx             ← Admin Tab Bar & Navigation Guard
│       ├── index.tsx               ← Admin Dashboard & 3x3 Grid
│       ├── students.tsx            ← Student Directory & Search
│       ├── student-profile.tsx     ← Hardware Unbinding Audit
│       ├── timetable-import.tsx    ← CSV Schedule File Parser
│       ├── audit-logs.tsx          ← System Audit Trail
│       ├── settings.tsx            ← Geofence & BLE Config
│       └── reports.tsx             ← Department Analytics & Exports
├── auth/
│   └── AuthProvider.tsx            ← Role-based Auth Context
├── constants/
│   ├── colors.ts                   ← Stitch Color Palette Tokens
│   ├── typography.ts               ← Typography Hierarchy
│   └── spacing.ts                  ← Radius, Elevation & Padding
├── mocks/
│   ├── mockAuth.ts                 ← Simulated Authentication Service
│   └── mockData.ts                 ← Centralized Entity Mock Database
└── STITCH_SCREEN_MAP.md            ← Prototype Folder Screen Mapping
```

---

## 🎨 Visual Design System

- **Primary Color**: `#0032af` (SmartAttend Deep Blue)
- **Primary Container**: `#0645e5` (Vibrant Action Blue)
- **Tertiary Container**: `#593cd1` (Purple Hero Gradient Cards)
- **Success / Warning**: `#16a34a` (Emerald Green) / `#f59e0b` (Amber Alert)
- **Surface**: `#f9f9ff` (Soft Slate White)
- **Typography**: Clean scale with crisp hierarchy and readable label sizes.

---

## 📊 Development Roadmap & Status

| Phase | Description | Status |
|---|---|---|
| **Phase 1** | Base Expo setup, Auth Provider, Unified Login, Base Layouts | ✅ **Completed** |
| **Phase 2** | Frontend Implementation of all 45 Prototype Screens & Routes | ✅ **Completed** |
| **Phase 3** | Backend Integration (Node.js + PostgreSQL + REST API) | 📅 *Planned* |
| **Phase 4** | Cryptographic Device Binding & Hardware Hash Verification | 📅 *Planned* |
| **Phase 5** | Native BLE Advertising & Scanning Integration | 📅 *Planned* |
| **Phase 6** | SQLite Offline Ledger Sync | 📅 *Planned* |

---

## 📜 License

This project is created for **SmartAttend Student Attendance Systems**. All rights reserved.
