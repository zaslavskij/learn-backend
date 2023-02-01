import {
  HttpErr,
  HttpErrSchema,
} from '@/orms/mongoose/schemas/http-error.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HttpErr.name, schema: HttpErrSchema }]),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
