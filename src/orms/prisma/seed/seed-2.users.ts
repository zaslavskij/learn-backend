// app/prisma/seed.ts
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany({});

  const salt = 10;

  function encodePassword(password: string): string {
    return bcrypt.hashSync(password, salt);
  }
  const amountOfUsers = 50;

  const users: User[] = [];

  for (let i = 2; i < amountOfUsers; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const user: User = {
      id: i,
      email: faker.internet.email(firstName, lastName),
      roleId: 1,
      password: encodePassword(`sanya${i}`),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    users.push(user);
  }

  const addUsers = async () => await prisma.user.createMany({ data: users });

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
