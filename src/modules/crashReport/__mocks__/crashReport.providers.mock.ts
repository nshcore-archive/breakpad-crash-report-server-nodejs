export const mockCrashReportProviders = [{
    provide: 'CrashReportRepositoryToken',
    useFactory: jest.fn(),
    inject: ['DbConnectionToken'],
}];