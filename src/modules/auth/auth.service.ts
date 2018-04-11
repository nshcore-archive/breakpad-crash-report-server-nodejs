import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { TokenDto } from './dto/token.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { AuthServiceInterface } from './interfaces/auth.service.interface';

@Component()
export class AuthService implements AuthServiceInterface {

  /**
   * @param user
   */
  public createToken(user: CreateTokenDto): object {
    const expiresIn = 60 * 60, secretOrKey = process.env.JWT_SECRET;
    const token = this.signJWT(user.email, secretOrKey, expiresIn);
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  /**
   * @param user
   */
  public validateUser(user: AuthUserDto): boolean {
    if (process.env.AUTH_EMAIL === user.email && process.env.AUTH_PASS === user.password) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param token
   */
  public validateToken(token: TokenDto): boolean {
    if (process.env.AUTH_EMAIL === token.email) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param userEmail
   * @param secret
   * @param expiresIn
   */
  public signJWT(userEmail: string, secret: string, expiresIn: number): object {
    return jwt.sign({ email: userEmail }, secret, { expiresIn });
  }

  /**
   * @param token
   */
  public decodeJWT(token: string): object {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (JsonWebTokenError) {
      return { fail: true };
    }
  }
}