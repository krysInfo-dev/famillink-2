import 'reflect-metadata';
import 'reflect-metadata'; // DOIT être le premier import pour la CLI aussi
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger les variables d'environnement depuis .env à la racine du projet backend (apps/backend/.env)
// process.cwd() devrait être /home/nicolas/projets/krys-info/IA-coding/famillink/apps/backend/ lors de l'exécution des scripts pnpm pour ce package
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  // TypeORM résoudra ces chemins par rapport à la racine du projet backend (où se trouve tsconfig.json)
  // ou par rapport à l'emplacement de ce fichier data-source.ts.
  // Pour la CLI, il est préférable que les chemins soient relatifs à la racine du package (apps/backend).
  entities: ['src/**/*.entity.ts'], // Pour ts-node et la génération de migrations
  // entities: ['dist/**/*.entity.js'], // Pour la production après compilation
  migrations: ['src/infrastructure/persistance/database/migrations/*.ts'], // Pour ts-node
  // migrations: ['dist/infrastructure/persistance/database/migrations/*.js'], // Pour la production
  migrationsTableName: 'migrations_history',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging:
    process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
