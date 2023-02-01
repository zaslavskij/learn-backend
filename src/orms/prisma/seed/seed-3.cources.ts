// app/prisma/seed.ts
import { PrismaClient, Cource } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany({});

  const amountOfCources = 40;

  const cources: Cource[] = [];

  for (let i = 1; i < amountOfCources; i++) {
    const title = faker.name.jobTitle();

    const cource: Cource = {
      id: i,
      title: title,
      description: faker.lorem.sentences(4),
      ownerId: 2,
      isDeleted: i % 2 === 0,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    cources.push(cource);
  }

  const addUsers = async () =>
    await prisma.cource.createMany({ data: cources });

  addUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
