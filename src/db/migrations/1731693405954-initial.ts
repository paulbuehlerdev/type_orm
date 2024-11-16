import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1731693405954 implements MigrationInterface {
  name = 'Initial1731693405954'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "db_config"
        (
            "id"            integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "created_at"    datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
            "host"          varchar  NOT NULL,
            "port"          integer  NOT NULL,
            "https_enabled" boolean  NOT NULL,
            "https_key"     varchar
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "db_config"
    `);
  }

}
