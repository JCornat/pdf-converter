import { Application } from 'express';

import * as PDF from '../model/pdf';

export function init(app: Application): void {
  app.get('/api/convert', async (req: any, res: any, next: any) => {
    const html = req.query.html;
    const options = {
      content: html,
    };

    try {
      const data = await PDF.convertHtmlContentToPDF(options);
      res.send(data);
    } catch (error) {
      return next(error);
    }

    next();
  });

  app.post('/api/convert', async (req: any, res: any, next: any) => {
    const html = req.body.html;
    const options = {
      content: html,
    };

    try {
      const data = await PDF.convertHtmlContentToPDF(options);
      res.send(data);
    } catch (error) {
      return next(error);
    }

    next();
  });
}
