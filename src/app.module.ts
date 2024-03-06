import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClipboardController } from './clipboard/clipboard.controller';
import { ClipboardService } from './clipboard/clipboard.service';
import { Clipboard } from './clipboard/clipboard.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Clipboard],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Clipboard]),
  ],
  controllers: [ClipboardController],
  providers: [ClipboardService],
})
export class AppModule {}
