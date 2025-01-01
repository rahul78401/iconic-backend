import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from './hash.service';
import { TokensService } from './tokens.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { AppConfigModule } from 'src/lib/config/config.module';
import { AppConfigService } from 'src/lib/config/config.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    AppConfigModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        global: true,
        signOptions: {
          algorithm: 'RS256',
          expiresIn: configService.accessTokenSecretExpire,
        },
        privateKey: configService.jwtPrivateKey,
        publicKey: configService.jwtPublicKey,
        verifyOptions: {
          complete: false,
        },
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokensService, JwtStrategy, HashService],
})
export class AuthModule {}
