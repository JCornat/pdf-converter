import { Application } from 'express';

import * as PDF from '../model/pdf';

export function init(app: Application): void {
  app.get('/api/convert', async (req: any, res: any, next: any) => {
    const html = req.query.html;
    const headerTemplate = req.query.headerTemplate;
    const footerTemplate = req.query.footerTemplate;
    const style = req.query.style;
    const format = req.query.format;
    const landscape = (req.query.landscape === 'true');
    const disableResetCSS = (req.query.disableResetCSS === 'true');
    const width = req.query.width;
    const height = req.query.height;
    const marginTop = req.query.marginTop;
    const marginLeft = req.query.marginLeft;
    const marginRight = req.query.marginRight;
    const marginBottom = req.query.marginBottom;
    const margin = {
      top: marginTop,
      left: marginLeft,
      right: marginRight,
      bottom: marginBottom,
    };

    const options = {
      content: html,
      headerTemplate,
      footerTemplate,
      style,
      format,
      landscape,
      disableResetCSS,
      width,
      height,
      margin,
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
    const headerTemplate = req.body.headerTemplate;
    const footerTemplate = req.body.footerTemplate;
    const style = req.body.style;
    const format = req.body.format;
    const landscape = (req.body.landscape === 'true');
    const disableResetCSS = (req.body.disableResetCSS === 'true');
    const width = req.body.width;
    const height = req.body.height;
    const marginTop = req.body.marginTop;
    const marginLeft = req.body.marginLeft;
    const marginRight = req.body.marginRight;
    const marginBottom = req.body.marginBottom;
    const margin = {
      top: marginTop,
      left: marginLeft,
      right: marginRight,
      bottom: marginBottom,
    };

    const options = {
      content: html,
      headerTemplate,
      footerTemplate,
      style,
      format,
      landscape,
      disableResetCSS,
      width,
      height,
      margin,
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
