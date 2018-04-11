import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {

    let authService: AuthService;

    const badToken = 'eyJh1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNTIzMzA3OTY1LCJleHAiOjE1MjMzMTE1NjV9.m_l_3rYpB43o-m0icDhOEDUaGaxsfedG21bsBI2P7CQ';

    beforeEach(async () => {
        authService = new AuthService();
    });

    describe('createToken', () => {
        it('should return an object with a JWT token', () => {
            const jwtMock = 'mockJWTString';
            const expectedToken = { expires_in: 3600, access_token: 'mockJWTString' };
            process.env.JWT_SECRET = 'secret';
            const createTokenSpy = jest.spyOn(authService, 'createToken');
            const signJWTSpy = jest.spyOn(authService, 'signJWT');
            jest.spyOn(authService, 'signJWT').mockImplementation(() => jwtMock);
            const token = authService.createToken({email: 'jon@smith.com'});
            expect(expectedToken).toEqual(token);
            expect(createTokenSpy).toHaveBeenCalled();
            expect(signJWTSpy).toHaveBeenCalled();
        });
    });

    describe('validateUser', () => {
        it('should return a bool if supplied credentials are correct', () => {
            process.env.AUTH_EMAIL = 'jon@smith.com';
            process.env.AUTH_PASS = 'secret';

            const validateUserSpy = jest.spyOn(authService, 'validateUser');

            let authStatus = authService.validateUser({ email: 'jon@smith.com', password: 'secret'});
            expect(authStatus).toBe(true);

            authStatus = authService.validateUser({ email: 'jon@smith.com', password: 'wrong secret'});
            expect(authStatus).toBe(false);

            authStatus = authService.validateUser({ email: 'bad@email.com', password: 'secret'});
            expect(authStatus).toBe(false);

            authStatus = authService.validateUser({ email: 'bad@email.com', password: 'wrong secret'});
            expect(authStatus).toBe(false);

            expect(validateUserSpy).toHaveBeenCalled();
        });
    });

    describe('validateToken', () => {
        it('should return a bool if supplied a good token', () => {
            process.env.AUTH_EMAIL = 'jon@smith.com';

            const validateUserSpy = jest.spyOn(authService, 'validateToken');

            let authStatus = authService.validateToken({ email: 'jon@smith.com', iat: 123, exp: 123 });
            expect(authStatus).toBe(true);

            authStatus = authService.validateToken({ email: 'bad@email.com', iat: 123, exp: 123 });
            expect(authStatus).toBe(false);

            expect(validateUserSpy).toHaveBeenCalled();
        });
    });

    describe('signJWT', () => {
        it('should return a JWT obj', () => {
            const signJWTSpy = jest.spyOn(authService, 'signJWT');
            let jwtToken = authService.signJWT('jon@smith.com', 'secret', 3600);
            expect(jwtToken).toEqual(expect.stringContaining(jwtToken));
            expect(signJWTSpy).toHaveBeenCalled();
        });
    });

    describe('signJWT', () => {
        it('should return a JWT obj', () => {
            const signJWTSpy = jest.spyOn(authService, 'signJWT');
            const decodeJWTSpy = jest.spyOn(authService, 'decodeJWT');

            const jwtToken = authService.signJWT('jon@smith.com', 'secret', 3600);
            let decodedJWT = authService.decodeJWT(jwtToken);

            expect(decodedJWT).toEqual(expect.objectContaining({
                email: expect.stringContaining('jon@smith.com'),
                iat: expect.any(Number),
                exp: expect.any(Number),
            }));

            decodedJWT = authService.decodeJWT(badToken);

            expect(decodedJWT).toEqual(expect.objectContaining({
                fail: expect.any(Boolean),
            }));

            expect(signJWTSpy).toHaveBeenCalled();
            expect(decodeJWTSpy).toHaveBeenCalled();

        });
    });
});