import {
  HttpErr,
  HttpErrDocument,
} from '@/orms/mongoose/schemas/http-error.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface IReq {
  method: string;
  body?: unknown;
  serverDate: Date;
  ip: string;
  originalUrl: string;
}

export interface IRes {
  statusCode: number;
  statusMessage: string;
}

@Injectable()
export class LoggerService {
  constructor(
    @InjectModel(HttpErr.name)
    private httpErrorModel: Model<HttpErrDocument>,
  ) {}

  private readonly maxStoreLength = 5;

  private lastPublishTime: number | null = null;

  private store: { request: IReq; response: IRes }[] = [];

  public async addReport(request: IReq, response: IRes): Promise<void> {
    const currentTimestamp = +new Date();

    const isMaxBufferLength = this.store.length === this.maxStoreLength;
    const isFirtsLogMessage = !this.lastPublishTime;
    const timeOutEnought =
      !!this.lastPublishTime &&
      currentTimestamp - this.lastPublishTime >= 50000;

    if (
      isMaxBufferLength ||
      isFirtsLogMessage ||
      timeOutEnought ||
      response.statusCode >= 500
    ) {
      await this.httpErrorModel.insertMany(this.store);
      this.store = [];
      this.lastPublishTime = currentTimestamp;
    }
    this.store.push({ request, response });
  }
}
