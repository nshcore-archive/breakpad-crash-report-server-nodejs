export const mockCrashReportService = jest.fn().mockImplementation(() => {
    return {
        findAll: jest.fn(),
        save: jest.fn(),
        findOneById: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn(),
    };
});