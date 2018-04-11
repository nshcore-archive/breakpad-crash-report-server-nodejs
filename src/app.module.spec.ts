import { Test } from '@nestjs/testing';
import { ApplicationModule } from './app.module';

let instance: ApplicationModule;

beforeEach(() => {
    instance = new ApplicationModule();
});

it('Check we have a ApplicationModule.', () => {
    expect(instance).toBeInstanceOf(ApplicationModule);
});
