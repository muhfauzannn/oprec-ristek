import { Module } from '@nestjs/common';
import { TryoutService } from './tryout.service';
import { TryoutController } from './tryout.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TryoutService, PrismaService, AuthService, JwtService],
  controllers: [TryoutController],
})
export class TryoutModule {}
