#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/5354a51ca6802dcef022b269fe5e114eaeb3794507e39206153e7fe35fd06aa4/contract';
import startContract from '../../snapshots/5354a51ca6802dcef022b269fe5e114eaeb3794507e39206153e7fe35fd06aa4/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/dc0d5822570675d7a42d25675f9a9ce24ded2b4c569f9e05a6e243a75bf5cf61/contract';
import endContract from '../../snapshots/dc0d5822570675d7a42d25675f9a9ce24ded2b4c569f9e05a6e243a75bf5cf61/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';
import { db } from '../../../src/prisma/db.ts';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropIndex({
        schema: 'public',
        table: 'studentDevice',
        index: 'studentDevice_studentId_idx_bf255322',
      }),
      this.createTable({
        schema: 'public',
        table: 'attendanceChallenge',
        columns: [
          col('challengeHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('consumedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('deviceId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sessionId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'refreshSession',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('deviceId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('lastUsedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('revokedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('tokenHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'attendanceSession',
        column: col('broadcastTokenHash', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'attendanceSession',
        column: col('expiresAt', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-string@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'attendanceSession',
        column: col('status', 'text', {
          notNull: true,
          default: lit('ACTIVE'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'studentDevice',
        column: col('algorithm', 'text', {
          notNull: true,
          default: lit('EC'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'studentDevice',
        column: col('curve', 'text', {
          notNull: true,
          default: lit('P-256'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'studentDevice',
        column: col('lastSeenAt', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-string@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'studentDevice',
        column: col('registeredAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-string@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'studentDevice',
        column: col('revokedAt', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-string@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'studentDevice',
        column: col('revokedBy', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'studentDevice',
        column: col('signatureAlgorithm', 'text', {
          notNull: true,
          default: lit('SHA256withECDSA'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'studentDevice',
        column: col('status', 'text', {
          notNull: true,
          default: lit('ACTIVE'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('authVersion', 'int4', {
          notNull: true,
          default: lit(1),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'studentDevice',
        column: col('keyId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-studentDevice-keyId', {
        check: () => db.raw.sql`
          SELECT "id"
          FROM "studentDevice"
          WHERE "keyId" IS NULL
          LIMIT 1
        `.returnsRow({ id: db.sql.public.studentDevice.columns.id }).build(),
        run: () => db.raw.sql`
          UPDATE "studentDevice"
          SET "keyId" = gen_random_uuid()::text
          WHERE "keyId" IS NULL
        `.affectedCount(),
      }),
      this.setNotNull({ schema: 'public', table: 'studentDevice', column: 'keyId' }),
      this.addUnique({
        schema: 'public',
        table: 'attendance',
        constraint: 'attendance_sessionId_studentId_key',
        columns: ['sessionId', 'studentId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'attendanceChallenge',
        constraint: 'attendanceChallenge_challengeHash_key',
        columns: ['challengeHash'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'attendanceSession',
        constraint: 'attendanceSession_status_check_6dcd8770',
        expression: "\"status\" IN ('ACTIVE', 'CLOSED', 'EXPIRED')",
      }),
      this.addUnique({
        schema: 'public',
        table: 'attendanceSession',
        constraint: 'attendanceSession_broadcastTokenHash_key',
        columns: ['broadcastTokenHash'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'refreshSession',
        constraint: 'refreshSession_tokenHash_key',
        columns: ['tokenHash'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'studentDevice',
        constraint: 'studentDevice_status_check_35f03e2c',
        expression: "\"status\" IN ('ACTIVE', 'REVOKED')",
      }),
      this.addUnique({
        schema: 'public',
        table: 'studentDevice',
        constraint: 'studentDevice_keyId_key',
        columns: ['keyId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'attendanceChallenge',
        index: 'attendanceChallenge_deviceId_idx_a7d461e8',
        columns: ['deviceId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'attendanceChallenge',
        index: 'attendanceChallenge_expiresAt_idx_6b6b8c10',
        columns: ['expiresAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'attendanceChallenge',
        index: 'attendanceChallenge_sessionId_idx_29f415d4',
        columns: ['sessionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'attendanceChallenge',
        index: 'attendanceChallenge_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'attendanceSession',
        index: 'attendanceSession_expiresAt_idx_6b6b8c10',
        columns: ['expiresAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'attendanceSession',
        index: 'attendanceSession_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'refreshSession',
        index: 'refreshSession_deviceId_idx_a7d461e8',
        columns: ['deviceId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'refreshSession',
        index: 'refreshSession_expiresAt_idx_6b6b8c10',
        columns: ['expiresAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'refreshSession',
        index: 'refreshSession_revokedAt_idx_f1d8e6b3',
        columns: ['revokedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'refreshSession',
        index: 'refreshSession_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'studentDevice',
        index: 'studentDevice_one_active_per_student_87677287',
        columns: ['studentId'],
        extras: { where: '("status" = \'ACTIVE\')', unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'studentDevice',
        index: 'studentDevice_revokedBy_idx_dd582028',
        columns: ['revokedBy'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'attendanceChallenge',
        foreignKey: {
          name: 'attendanceChallenge_sessionId_fkey',
          columns: ['sessionId'],
          references: { schema: 'public', table: 'attendanceSession', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'attendanceChallenge',
        foreignKey: {
          name: 'attendanceChallenge_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'student', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'attendanceChallenge',
        foreignKey: {
          name: 'attendanceChallenge_deviceId_fkey',
          columns: ['deviceId'],
          references: { schema: 'public', table: 'studentDevice', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'refreshSession',
        foreignKey: {
          name: 'refreshSession_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'refreshSession',
        foreignKey: {
          name: 'refreshSession_deviceId_fkey',
          columns: ['deviceId'],
          references: { schema: 'public', table: 'studentDevice', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'studentDevice',
        foreignKey: {
          name: 'studentDevice_revokedBy_fkey',
          columns: ['revokedBy'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
