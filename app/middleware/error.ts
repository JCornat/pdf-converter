import { Request, Response } from 'express';

export function handle(error: any, req: Request, res: Response, next: any): any {
  if (!isNaN(error)) {
    return res.sendStatus(error);
  }

  if (!isNaN(error.message)) {
    return res.sendStatus(error.message);
  }

  if (error.name === 'TokenExpiredError') {
    return res.sendStatus(401);
  }

  if (error.status) {
    return res.status(error.status).send(error.message);
  }

  res.status(500).send(error);
}
