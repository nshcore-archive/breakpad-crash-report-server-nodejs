import { Test } from '@nestjs/testing';
import { DatabaseModule } from './database.module';

let instance: DatabaseModule;

beforeEach(() => {
    instance = new DatabaseModule();
});

it('Check we have a DatabaseModule class.', () => {
    expect(instance).toBeInstanceOf(DatabaseModule);
});
