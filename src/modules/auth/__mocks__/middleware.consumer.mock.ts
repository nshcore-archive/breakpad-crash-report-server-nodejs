export const mockMiddlewareConsumer = jest.fn().mockImplementation(() => {
  return {
      apply: jest.fn(),
      forRoutes: jest.fn(),
    };
});
