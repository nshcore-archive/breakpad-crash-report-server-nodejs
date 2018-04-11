export const mockAuthService = jest.fn().mockImplementation(() => {
  return {
      createToken: jest.fn(),
      validateUser: jest.fn(),
      validateToken: jest.fn(),
      signJWT: jest.fn(),
      decodeJWT: jest.fn(),
    };
});
