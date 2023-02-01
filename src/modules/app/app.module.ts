import { LoggerModule } from './../logger/logger.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import LogsMiddleware from '@/middleware/logs.middleware';
import { getMongoConfig } from '@/orms/mongoose/mongo.config';
import { ManagementModule } from '../management/management.module';
import { CourcesModule } from '../cources/cources.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),

    UserModule,
    AuthModule,
    LoggerModule,
    ManagementModule,
    CourcesModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
