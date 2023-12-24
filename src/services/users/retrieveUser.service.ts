import { prisma } from '../../lib'
import { UserReturnSchema } from '../../schemas'

export const retrieveUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { profile: { select: { url: true } } },
  })

  return UserReturnSchema.parse(user)
}
