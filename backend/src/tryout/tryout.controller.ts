import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TryoutService } from './tryout.service';
import { CreateTryoutDto } from './dto/create.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Request } from 'express';

@Controller('tryout')
@UseGuards(JwtAuthGuard)
export class TryoutController {
  constructor(private readonly tryoutService: TryoutService) {}

  @Post()
  async createTryout(@Body() dto: CreateTryoutDto, @Req() req: Request) {
    const user = req.user as { userId: string; email: string };
    const result = await this.tryoutService.createTryout(dto, user.userId);
    if (!result.success) {
      // Default error status 400 jika gagal
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Get()
  async getAllTryouts() {
    const result = await this.tryoutService.getAllTryouts();
    if (!result.success) {
      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get('me')
  async getTryoutsByMe(@Req() req: Request) {
    const user = req.user as { userId: string; email: string };
    const result = await this.tryoutService.getTryoutByMe(user.userId);
    if (!result.success) {
      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get(':id')
  async getTryoutById(@Param('id') id: string) {
    const result = await this.tryoutService.getTryoutById(id);
    if (!result.success) {
      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get('/all/:id')
  async getTryoutWithQuestionById(@Param('id') id: string) {
    const result = await this.tryoutService.getTryoutById(id);
    if (!result.success) {
      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  async updateTryout(
    @Param('id') id: string,
    @Body() dto: CreateTryoutDto,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: string; email: string };
    const result = await this.tryoutService.editTryOut(dto, id, user.userId);
    if (!result.success) {
      let statusCode = HttpStatus.BAD_REQUEST;
      if (result.message.includes('tidak ditemukan')) {
        statusCode = HttpStatus.NOT_FOUND;
      } else if (result.message.includes('izin')) {
        statusCode = HttpStatus.FORBIDDEN;
      }
      throw new HttpException(result, statusCode);
    }
    return result;
  }

  @Delete(':id')
  async deleteTryout(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { userId: string; email: string };
    const result = await this.tryoutService.deleteTryOut(id, user.userId);
    if (!result.success) {
      let statusCode = HttpStatus.BAD_REQUEST;
      if (result.message.includes('tidak ditemukan')) {
        statusCode = HttpStatus.NOT_FOUND;
      } else if (result.message.includes('izin')) {
        statusCode = HttpStatus.FORBIDDEN;
      }
      throw new HttpException(result, statusCode);
    }
    return result;
  }
}
