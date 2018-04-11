import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import * as bodyParser from 'body-parser';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { AuthService } from '../../src/modules/auth/auth.service';

describe('Auth', () => {

  let server: express;
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {

    process.env.JWT_SECRET = 'secret';
    process.env.AUTH_PASS = 'password';
    process.env.AUTH_EMAIL = 'admin@example.com';

    server = express();

    server.use(bodyParser.json());

    const module = await Test.createTestingModule({
        imports: [AuthModule],
    }).compile();

    authService = new AuthService();

    app = module.createNestApplication(server);
    await app.init();
  });

  it(`/POST auth login should be success`, async () => {

    const authPayload = { email: process.env.AUTH_EMAIL, password: process.env.AUTH_PASS };

    const response = await request(server)
    .post('/auth/login')
    .send(authPayload)
    .expect(200);

    const decodedToken = authService.decodeJWT(response.body.access_token);

    expect(decodedToken).toBeTruthy();
  });

  it(`/POST auth login should be un-auth`, async () => {

    const authPayload = { email: process.env.AUTH_EMAIL, password: 'wrong' };

    const response = await request(server)
    .post('/auth/login')
    .send(authPayload)
    .expect(401);
  });

  it(`/POST auth login should be un-auth`, async () => {

    const authPayload = { email: 'unknown@email.com', password: process.env.AUTH_PASS };

    const response = await request(server)
    .post('/auth/login')
    .send(authPayload)
    .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});