import { Body, Controller, Post, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { getSHA512Hash } from '../../../../../util/sha512.hash';
import { SignInHttpRequest } from './request/sign-in.http-request';
import { SignInHttpResponse } from './response/sign-in.http-response';

@Controller('v1/sign-in')
export class SignInAction {
  constructor(private jwtService: JwtService) {}

  @Post()
  async handle(
    @Req() request: Request,
    @Body() body: SignInHttpRequest,
  ): Promise<SignInHttpResponse> {
    const ip =
      request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    const userAgent = request.headers['user-agent'];

    const token = this.jwtService.sign({
      email: body.email,
      fingerprint: getSHA512Hash(`${ip}${userAgent}`),
    });

    return {
      token,
    };
  }
}
