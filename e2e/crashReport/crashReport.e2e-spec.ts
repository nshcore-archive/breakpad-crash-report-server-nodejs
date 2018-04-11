import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import * as bodyParser from 'body-parser';
import { INestApplication } from '@nestjs/common';
import { AuthService } from '../../src/modules/auth/auth.service';
import { CrashReportModule } from '../../src/modules/crashReport/crashReport.module';
import { CrashReportService } from '../../src/modules/crashReport/crashReport.service';
import { crashReportProviders } from '../../src/modules/crashReport/crashReport.providers';
import { mockCrashReportService } from '../../src/modules/crashReport/__mocks__/crashReport.service.mock';
import { mockCrashReportProviders } from '../../src/modules/crashReport/__mocks__/crashReport.providers.mock';

describe('Auth', () => {

    let server: express;
    let app: INestApplication;
    let crashReportService: CrashReportService;
    let reportId: number;

    const payload = {
        body: {
            'pid': '666',
            'ver': '1.8.2',
            'prod': 'Electron',
            'ptime': '761',
            'extra1': 'extra1',
            'extra2': 'extra2',
            '_version': '1.0.0',
            'platform': 'linux',
            'lsb-release': 'Ubuntu 16.04.3 LTS',
            '_companyName': 'Maasterly',
            '_productName': 'Maasterly',
            'process_type': 'browser',
        },
        dump: '77+977+977==',
    };

    beforeAll(async () => {

      process.env.JWT_SECRET = 'secret';
      process.env.AUTH_PASS = 'password';
      process.env.AUTH_EMAIL = 'admin@example.com';

      server = express();

      server.use(bodyParser.json());

      const module = await Test.createTestingModule({
          imports: [CrashReportModule],
      }).compile();

      crashReportService = module.get<CrashReportService>(CrashReportService);

      app = module.createNestApplication(server);
      await app.init();
    });

    it(`/POST crash report should store in database and respons with 201`, async () => {

        const response = await request(server)
        .post('/report')
        .send(payload)
        .expect(201);

        expect(typeof response.body.reportId).toBe('number');
        this.reportId = response.body.reportId;
    });

    it(`/GET crash reports should return a collection of crash report entities`, async () => {

        const response = await request(server)
        .get('/report')
        .expect(200);

        expect(typeof response.body.pop()).toBe('object');
    });

    it(`/GET crash reports should return a single crash report entities`, async () => {

        const response = await request(server)
        .get('/report/' + this.reportId)
        .expect(200);

        expect(response.body.id).toBe(this.reportId);
    });

    it(`/PATCH should update a crash report entity`, async () => {

        const updatePayload = payload;
        updatePayload.body.pid = '999';

        const response = await request(server)
        .patch('/report/' + this.reportId)
        .send(updatePayload)
        .expect(200);
    });

    it(`/DELETE should delete a report and return a success`, async () => {

        const response = await request(server)
        .delete('/report/' + this.reportId)
        .expect(200);

        expect(response.body.status).toEqual('ok');
    });

    it(`/DELETE should throw a 404`, async () => {

        const response = await request(server)
        .delete('/report/' + this.reportId)
        .expect(404);
    });
});