import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { mockAuthService } from '../__mocks__/auth.service.mock';

describe('JwtStrategy', () => {

    let jwtStrategy: JwtStrategy;

    beforeEach( async () => {
        process.env.JWT_SECRET = 'secret';
        jwtStrategy = new JwtStrategy(mockAuthService.getMockImplementation()());
    });

    it('should return a JWTobject', async () => {
        const validateTokenSpy = jest.spyOn(jwtStrategy.authService, 'validateToken').mockImplementation(() => true );

        const response = await jwtStrategy.verify('req', 'payload', () => {
            return true;
        });
        expect(response).toBeTruthy();
        expect(validateTokenSpy).toHaveBeenCalled();
    });

    it('should return an Unauthorized object', async () => {
        const validateTokenSpy = jest.spyOn(jwtStrategy.authService, 'validateToken').mockImplementation(() => false );

        const response = await jwtStrategy.verify(null, null, () => {
            return false;
        });
        expect(response).toBeFalsy();
        expect(validateTokenSpy).toHaveBeenCalled();
    });
});