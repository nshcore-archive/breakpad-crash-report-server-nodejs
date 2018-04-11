import App from './app';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

describe('main app', async () => {

    jest.mock('./app');

    let instance: App;
    let bootStrappedApp: INestApplication;

    beforeEach(() => {
        instance = App.getInstance();
    });

    it('Check we have a App.', () => {
        expect(App.getInstance()).toBe(instance);
    });

    it('Check env config is loaded.', async () => {
        const spyidBoostrap = jest.spyOn(instance, 'bootstrap');
        const spyidGetConfig = jest.spyOn(instance, '_getAppConfig');
        const spyidshutDown = jest.spyOn(instance, 'shutDown');
        bootStrappedApp = await instance.bootstrap();
        expect(spyidBoostrap).toHaveBeenCalled();
        expect(spyidGetConfig).toHaveBeenCalled();
        await instance.shutDown();
        expect(spyidshutDown).toHaveBeenCalled();

    });
});
