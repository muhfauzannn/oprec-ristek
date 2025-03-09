import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { comparePasswords, hashPassword } from 'src/common/utils/bcrypt.utils';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar');
    }
    const hashed = await hashPassword(dto.password);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
      },
    });
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email tidak ditemukan');
    }

    const isMatch = await comparePasswords(dto.password, user.password || '');
    if (!isMatch) {
      throw new UnauthorizedException('Password salah');
    }

    // Membuat payload JWT
    const payload = { sub: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user,
    };
  }

  verifyToken(token: string): { sub: string; email: string } {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Token tidak valid');
    }
  }
}
