import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJsonColumns1731777596979 implements MigrationInterface {
    name = 'AddJsonColumns1731777596979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_db_config" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                "host" varchar NOT NULL,
                "port" integer NOT NULL,
                "https_enabled" boolean NOT NULL,
                "https_key" varchar,
                "options" json,
                "tags" json NOT NULL DEFAULT ('[]')
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_db_config"(
                    "id",
                    "created_at",
                    "host",
                    "port",
                    "https_enabled",
                    "https_key"
                )
            SELECT "id",
                "created_at",
                "host",
                "port",
                "https_enabled",
                "https_key"
            FROM "db_config"
        `);
        await queryRunner.query(`
            DROP TABLE "db_config"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_db_config"
                RENAME TO "db_config"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "db_config"
                RENAME TO "temporary_db_config"
        `);
        await queryRunner.query(`
            CREATE TABLE "db_config" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                "host" varchar NOT NULL,
                "port" integer NOT NULL,
                "https_enabled" boolean NOT NULL,
                "https_key" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "db_config"(
                    "id",
                    "created_at",
                    "host",
                    "port",
                    "https_enabled",
                    "https_key"
                )
            SELECT "id",
                "created_at",
                "host",
                "port",
                "https_enabled",
                "https_key"
            FROM "temporary_db_config"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_db_config"
        `);
    }

}
