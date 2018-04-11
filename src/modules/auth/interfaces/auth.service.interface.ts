export interface AuthServiceInterface {
    createToken(user): object;

    validateUser(user): boolean;

    validateToken(token): boolean;

    signJWT(userEmail: string, secret: string, expiresIn: number): object;

    decodeJWT(token: string): object;
}