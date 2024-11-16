import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { DbConfig } from "../entities/DbConfig";

export class ChangeJsonDataStructure1731781049898 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = await AppDataSource
      .getRepository(DbConfig)
      .find({
        select: {
          id: true,
          options: true as any,
          tags: true,
        }
      });

    console.log(data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
