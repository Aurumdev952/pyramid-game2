import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import dotenv from 'dotenv';
dotenv.config();
const config: Options = {
  // entities: ['dist/**/*.entity.js'],
  // entitiesTs: ['src/**/*.entity.ts'],
  // entities: ['./dist/entities'],
  // entitiesTs: ['./src/entities'],
  dbName: process.env.DATABASE_NAME,
  driver: PostgreSqlDriver,
  debug: true,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
};

export default config;
