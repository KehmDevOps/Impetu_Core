import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginRequest } from '../../dtos/requests/login.request';
import { LoginResponseI } from '../../interfaces/login.interface';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { Auth } from '../../decorators/auth.decorator';
import type { JwtPayloadI } from '../../interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: LoginRequest, @Req() req: Request): Promise<LoginResponseI> {
    return this.authService.login(req['user']);
  }

  @Get('check-auth-status')
  @Auth()
  public async checkAuthStatus(@CurrentUser() user: JwtPayloadI) {
    return await this.authService.checkAuthStatus(user);
  }
}
