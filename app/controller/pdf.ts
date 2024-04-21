import { Hono } from 'hono';
import { Context } from 'hono/context.ts';
import { Pdf } from '@model/pdf.ts';

export namespace PdfController {
  export const router = new Hono();

  router.get('/convert', async (context: Context) => {
    const options = Pdf.formatOptions(context.req.query());
    const data = await Pdf.convertHtmlContent(options);
    return context.json(data);
  });

  router.post('/convert', async (context: Context) => {
    const options = Pdf.formatOptions(context.req.json());
    const data = await Pdf.convertHtmlContent(options);
    return context.json(data);
  });
}
