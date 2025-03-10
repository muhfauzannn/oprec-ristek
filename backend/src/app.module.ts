// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TryoutModule } from './tryout/tryout.module';

@Module({
  imports: [AuthModule, TryoutModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
