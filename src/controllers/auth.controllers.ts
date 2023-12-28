import { Request, Response } from 'express'
import {
  updatePasswordService,
  sendEmailRecoveryService,
  createSessionService,
  verifyPasswordService,
  refreshSessionService,
} from '../services'

export const createSessionController = async (req: Request, res: Response) => {
  const token = await createSessionService(req.body)

  return res.status(201).json(token)
}

export const refreshSessionController = (req: Request, res: Response) => {
  const token = refreshSessionService(req.user)

  return res.status(201).json(token)
}

export const updatePasswordController = async (req: Request, res: Response) => {
  const user = await updatePasswordService(
    req.body,
    req.params.userId,
    req.params.token,
  )

  return res.status(200).json(user)
}

export const sendEmailToRecovery = async (req: Request, res: Response) => {
  const user = await sendEmailRecoveryService(req.body)

  return res.status(200).json(user)
}

export const verifyPasswordController = async (req: Request, res: Response) => {
  await verifyPasswordService(req.body, req.user.id)

  return res.json({})
}
