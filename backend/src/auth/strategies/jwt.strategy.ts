// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

interface RequestWithCookies extends Request {
  cookies: Record<string, string>; // Properti cookies
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: RequestWithCookies) => {
          // Validasi sederhana
          if (!req?.cookies) return null;
          // Ambil token dari cookie 'token'
          const token: string | null = req.cookies['token'];
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'myFallbackSecret',
    });
  }

  validate(payload: { sub: string; email: string }) {
    if (!payload) {
      throw new UnauthorizedException('Invalid JWT');
    }
    // Payload akan tersedia di req.user
    return { userId: payload.sub, email: payload.email };
  }
}
