import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_STRATEGY } from '../../strategy/jwt.strategy';

@Controller('v1/fingerprint')
@UseGuards(AuthGuard(JWT_STRATEGY))
export class ShowFingerPrintAction {
  @Get()
  async handle(@Req() request) {
    return {
      fingerprint: request.user.fingerprint,
    };
  }
}
