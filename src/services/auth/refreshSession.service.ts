import jwt from 'jsonwebtoken'
import { env } from '../../env'

export const refreshSessionService = (id: string) => {
  const token = jwt.sign({}, env.SECRET_KEY, {
    subject: id,
    expiresIn: '15m',
  })

  const refresh_token = jwt.sign({}, env.SECRET_KEY, {
    subject: id,
    expiresIn: '24h',
  })

  return { token, refresh_token }
}
