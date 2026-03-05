// import { seedUsers } from './user.seeder'
import prisma from '../../src/config/db.config'
import { seedRoles } from './role.seeder'

const main = async () => {
  try {
    console.log('Seeding started...')
    await seedRoles()
    console.log('Seeding completed!')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
