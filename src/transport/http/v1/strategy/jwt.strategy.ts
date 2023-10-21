import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getSHA512Hash } from '../../../../util/sha512.hash';

export const JWT_STRATEGY = 'JWT';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hard!to-guess_secret',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any): Promise<any> {
    const fingerprint = payload.fingerprint;

    const ip =
      request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    const userAgent = request.headers['user-agent'];
    const calculatedFingerprint = getSHA512Hash(`${ip}${userAgent}`);

    if (fingerprint !== calculatedFingerprint) {
      throw new BadRequestException('Invalid fingerprint');
    }

    return payload;
  }
}
