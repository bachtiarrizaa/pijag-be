// import prisma from '../../src/config/db.config'
// import bcrypt from 'bcryptjs'

// export const seedUsers = async () => {
//   const hashedPassword = await bcrypt.hash('password123', 10)

//   const userData = [
//     {
//       name: 'Super Admin',
//       email: 'admin@example.com',
//       phone: '081234567890',
//       password: hashedPassword,
//     },
//     {
//       name: 'Cashier',
//       email: 'cashier@example.com',
//       phone: '081234567891',
//       password: hashedPassword,
//     },
//     {
//       name: 'Customer',
//       email: 'customer@example.com',
//       phone: '081234567892',
//       password: hashedPassword,
//     },
//   ]

//   for (const user of userData) {
//     await prisma.user.upsert({
//       where: { email: user.email },
//       update: { name: user.name, phoneNumber: user.phone },
//       create: user,
//     })
//   }

//   console.log(`Seeding ${userData.length} users`)
// }
