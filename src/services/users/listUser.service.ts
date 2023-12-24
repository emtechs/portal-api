import { IUserQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { UserArraySchema } from '../../schemas'

export const listUserService = async (
  { is_active, take, skip, name }: IUserQuery,
  id: string,
) => {
  if (take) take = +take
  if (skip) skip = +skip

  let where = {}

  if (name) where = { ...where, name: { contains: name, mode: 'insensitive' } }

  if (is_active) {
    switch (is_active) {
      case 'true':
        where = { ...where, is_active: true }
        break

      case 'false':
        where = { ...where, is_active: false }
        break
    }
  }

  where = { ...where, NOT: { id } }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      take,
      skip,
      where,
      orderBy: { name: 'asc' },
      include: { profile: { select: { url: true } } },
    }),
    prisma.user.count({
      where,
    }),
  ])

  return {
    total,
    result: UserArraySchema.parse(users),
  }
}
