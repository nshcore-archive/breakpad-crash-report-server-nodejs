import { Test } from '@nestjs/testing';
import { crashReportProviders } from './crashReport.providers';
import { mockCrashReportProviders } from './__mocks__/crashReport.providers.mock';

describe('crashReportProviders', () => {
    it('matches even if received contains additional elements', () => {
        expect(JSON.stringify(crashReportProviders)).toBe(JSON.stringify(mockCrashReportProviders));
    });
});
