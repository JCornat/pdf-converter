import * as express from 'express';
import * as http from 'http';

import { MODE, PORT, URL } from './config/config';

import * as AssetMiddleware from './middleware/asset';
import * as CronMiddleware from './middleware/cron';
import * as ErrorMiddleware from './middleware/error';
import * as LogMiddleware from './middleware/log';
import * as PostMiddleware from './middleware/post';
import * as SecurityMiddleware from './middleware/security';

import * as PDFController from './controller/pdf';
import * as NotFoundController from './controller/not-found';

export let app = express();
const server = http.createServer(app);

init();

async function init() {
  app.use(SecurityMiddleware.app);
  app.use(PostMiddleware.app);
  app.use(AssetMiddleware.app);
  LogMiddleware.init();

  CronMiddleware.init();

  app.use(PDFController.router);
  app.use(NotFoundController.router);

  app.use(ErrorMiddleware.handle);

  app.listen(PORT);
  server.listen(PORT);
  console.log(`Server running in ${MODE} mode on port ${PORT} on address ${URL}`);
  app.emit('initialized');
}
