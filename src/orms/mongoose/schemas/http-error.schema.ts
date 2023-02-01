import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HttpErrDocument = HydratedDocument<HttpErr>;

@Schema()
export class ErrReq {
  @Prop()
  method: string;

  @Prop({ type: Object, required: false })
  body?: unknown;

  @Prop()
  ip: string;

  @Prop({ type: Date })
  serverDate: Date;

  @Prop()
  originalUrl: string;
}

@Schema()
export class ErrRes {
  @Prop()
  statusCode: number;

  @Prop()
  statusMessage: string;
}

@Schema()
export class HttpErr {
  @Prop({ type: ErrReq, required: true })
  request: ErrReq;

  @Prop({ type: ErrRes, required: true })
  response: ErrRes;
}

export const HttpErrSchema = SchemaFactory.createForClass(HttpErr);
