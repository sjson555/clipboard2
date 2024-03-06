import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClipboardController } from './clipboard/clipboard.controller';
import { ClipboardService } from './clipboard/clipboard.service';
import { Clipboard } from './clipboard/clipboard.entity';
import * as bodyParser from 'body-parser';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // bodyParser 미들웨어의 limit 옵션 설정
    consumer
      .apply(bodyParser.json({ limit: '10mb' })) // 최대 10MB까지 허용
      .forRoutes('*'); // 모든 라우트에 대해 적용
  }
}
