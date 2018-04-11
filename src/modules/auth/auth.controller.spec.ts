import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { mockAuthService } from './__mocks__/auth.service.mock';
import { HttpException } from '@nestjs/common';

describe('AuthController', () => {

    let authController: AuthController;

    const token = {
        expires_in: 3600,
        access_token: 'successfull',
    };

    beforeEach( async () => {
       authController = new AuthController(mockAuthService.getMockImplementation()());
    });

    it('should return a JWTobject', async () => {
        const validateUserSpy = jest.spyOn(authController.authService, 'validateUser').mockImplementation(() => true );
        const createTokenSpy = jest.spyOn(authController.authService, 'createToken').mockImplementation(() => token );

        const responseObj = await authController.loginUser({email: 'jon@smith.com', password: 'password'});

        expect(responseObj).toBe(token);
        expect(validateUserSpy).toHaveBeenCalled();
        expect(createTokenSpy).toHaveBeenCalled();
    });

    it('should throw an exception', async () => {
        const validateUserSpy = jest.spyOn(authController.authService, 'validateUser').mockImplementation(() => false );
        const createTokenSpy = jest.spyOn(authController.authService, 'createToken');
        const mockError = new HttpException('Un-Authorized', 401);

        try {
            const e = await authController.loginUser({email: 'jon@smith.com', password: 'password'});
            expect(e).not.toEqual(mockError);

        } catch (e) {
            expect(e).toEqual(mockError);
        }

        expect(validateUserSpy).toHaveBeenCalled();
        // expect(createTokenSpy).not.toHaveBeenCalled();
    });
});
