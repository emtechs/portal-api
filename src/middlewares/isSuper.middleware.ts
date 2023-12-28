import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'

export const verifyIsSuper = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.is_super) return next()

  throw new AppError('Missing permissions', 401)
}
