// src/tryout/tryout.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTryoutDto } from './dto/create.dto';

@Injectable()
export class TryoutService {
  constructor(private prisma: PrismaService) {}

  async getAllTryouts() {
    const data = await this.prisma.tryout.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    if (data.length === 0) {
      return {
        success: false,
        message: 'Data tryout tidak ditemukan',
      };
    }

    const result = data.map((tryout) => ({
      id: tryout.id,
      name: tryout.name,
      user_id: tryout.user_id,
      category: tryout.category,
      created_at: tryout.created_at,
      updated_at: tryout.updated_at,
      duration: tryout.duration,
      Author: tryout.user.name, // Renaming userName to Author
    }));

    return {
      success: true,
      message: 'Berhasil mendapatkan data tryout',
      data: result,
    };
  }

  async createTryout(dto: CreateTryoutDto, userId: string) {
    const data = await this.prisma.tryout.create({
      data: {
        name: dto.name,
        category: dto.category, // Harus sesuai dengan enum di schema
        duration: dto.duration,
        user_id: userId,
      },
    });
    return {
      success: true,
      message: 'Tryout berhasil dibuat',
      data: data.id,
    };
  }

  async getTryoutById(id: string) {
    const data = await this.prisma.tryout.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!data) {
      return {
        success: false,
        message: 'Data tryout tidak ditemukan',
      };
    }

    const result = {
      id: data.id,
      name: data.name,
      user_id: data.user_id,
      category: data.category,
      created_at: data.created_at,
      updated_at: data.updated_at,
      duration: data.duration,
      Author: data.user.name,
    };

    return {
      success: true,
      message: 'Berhasil mendapatkan data tryout',
      data: result,
    };
  }

  async getTryoutByMe(userId: string) {
    const data = await this.prisma.tryout.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    if (data.length === 0) {
      return {
        success: false,
        message: 'Data tryout tidak ditemukan',
      };
    }

    const result = data.map((tryout) => ({
      id: tryout.id,
      name: tryout.name,
      user_id: tryout.user_id,
      category: tryout.category,
      created_at: tryout.created_at,
      updated_at: tryout.updated_at,
      duration: tryout.duration,
      Author: tryout.user.name,
    }));

    return {
      success: true,
      message: 'Berhasil mendapatkan data tryout',
      data: result,
    };
  }
}
