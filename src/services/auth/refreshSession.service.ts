import jwt from 'jsonwebtoken'
import { env } from '../../env'
import { IRequestUser } from '../../interfaces'

export const refreshSessionService = ({
  id,
  is_super,
  is_worker,
}: IRequestUser) => {
  const token = jwt.sign({ is_super, is_worker }, env.SECRET_KEY, {
    subject: id,
    expiresIn: '15m',
  })

  const refresh_token = jwt.sign({}, env.SECRET_KEY, {
    subject: id,
    expiresIn: '24h',
  })

  return { token, refresh_token }
}
