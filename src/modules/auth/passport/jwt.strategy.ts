import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Component()
export class JwtStrategy extends Strategy {

  /**
   * @param authService
   */
  constructor(@Inject('AuthService') private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: process.env.JWT_SECRET || 'secret',
      },
      async (req, payload, next) => await this.verify(req, payload, next),
    );
    passport.use(this);
  }

  /**
   * @param req
   * @param payload
   * @param done
   */
  public async verify(req, payload, done) {
    const isValid = await this.authService.validateToken(payload);
    if (!isValid) {
      return done('Unauthorized', false);
    }
    return done(null, payload);
  }
}
