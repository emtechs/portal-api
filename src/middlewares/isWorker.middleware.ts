import { NextFunction, Request, Response } from 'express'
import { verifyIsSuper } from './isSuper.middleware'

export const verifyIsWorker = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.is_worker) return next()

  return verifyIsSuper(req, res, next)
}
