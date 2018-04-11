export const mockCrashReportRepository = jest.fn().mockImplementation(() => {
  return {
    find: jest.fn(),
    save: jest.fn(),
    findOneById: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  };
});
