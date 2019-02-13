import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';

export function init(app: Application) {
  app.use('/public', express.static(path.join(__dirname, '..', 'public')));
}
