import { IRequestUser } from '../../interfaces'
import { prisma } from '../../lib'

export const profileUserService = async ({ id }: IRequestUser) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      is_first_access: true,
      profile: { select: { url: true } },
    },
  })

  return user
}
