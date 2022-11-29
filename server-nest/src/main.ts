if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const PORT = process.env.PORT || 5000;

  await app.listen(PORT);
  console.log('app on http://localhost:' + PORT);
}
bootstrap();
