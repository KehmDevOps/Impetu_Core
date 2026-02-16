import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../../services/roles/roles.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const expiresIn: string | undefined = configService.get<string>('jwt.expiresIn');
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: { expiresIn: expiresIn } as any,
        } as any;
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
