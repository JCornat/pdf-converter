import * as express from 'express';
import { Application } from 'express';

export function init(app: Application): void {
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
}
