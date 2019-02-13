import { Application } from 'express';
import * as Log from 'node-logger-c7z';

export function init(): void {
  process.on('uncaughtException', (error) => {
    console.error('uncaughtException', error);
    Log.error('uncaughtException', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection', error);
    Log.error('unhandledRejection', error);
    process.exit(1);
  });
}

export function result(app: Application): void {
  app.use((req: any, res: any, next: any) => {
    try {
      next();
    } catch (error) {
      next(error);
    }
  });
}
