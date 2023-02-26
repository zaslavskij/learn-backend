// app/prisma/seed.ts
import { PrismaClient, CourceLesson } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  // await prisma.user.deleteMany({});

  const cources = await prisma.courcePart.findMany({});

  let id = 1;

  const courceLessons: CourceLesson[] = cources
    .map((c) => {
      const partsPerCource = getRandomIntInclusive(3, 8);
      const sentencesCount = getRandomIntInclusive(1, 8);

      return Array(partsPerCource)
        .fill(null)
        .map((p) => {
          id += 1;
          return {
            id: id,
            title: `${faker.name.jobTitle()} ${faker.name.jobArea()}`,
            lesson: faker.lorem.sentences(sentencesCount),
            courcePartId: c.id,
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
          };
        });
    })
    .flat();

  await prisma.courceLesson.createMany({ data: courceLessons });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
