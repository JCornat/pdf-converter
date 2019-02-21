import { Application } from 'express';

import * as Test from '../model/test';

export function init(app: Application): void {
  app.get('/api/test', async (req: any, res: any, next: any) => {
    try {
      await Test.init();
      res.send({status: 200});
    } catch (error) {
      return next(error);
    }

    next();
  });
}
