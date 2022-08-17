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
<<<<<<< HEAD
  console.log('app on localhost:' + PORT);
=======
  console.log('app on http://localhost:' + PORT);
>>>>>>> 2247badefe4cf25d48a71db0f813e99262f41c14
}
bootstrap();
