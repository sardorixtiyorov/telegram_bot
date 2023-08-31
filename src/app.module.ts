import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/models/user.model';
import { Location } from './location/models/location.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Location],
      autoLoadModels: true,
      logging: false,
    }),
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
    }),
    UserModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
