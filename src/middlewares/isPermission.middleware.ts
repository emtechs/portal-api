import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'

export const verifyIsPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.query.is_permission) return next()

  throw new AppError('Missing permissions', 401)
}
