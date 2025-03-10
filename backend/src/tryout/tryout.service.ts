// src/tryout/tryout.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTryoutDto } from './dto/create.dto';

@Injectable()
export class TryoutService {
  constructor(private prisma: PrismaService) {}

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

  async getTryOutAndQuestions(id: string) {
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
  async getTryoutById(id: string) {
    const data = await this.prisma.tryout.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true },
        },
        questions: {
          select: {
            id: true,
            question_desc: true,
            type: true,
            // Jangan kirimkan correct_answer
            choices: {
              select: {
                id: true,
                choices: true,
                // Jangan kirimkan is_correct
              },
            },
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

    // Susun hasil akhir (dengan properti Author, dll)
    const result = {
      id: data.id,
      name: data.name,
      user_id: data.user_id,
      category: data.category,
      created_at: data.created_at,
      updated_at: data.updated_at,
      duration: data.duration,
      Author: data.user.name,
      questions: data.questions, // Hanya berisi question_desc, type, dan choices tanpa sensitive field
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

  async editTryOut(dto: CreateTryoutDto, id: string, userId: string) {
    const data = await this.prisma.tryout.findUnique({
      where: { id: id },
    });
    if (!data) {
      return {
        success: false,
        message: 'Data tryout tidak ditemukan',
      };
    }

    if (data.user_id !== userId) {
      return {
        success: false,
        message: 'Anda tidak memiliki akses untuk mengedit tryout ini',
      };
    }

    const query = await this.prisma.tryout.update({
      where: { id: id },
      data: {
        name: dto.name,
        category: dto.category,
        duration: dto.duration,
      },
    });

    return {
      success: true,
      message: 'Data tryout berhasil diubah',
      data: query,
    };
  }

  async deleteTryOut(id: string, userId: string) {
    // Cari tryout berdasarkan id
    const tryout = await this.prisma.tryout.findUnique({
      where: { id },
    });

    if (!tryout) {
      return {
        success: false,
        message: 'Data tryout tidak ditemukan',
      };
    }

    // Pastikan tryout dimiliki oleh user yang melakukan request
    if (tryout.user_id !== userId) {
      return {
        success: false,
        message: 'Anda tidak memiliki izin untuk menghapus tryout ini',
      };
    }

    // Hapus tryout beserta data terkait dalam sebuah transaksi
    const deletedTryout = await this.prisma.$transaction(async (prisma) => {
      // Ambil semua pertanyaan yang terkait dengan tryout ini
      const questions = await prisma.question.findMany({
        where: { tryout_id: id },
        select: { id: true },
      });

      const questionIds = questions.map((q) => q.id);

      // Jika ada pertanyaan, hapus terlebih dahulu choices dan user_answer yang terkait
      if (questionIds.length > 0) {
        await prisma.choices.deleteMany({
          where: {
            question_id: { in: questionIds },
          },
        });
        await prisma.user_answer.deleteMany({
          where: {
            question_id: { in: questionIds },
          },
        });
      }

      // Hapus pertanyaan
      await prisma.question.deleteMany({
        where: { tryout_id: id },
      });

      // Hapus tryout_attempt yang terkait dengan tryout ini
      await prisma.tryout_attempt.deleteMany({
        where: { tryout_id: id },
      });

      // Hapus tryout itu sendiri
      const result = await prisma.tryout.delete({
        where: { id },
      });

      return result;
    });

    return {
      success: true,
      message: 'Tryout berhasil dihapus',
      data: deletedTryout,
    };
  }
}
