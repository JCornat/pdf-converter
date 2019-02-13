import { Application } from 'express';
import * as Log from 'node-logger-c7z';

export function init(app: Application): void {
  app.use(async (error: any, req: any, res: any, next: any): Promise<any> => {
    Log.error(error);

    if (!isNaN(error)) {
      res.sendStatus(error);
      return next();
    }

    if (!isNaN(error.message)) {
      res.sendStatus(error.message);
      return next();
    }

    if (error.name === 'TokenExpiredError') {
      res.sendStatus(401);
      return next();
    }

    if (error.status) {
      res.status(error.status).send(error.message);
      return next();
    }

    res.status(500).send(error);
    return next();
  });
}
