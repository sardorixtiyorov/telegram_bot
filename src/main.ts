import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () => {
      console.log(`Server works on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
