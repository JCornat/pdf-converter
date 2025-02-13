import { Request, Response, Router } from 'express';

import * as PDF from '../model/pdf';

export const router = Router();

router.get('/api/convert', async (req: Request, res: Response, next: any) => {
  const html = req.query.html as string;
  const headerTemplate = req.query.headerTemplate as string;
  const footerTemplate = req.query.footerTemplate as string;
  const style = req.query.style as string;
  const format = req.query.format as string;
  const landscape = (req.query.landscape as string === 'true');
  const width = req.query.width as string;
  const height = req.query.height as string;
  const filename = req.query.filename as string;
  const marginTop = req.query.marginTop as string;
  const marginLeft = req.query.marginLeft as string;
  const marginRight = req.query.marginRight as string;
  const marginBottom = req.query.marginBottom as string;
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
    width,
    height,
    margin,
    filename,
  };

  try {
    const data = await PDF.convertHtmlContentToPDF(options);
    res.send(data);
  } catch (error) {
    return next(error);
  }
});

router.post('/api/convert', async (req: Request, res: Response, next: any) => {
  const html = req.body.html;
  const headerTemplate = req.body.headerTemplate;
  const footerTemplate = req.body.footerTemplate;
  const style = req.body.style;
  const format = req.body.format;
  const landscape = (req.body.landscape === 'true');
  const width = req.body.width;
  const height = req.body.height;
  const filename = req.body.filename;
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
    width,
    height,
    margin,
    filename,
  };

  try {
    const data = await PDF.convertHtmlContentToPDF(options);
    res.send(data);
  } catch (error) {
    return next(error);
  }
});
