#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/dc0d5822570675d7a42d25675f9a9ce24ded2b4c569f9e05a6e243a75bf5cf61/contract';
import startContract from '../../snapshots/dc0d5822570675d7a42d25675f9a9ce24ded2b4c569f9e05a6e243a75bf5cf61/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ecf85e094df2632133fba9bab1f56bd3e65dea8a518e1d439561ea2470384515/contract';
import endContract from '../../snapshots/ecf85e094df2632133fba9bab1f56bd3e65dea8a518e1d439561ea2470384515/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'registrationChallenge',
        columns: [
          col('challengeHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('consumedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('publicKeyHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'registrationChallenge',
        constraint: 'registrationChallenge_challengeHash_key',
        columns: ['challengeHash'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'registrationChallenge',
        index: 'registrationChallenge_expiresAt_idx_6b6b8c10',
        columns: ['expiresAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'registrationChallenge',
        index: 'registrationChallenge_publicKeyHash_idx_04b59335',
        columns: ['publicKeyHash'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'registrationChallenge',
        index: 'registrationChallenge_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'registrationChallenge',
        foreignKey: {
          name: 'registrationChallenge_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'student', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
