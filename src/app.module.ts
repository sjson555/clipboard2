// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClipboardController } from './clipboard/clipboard.controller';
import { ClipboardService } from './clipboard/clipboard.service';
import { Clipboard } from './clipboard/clipboard.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'clipboard',
      entities: [Clipboard],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Clipboard]),
  ],
  controllers: [ClipboardController],
  providers: [ClipboardService],
})
export class AppModule {}
