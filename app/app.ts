import * as express from 'express';

import { MODE, PORT } from './config/config';

import * as AssetMiddleware from './middleware/asset';
import * as CronMiddleware from './middleware/cron';
import * as ErrorMiddleware from './middleware/error';
import * as LogMiddleware from './middleware/log';
import * as PostMiddleware from './middleware/post';
import * as SecurityMiddleware from './middleware/security';

import * as PDFController from './controller/pdf';

export let app = express();

init();

async function init() {
  try {
    SecurityMiddleware.init(app);
    PostMiddleware.init(app);
    AssetMiddleware.init(app);
    LogMiddleware.init();
  } catch (error) {
    console.error('Middlewares init fail', error);
  }

  try {
    PDFController.init(app);
  } catch (error) {
    console.error('Controllers init fail', error);
  }

  try {
    CronMiddleware.init();
  } catch (error) {
    console.error('CRON init fail', error);
  }

  try {
    ErrorMiddleware.init(app);
  } catch (error) {
    console.error('Middlewares init fail', error);
  }

  app.listen(PORT);
  console.log(`Server running in ${MODE} mode on port ${PORT} on address ${URL}`);
  app.emit('initialized');
}
