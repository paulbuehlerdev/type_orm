import "reflect-metadata"
import { DataSource } from "typeorm";
import { DbConfig } from "./entities/DbConfig";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,  // auto-reflect for prototyping
    logging: false,
    entities: [DbConfig],
    migrations: [],
    subscribers: [],
})
