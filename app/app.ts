import { Hono } from 'hono';
import { Context } from 'hono/context.ts';
import { cors, serveStatic } from 'hono/middleware.ts';

import { Config } from '@config/config.ts';
import { CronMiddleware } from '@middleware/cron.ts';
import { PdfController } from '@controller/pdf.ts';

const app = new Hono();

CronMiddleware.init();

app.use('/api/*', cors({origin: ['http://localhost:4200']}))
app.use('/public/*', serveStatic({root: `./public`}));
app.use('/upload/*', serveStatic({root: `./public`}));
app.use('/www/*', serveStatic({root: `./www`}));
app.use('/assets/*', serveStatic({root: `./www`}));

app.route('/api', PdfController.router);

app.notFound((context: Context) => context.json({status: 404, message: 'Not Found'}, 404));

Deno.serve({port: Config.PORT}, app.fetch);
console.log(`Server running in ${Config.MODE} mode on port ${Config.PORT} on address ${Config.URL}`);
