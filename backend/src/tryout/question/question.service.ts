import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertTryOut } from './dto/insert.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async createQuestion(id: string, userID: string, dto: InsertTryOut) {
    // Perbaiki pengecekan kepemilikan tryout dengan mencocokkan id tryout dan user_id
    const tryout = await this.prisma.tryout.findFirst({
      where: {
        id: id,
        user_id: userID,
      },
    });
    if (!tryout) {
      return {
        success: false,
        message:
          'Anda tidak memiliki izin untuk membuat soal atau tryout tidak ditemukan',
      };
    }

    for (const question of dto.question) {
      const createdQuestion = await this.prisma.question.create({
        data: {
          tryout_id: id,
          question_desc: question.question_desc,
          type: question.type,
          correct_answer: question.correct_answer,
        },
      });
      const questionID = createdQuestion.id;
      for (const choice of question.choices) {
        await this.prisma.choices.create({
          data: {
            question_id: questionID,
            choices: choice.choices,
            is_correct: choice.is_correct,
          },
        });
      }
    }
    return {
      success: true,
      message: 'Question berhasil dibuat',
    };
  }
}
