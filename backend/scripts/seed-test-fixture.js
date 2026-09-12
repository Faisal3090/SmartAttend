import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "../src/prisma/db.js";

const TEST_PASSWORD = "SmartAttendTest123!";

function todayDayOfWeek() {
  return new Date().getDay();
}

async function first(model, where) {
  const rows = await model.where(where).all();
  return rows[0] ?? null;
}

async function main() {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);

  let department = await first(db.orm.public.Department, { code: "TEST-CS" });
  if (!department) {
    department = await db.orm.public.Department.create({
      name: "SmartAttend Test Computer Science",
      code: "TEST-CS",
    });
  }

  let facultyUser = await first(db.orm.public.User, { email: "faculty.test@smartattend.local" });
  if (!facultyUser) {
    facultyUser = await db.orm.public.User.create({
      name: "SmartAttend Test Faculty",
      email: "faculty.test@smartattend.local",
      passwordHash,
      role: "FACULTY",
      isActive: true,
    });
  }

  let studentUser = await first(db.orm.public.User, { email: "student.test@smartattend.local" });
  if (!studentUser) {
    studentUser = await db.orm.public.User.create({
      name: "SmartAttend Test Student",
      email: "student.test@smartattend.local",
      passwordHash,
      role: "STUDENT",
      isActive: true,
    });
  }

  let faculty = await first(db.orm.public.Faculty, { userId: facultyUser.id });
  if (!faculty) {
    faculty = await db.orm.public.Faculty.create({
      userId: facultyUser.id,
      employeeId: "TEST-FACULTY-001",
      departmentId: department.id,
    });
  }

  let student = await first(db.orm.public.Student, { userId: studentUser.id });
  if (!student) {
    student = await db.orm.public.Student.create({
      userId: studentUser.id,
      registerNumber: "TEST-STUDENT-001",
      departmentId: department.id,
      semester: 1,
      section: "A",
      academicYear: "2026-2027",
    });
  }

  let subject = await first(db.orm.public.Subject, { code: "TEST-BLE-101" });
  if (!subject) {
    subject = await db.orm.public.Subject.create({
      name: "SmartAttend BLE Security Test",
      code: "TEST-BLE-101",
      departmentId: department.id,
      credits: 3,
    });
  }

  let classRecord = await first(db.orm.public.Class, {
    subjectId: subject.id,
    facultyId: faculty.id,
  });
  if (!classRecord) {
    classRecord = await db.orm.public.Class.create({
      subjectId: subject.id,
      facultyId: faculty.id,
      departmentId: department.id,
      semester: 1,
      section: "A",
      academicYear: "2026-2027",
    });
  }

  const now = new Date();
  const startTime = new Date(now.getTime() - 5 * 60 * 1000);
  const endTime = new Date(now.getTime() + 55 * 60 * 1000);
  let timetable = await first(db.orm.public.Timetable, {
    classId: classRecord.id,
    dayOfWeek: todayDayOfWeek(),
  });
  if (!timetable) {
    timetable = await db.orm.public.Timetable.create({
      classId: classRecord.id,
      dayOfWeek: todayDayOfWeek(),
      startTime: startTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
      room: "TEST-LAB",
    });
  } else {
    timetable = await db.orm.public.Timetable.where({ id: timetable.id }).update({
      startTime: startTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
      room: "TEST-LAB",
    });
  }

  const enrollment = await first(db.orm.public.Enrollment, {
    studentId: student.id,
    classId: classRecord.id,
  });
  if (!enrollment) {
    await db.orm.public.Enrollment.create({
      studentId: student.id,
      classId: classRecord.id,
    });
  }

  const testPublicKey = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAERVwXIiWoiBJEB5Q3WTy1ArUmKC7hjTaPfWLmJ1o_0R0K9bD-0ogTkq1awUIz17Jj4oF8P-BXckejYyBpPAPMKw";
  let studentDevice = await first(db.orm.public.StudentDevice, { studentId: student.id });
  if (!studentDevice) {
    await db.orm.public.StudentDevice.create({
      studentId: student.id,
      publicKey: testPublicKey,
      keyId: "test-device-key-001",
      algorithm: "EC",
      curve: "P-256",
      signatureAlgorithm: "SHA256withECDSA",
      status: "ACTIVE",
      isActive: true,
      registeredAt: new Date().toISOString(),
    });
  }

  console.log(JSON.stringify({
    faculty: {
      identifier: facultyUser.email,
      employeeId: faculty.employeeId,
      password: TEST_PASSWORD,
    },
    student: {
      identifier: studentUser.email,
      registerNumber: student.registerNumber,
      password: TEST_PASSWORD,
    },
    class: {
      id: classRecord.id,
      subject: subject.code,
      room: timetable.room,
      timetable: `${timetable.startTime}-${timetable.endTime}`,
    },
    note: "Local development fixture only. Register the student device from the student app before attendance testing.",
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
