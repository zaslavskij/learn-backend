import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserRoleCreateInput[] = [
  {
    role: 'ADMIN',
  },
  {
    role: 'USER',
  },
  {
    role: 'GHOST',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const userRole = await prisma.userRole.create({
      data: u,
    });
    console.log(`Created user with id: ${userRole.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
