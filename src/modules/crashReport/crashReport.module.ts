import { Module } from '@nestjs/common';
import { CrashReportService } from './crashReport.service';
import { DatabaseModule } from '../database/database.module';
import { crashReportProviders } from './crashReport.providers';
import { CrashReportController } from './crashReport.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CrashReportController],
  components: [
    ...crashReportProviders,
    CrashReportService,
  ],
})

export class CrashReportModule {}