// src/auth/auth.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt.guard';
import { AuthRequest } from './interfaces/auth-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpDto) {
    await this.authService.signUp(dto);
    return {
      status: true,
      message: 'User berhasil terdaftar',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { token } = await this.authService.login(dto);

    // Set cookie dengan token JWT
    res.cookie('token', token, {
      httpOnly: true, // agar cookie tidak bisa diakses JS
      sameSite: 'strict',
      // secure: true, // aktifkan saat production (HTTPS)
    });

    return res.json({
      status: true,
      message: 'Login berhasil',
    });
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req: AuthRequest) {
    return {
      status: true,
      message: 'Data user berhasil diambil',
      data: req.user, // req.user sudah terdefinisi dari JwtStrategy
    };
  }
}
