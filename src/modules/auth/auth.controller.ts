import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { Controller, Post, HttpStatus, HttpCode, HttpException, Get, Body, Inject } from '@nestjs/common';

@Controller('auth')
export class AuthController {

  /**
   * @param authService
   */
  constructor(@Inject('AuthService') private readonly authService: AuthService) {}

  /**
   * @param AuthUserDto
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body() AuthUserDto: AuthUserDto): Promise<object> {
    if (this.authService.validateUser(AuthUserDto)) {
      return this.authService.createToken(AuthUserDto);
    } else {
      throw new HttpException('Un-Authorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
