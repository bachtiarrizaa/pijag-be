import prisma from '../../src/config/db.config'

const roleData = [{ name: 'admin' }, { name: 'cashier' }, { name: 'customer' }]

export const seedRoles = async () => {
  for (const role of roleData) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    })
  }

  console.log(`Seeding ${roleData.length} roles`)
}
