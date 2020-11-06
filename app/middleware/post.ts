import * as express from 'express';
import { Application } from 'express';

export function init(app: Application): void {
  app.use(express.urlencoded({limit: '2mb', extended: true}));
  app.use(express.json({limit: '2mb'}));
}
