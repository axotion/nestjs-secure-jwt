import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ShowFingerPrintAction } from './transport/http/v1/action/show-fingerprint/show-figerprint.action';
import { SignInAction } from './transport/http/v1/action/sign-in/sign-in.action';
import { JwtStrategy } from './transport/http/v1/strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
  controllers: [SignInAction, ShowFingerPrintAction],
  providers: [JwtStrategy],
})
export class AppModule {}
