import { IReq, LoggerService, IRes } from './../modules/logger/logger.service';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LogsMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl, body, ip } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

      const serverDate = new Date();

      const req: IReq = { method, originalUrl, body, ip, serverDate };
      const res: IRes = { statusCode, statusMessage };

      if (statusCode >= 500) {
        this.loggerService.addReport(req, res);
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        this.loggerService.addReport(req, res);
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}

export default LogsMiddleware;
