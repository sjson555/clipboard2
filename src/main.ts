import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // bodyParser 미들웨어의 limit 옵션 설정
  app.use(bodyParser.json({ limit: '10mb' }));
  await app.listen(3000);
}
bootstrap();
