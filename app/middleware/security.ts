import * as cors from 'cors';
import * as helmet from 'helmet';
import { Application } from 'express';

export function init(app: Application): void {
  app.use(cors({}));
  app.use(helmet());
  app.set('x-powered-by', false);
}
