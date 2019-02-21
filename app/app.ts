import * as express from 'express';

import { MODE, PORT } from './config/config';

import * as AssetMiddleware from './middleware/asset';
import * as ErrorMiddleware from './middleware/error';
import * as LogMiddleware from './middleware/log';
import * as PostMiddleware from './middleware/post';
import * as SecurityMiddleware from './middleware/security';

import * as PDFController from './controller/pdf';
import * as TestController from './controller/test';

import * as TestModel from './model/test';

export let app = express();

init();

async function init() {
  // Middlewares
  try {
    SecurityMiddleware.init(app);
    PostMiddleware.init(app);
    AssetMiddleware.init(app);
    LogMiddleware.init();
  } catch (error) {
    console.error('Middlewares init fail', error);
  }

  // Controllers
  try {
    PDFController.init(app);
    TestController.init(app);
  } catch (error) {
    console.error('Controllers init fail', error);
  }

  try {
    ErrorMiddleware.init(app);
    LogMiddleware.result(app);
  } catch (error) {
    console.error('Middlewares init fail', error);
  }

  // testPatient();
  TestModel.init();

  // Listening
  app.listen(PORT);
  console.log(`Server running in ${MODE} mode`);
}
