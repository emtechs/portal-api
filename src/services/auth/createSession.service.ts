import { compareSync } from 'bcryptjs'
import { AppError } from '../../errors'
import { ISessionRequest } from '../../interfaces'
import { prisma } from '../../lib'
import { refreshSessionService } from './refreshSession.service'

export const createSessionService = async ({
  login,
  password,
}: ISessionRequest): Promise<{
  token: string
  refresh_token: string
}> => {
  const user = await prisma.user.findUnique({
    where: { login },
  })

  if (!user) throw new AppError('Login or password invalid', 403)

  const passwordMatch = compareSync(password, user.password)
  if (!passwordMatch) throw new AppError('Login or password invalid', 403)

  if (!user.is_active)
    throw new AppError(
      'No active account found with the given credentials',
      401,
    )

  return refreshSessionService(user)
}
