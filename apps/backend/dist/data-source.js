"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
require("reflect-metadata");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
exports.dataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/infrastructure/persistance/database/migrations/*.ts'],
    migrationsTableName: 'migrations_history',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map