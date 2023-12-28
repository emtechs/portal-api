import { hashSync } from 'bcryptjs'
import { prisma } from '../../lib'
import { IRequestUser, IUserRequest } from '../../interfaces'
import { AppError } from '../../errors'
import { UserReturnSchema } from '../../schemas'
import { updateUserService } from './updateUser.service'

export const createUserService = async (
  { login, name, password, cpf, is_super, is_worker }: IUserRequest,
  reqUser: IRequestUser,
) => {
  const userData = await prisma.user.findUnique({
    where: { login },
  })

  if (userData) throw new AppError('user already exists', 409)

  password = password || login.slice(0, 6)
  password = hashSync(password, 10)

  if (is_super !== undefined || is_worker !== undefined) {
    if (reqUser) {
      if (!reqUser.is_super) throw new AppError('Missing permissions', 401)

      const user = await prisma.user.create({
        data: {
          login,
          name,
          password,
          cpf,
        },
      })

      return await updateUserService(user.id, { is_super, is_worker }, reqUser)
    }
  }

  const user = await prisma.user.create({
    data: {
      login,
      name,
      password,
      cpf,
    },
  })

  return UserReturnSchema.parse(user)
}
