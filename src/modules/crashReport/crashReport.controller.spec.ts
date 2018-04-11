import { Test } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { CrashReport } from './crashReport.entity';
import { CrashReportService } from './crashReport.service';
import { CrashReportController } from './crashReport.controller';

describe('CrashReportController', () => {

  let crashReportController: CrashReportController;
  let crashReportService: CrashReportService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ CrashReportController ],
      components: [ CrashReportService,
        {
          provide: 'CrashReportRepositoryToken',
          useClass: CrashReport,
        },
      ],
    }).compile();

    crashReportService = module.get<CrashReportService>(CrashReportService);
    crashReportController = module.get<CrashReportController>(CrashReportController);
  });

  describe('index', () => {
    it('should return an array of report entities', async () => {
      const result = ['test'];
      jest.spyOn(crashReportService, 'findAll').mockImplementation(() => result);
      expect(await crashReportController.index()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a crash report', async () => {
      const payload = { 'id': 1, 'body': { 'pid': 666 }, 'dump': '777===', 'open': true };
      const result = { 'reportId': 1 };
      jest.spyOn(crashReportService, 'save').mockImplementation(() => payload);
      expect(await crashReportController.create(payload)).toEqual(result);
    });
  });

  describe('show', () => {
    it('should return a single report entity', async () => {
      const result = ['test'];
      jest.spyOn(crashReportService, 'findOneById').mockImplementation(() => result);
      expect(await crashReportController.show(1)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return an updated report entity', async () => {
      const result = { 'id': 1, 'body': { 'pid': 666 }, 'dump': '777===', 'open': true };
      const payload = { 'id': 1, 'body': { 'pid': 666 }, 'dump': '777===', 'open': false };
      jest.spyOn(crashReportService, 'findOneById').mockImplementation(() => result);
      jest.spyOn(crashReportService, 'updateById').mockImplementation(() => payload);
      expect(await crashReportController.update(1, payload)).toBe(payload);
    });
  });

  describe('destroy', () => {
    it('should return a successfull response', async () => {
      const result = { status: 'ok' };
      jest.spyOn(crashReportService, 'findOneById').mockImplementation(() => result);
      jest.spyOn(crashReportService, 'deleteById').mockImplementation(() => result);
      expect(await crashReportController.destroy(1)).toEqual(result);
    });

    it('should throw a new Not Found httpexception', async () => {
      const mockError = new HttpException('Not Found', 404);
      jest.spyOn(crashReportService, 'findOneById').mockImplementation(() => true);
      jest.spyOn(crashReportController, 'checkIfUndefined').mockImplementation(() => true);

      try {
        const e = await crashReportController.destroy(1);
        expect(e).not.toEqual(mockError);
      } catch (HttpException) {
        expect(HttpException).toEqual(mockError);
      }
    });
  });

  describe('destroy', () => {
    it('should return a successfull response', async () => {
      console.log(await crashReportController.checkIfUndefined(undefined));
      expect(await crashReportController.checkIfUndefined()).toBeTruthy();
      expect(await crashReportController.checkIfUndefined('defined')).toBeFalsy();
    });
  });
});