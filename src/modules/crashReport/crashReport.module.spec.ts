import { Test } from '@nestjs/testing';
import { CrashReportModule } from './crashReport.module';

let instance: CrashReportModule;

beforeEach(() => {
    instance = new CrashReportModule();
});

it('Check we have a CrashReportModule class.', () => {
    expect(instance).toBeInstanceOf(CrashReportModule);
});
