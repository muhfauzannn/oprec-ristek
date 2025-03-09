// src/tryout/tryout.controller.ts
import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { TryoutService } from './tryout.service';
import { CreateTryoutDto } from './dto/create.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Request } from 'express';

@Controller('tryout')
@UseGuards(JwtAuthGuard)
export class TryoutController {
  constructor(private tryoutService: TryoutService) {}

  @Post()
  async createTryout(@Body() dto: CreateTryoutDto, @Req() req: Request) {
    // Ambil user_id dari req.user (di-set oleh JwtStrategy)
    const user = req.user as { userId: string; email: string };
    const userId = user.userId;
    return this.tryoutService.createTryout(dto, userId);
  }

  @Get()
  async getAllTryouts() {
    return this.tryoutService.getAllTryouts();
  }
  @Get('/me')
  async getTryoutByMe(@Req() req: Request) {
    const user = req.user as { userId: string; email: string };
    const userId = user.userId;
    return this.tryoutService.getTryoutByMe(userId);
  }

  @Get(':id')
  async getTryoutById(@Req() req: Request) {
    const id = req.params.id;
    return this.tryoutService.getTryoutById(id);
  }
}
