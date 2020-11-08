import { Request, Response, Router } from 'express';

export const router = Router();

router.use((req: Request, res: Response, next: any) => {
  try {
    res.sendStatus(404);
  } catch (error) {
    return next(error);
  }
});
