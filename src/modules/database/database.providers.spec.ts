import { Test } from '@nestjs/testing';
import { databaseProviders } from './database.providers';
import { databaseProvidersMock } from './__mocks__/database.providers';

describe('databaseProviders', () => {

    it('matches even if received contains additional elements', () => {
        expect(JSON.stringify(databaseProviders)).toBe(JSON.stringify(databaseProvidersMock));
    });
});