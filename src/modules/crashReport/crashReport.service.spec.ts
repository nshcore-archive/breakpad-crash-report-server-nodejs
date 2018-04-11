import { Test } from '@nestjs/testing';
import { CrashReport } from './crashReport.entity';
import { CrashReportService } from './crashReport.service';
import { mockCrashReportRepository } from './__mocks__/crashReport.repository.mock';

describe('CrashReportService', () => {

    let crashReportService: CrashReportService;
    const payload = { 'id': 1, 'body': { 'pid': 666 }, 'dump': '777===', 'open': true };

    beforeEach(async () => {
        crashReportService = new CrashReportService(mockCrashReportRepository.getMockImplementation()());
    });

    describe('findAll', () => {
        it('should return an array of report entities', async () => {
            const result = ['test'];
            const spy = jest.spyOn(await crashReportService.crashReportRepository, 'find').mockImplementation(() => result);
            expect(await crashReportService.findAll()).toBe(result);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('save', () => {
        it('should save a crash report', async () => {
            const result = ['test'];
            const spy = jest.spyOn(await crashReportService.crashReportRepository, 'save').mockImplementation(() => result);
            expect(await crashReportService.save(payload)).toBe(result);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('findOneById', () => {
        it('should show a crash report by searching for an id', async () => {
            const result = ['test'];
            const spy = jest.spyOn(await crashReportService.crashReportRepository, 'findOneById').mockImplementation(() => result);
            expect(await crashReportService.findOneById(1)).toBe(result);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('updateById', () => {
        it('should update a crash report by searching for an id first', async () => {
            let updatePayload = payload;
            const spy = jest.spyOn(await crashReportService.crashReportRepository, 'updateById').mockImplementation(() => updatePayload);
            updatePayload.open = false;
            expect(await crashReportService.updateById(1, updatePayload)).toBe(updatePayload);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('deleteById', () => {
        it('should delete a crash report by searching for an id first', async () => {
            const result = { status: 'ok' };
            const spy = jest.spyOn(await crashReportService.crashReportRepository, 'deleteById').mockImplementation(() => result);
            expect(await crashReportService.deleteById(1)).toBe(result);
            expect(spy).toHaveBeenCalled();
        });
    });
});
