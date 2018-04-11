import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CrashReportModule } from './modules/crashReport/crashReport.module';

@Module({
  imports: [CrashReportModule, AuthModule],
})

export class ApplicationModule {}
