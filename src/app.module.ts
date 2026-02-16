import { Module } from '@nestjs/common';
import { EnvConfiguration } from './environments/.env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './services/roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SystemConstants } from './constants/system.constants';
import { CatalogModule } from './controllers/catalog/catalog.module';
import { UsersModule } from './controllers/users/users.module';
import { AuthModule } from './controllers/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [EnvConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      name: SystemConstants.IMPETU_DB,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('impetu_database.host');
        const port = configService.get<number>('impetu_database.port');
        const database = configService.get<string>('impetu_database.database');
        const username = configService.get<string>('impetu_database.user');
        const password = configService.get<string>('impetu_database.password');

        if (!host) {
          throw new Error('Database server (host) is not configured correctly. Please check your DATABASE_IMPETU environment variable.');
        }

        console.log(`Connecting to SQL Server: ${host}:${port} / Database: ${database}`);

        return {
          type: 'mssql' as const,
          host: host,
          port: port,
          database: database,
          username: username,
          password: password,
          synchronize: false,
          autoLoadEntities: true,
          options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
          },
        };
      },
    }),
    RolesModule,
    CatalogModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
