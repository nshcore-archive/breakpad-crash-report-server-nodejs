import { Test } from '@nestjs/testing';
import { CrashReport } from './crashReport.entity';

let instance: CrashReport;

beforeEach(() => {
    instance = new CrashReport();
});

it('Check we have a CrashReport class.', () => {
    expect(instance).toBeInstanceOf(CrashReport);
});
