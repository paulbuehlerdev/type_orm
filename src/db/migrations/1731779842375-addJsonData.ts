import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { DbConfig } from "../entities/DbConfig";
import { OptionsSchema, TagsSchema } from "../entities/DbConfig.types";

export class AddJsonData1731779842375 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = await AppDataSource
      .getRepository(DbConfig)
      .find({
        select: {
          id: true,
        }
      });

    const updatedData = data.map((item, i) =>
      ({
        ...item,
        options: i % 2 === 0 ? {
          type: "normal",
          name: 'normal',
          duration: 1000,
        } : {
          type: "special",
          name: 'special',
          durationSettings: {
            duration: 1000,
            extend: 10,
          },
          code: 'code',
        },
        tags: [
          {
            type: "normal",
            name: 'normal',
          },
          {
            type: "special",
            name: 'special',
            description: 'description',
          },
        ]
      } satisfies DbConfig));

    await AppDataSource.transaction(async (manager) => {
      await Promise.all(updatedData.map(async ({ tags, options, id }) => {
        await manager.update(DbConfig, { id }, {
          options: OptionsSchema.parse(options),
          tags: TagsSchema.parse(tags),
        });
      }));
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const data = await AppDataSource
      .getRepository(DbConfig)
      .find({
        select: {
          id: true,
        }
      });

    await AppDataSource.transaction(async (manager) => {
      await Promise.all(data.map(async ({ id }) => {
        await manager.update(DbConfig, { id }, {
          options: null,
          tags: [],
        });
      }));
    });
  }

}
