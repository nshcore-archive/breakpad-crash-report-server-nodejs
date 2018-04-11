import { createConnection } from 'typeorm';

export const databaseProviders = [{
  provide: 'DbConnectionToken',
  useFactory: async () => await createConnection({
    type: process.env.DB_TYPE as 'postgres' || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'crashreport',
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: Boolean(process.env.DB_SYNC) || true,
  }),
}];
