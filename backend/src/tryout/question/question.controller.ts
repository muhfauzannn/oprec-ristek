import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { QuestionService } from './question.service';
import { InsertTryOut } from './dto/insert.dto';

@Controller('question')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post(':id')
  async insertTryOut(
    @Param('id') id: string,
    @Body() dto: InsertTryOut,
    @Req() req: Request,
  ) {
    // Karena req.user tidak ada pada tipe Request bawaan, kita lakukan cast
    const user = req.user as { userId: string; email: string };
    const result = await this.questionService.createQuestion(
      id,
      user.userId,
      dto,
    );
    if (!result.success) {
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
