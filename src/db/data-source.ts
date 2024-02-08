import "reflect-metadata"
import { DataSource } from "typeorm";
import { Database as BetterSQLDB3} from "better-sqlite3-multiple-ciphers";

import { DbConfig } from "./entities/DbConfig";
import * as console from "console";


// constants will be params in init function | key as partial/closure
const dbPath = './database/demo.sqlite';
const encryptionKey = 'your-encryption-key-here';


function prepareDB (db: BetterSQLDB3) {
    // Access the better-sqlite3 Database object directly to set encryption
    console.log('\n\nPreparing the DB...')
    // turned out could use "key" for encryption as well
    db.pragma(`key = '${encryptionKey}'`);
    // should catch "wrong key" error here if the key is wrong if we set WAL manually
    // db.pragma('journal_mode = WAL'); // where are sqlite-wal/shm files?
}

export const AppDataSource = new DataSource({
    type: 'better-sqlite3', // customize it to use better-sqlite3-multiple-ciphers
    database: dbPath,
    driver: require('better-sqlite3-multiple-ciphers'), // 🔑 to use encryption!
    synchronize: true,  // auto-reflect for prototyping
    logging: true,
    verbose: console.log,
    entities: [DbConfig],
    migrations: [],
    subscribers: [],
    enableWAL: true, // with this we'll need 2 wrap it all to catch encr. key error
    // will need to set-up callable with encryption key bound
    prepareDatabase: prepareDB  // set PRAGMAs here!
})