import { Router } from 'express'
import {
  validateSchemaMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  createSessionController,
  refreshSessionController,
  sendEmailToRecovery,
  updatePasswordController,
  verifyPasswordController,
} from '../controllers'
import {
  PasswordUpdateSchema,
  RecoveryPasswordSchema,
  SessionSchema,
} from '../schemas'

export const sessionRouter = Router()

sessionRouter.post(
  '',
  validateSchemaMiddleware(SessionSchema),
  createSessionController,
)

export const tokenRouter = Router()

tokenRouter.post('', verifyUserIsAuthenticated, refreshSessionController)

export const passwordRouter = Router()

passwordRouter.post(
  '',
  validateSchemaMiddleware(RecoveryPasswordSchema),
  sendEmailToRecovery,
)

passwordRouter.post(
  '/:userId/:token',
  validateSchemaMiddleware(PasswordUpdateSchema),
  updatePasswordController,
)

passwordRouter.post(
  '/verify',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(PasswordUpdateSchema),
  verifyPasswordController,
)
