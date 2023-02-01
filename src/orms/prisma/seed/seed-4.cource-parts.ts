// app/prisma/seed.ts
import { PrismaClient, CourcePart } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  // await prisma.user.deleteMany({});

  const cources = await prisma.cource.findMany({});

  let id = 1;

  const courceParts: CourcePart[] = cources
    .map((c) => {
      const partsPerCource = getRandomIntInclusive(1, 8);

      return Array(partsPerCource)
        .fill(null)
        .map((p) => {
          id += 1;
          return {
            id: id,
            title: `${faker.name.jobTitle()} ${faker.name.jobArea()}`,
            courceId: c.id,
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
          };
        });
    })
    .flat();

  await prisma.courcePart.createMany({ data: courceParts });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
