import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { MiddlewareBuilder } from '@nestjs/core';
import { mockMiddlewareConsumer } from './__mocks__/middleware.consumer.mock';

describe('AuthModule', () => {

    let instance: AuthModule;

    beforeEach(() => {
        instance = new AuthModule();
    });

    it('Check we have an AuthModule class.', () => {
        expect(instance).toBeInstanceOf(AuthModule);
    });

    it('Check we can call configure on the AuthModule class.', () => {
        const configureSpy = jest.spyOn(instance, 'configure');
        instance.configure(mockMiddlewareConsumer);
        expect(configureSpy).toHaveBeenCalled();
    });
});