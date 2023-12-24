import { hashSync } from 'bcryptjs'
import { prisma } from '../../lib'
import { IUserRequest } from '../../interfaces'
import { AppError } from '../../errors'
import { UserReturnSchema } from '../../schemas'

export const createUserService = async ({
  login,
  name,
  password,
  cpf,
}: IUserRequest) => {
  const userData = await prisma.user.findUnique({
    where: { login },
  })

  if (userData) throw new AppError('user already exists', 409)

  password = hashSync(password, 10)

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
