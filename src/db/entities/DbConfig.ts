import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity()
export class DbConfig {
    // https://typeorm.io/entities#column-types-for-sqlite--cordova--react-native--expo

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        type: 'datetime', // SQLite way | 'timestamp' for other DBs
        default: () => 'CURRENT_TIMESTAMP' })  // CURRENT_TIMESTAMP(6)
    created_at: Date;

    @Column() // { length: 99 } for varchar | 'text', 'enum' for PG etc; unique also here
    host: string;

    @Column()  // 'int', 'double' etc
    port: number;

    @Column()
    https_enabled: boolean;

    @Column({ default: null })
    https_key: string;

    // ...

}
