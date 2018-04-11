import { Connection, Repository } from 'typeorm';
import { CrashReport } from './crashReport.entity';

export const crashReportProviders = [
  {
    provide: 'CrashReportRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(CrashReport),
    inject: ['DbConnectionToken'],
  },
];