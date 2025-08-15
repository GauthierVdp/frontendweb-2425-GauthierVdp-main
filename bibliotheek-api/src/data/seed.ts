import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../core/password'; 
import Role from '../core/roles'; 

const prisma = new PrismaClient();

export async function seedDatabase() {
  await prisma.borrowrecord.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.member.deleteMany({});
  await prisma.genre.deleteMany({});
  await prisma.author.deleteMany({});

  const passwordHash = await hashPassword('12345678');

  await prisma.author.createMany({
    data: [
      { name: 'J.K. Rowling' },
      { name: 'J.R.R. Tolkien' },
      { name: 'Frank Herbert' },
    ],
  });

  await prisma.genre.createMany({
    data: [
      { name: 'Fantasy' },
      { name: 'Science Fiction' },
    ],
  });

  const authors = await prisma.author.findMany();
  const genres = await prisma.genre.findMany();

  const jkRowling = authors.find((a) => a.name === 'J.K. Rowling');
  const tolkien = authors.find((a) => a.name === 'J.R.R. Tolkien');
  const herbert = authors.find((a) => a.name === 'Frank Herbert');

  const fantasy = genres.find((g) => g.name === 'Fantasy');
  const sciFi = genres.find((g) => g.name === 'Science Fiction');

  if (!jkRowling || !tolkien || !herbert || !fantasy || !sciFi) {
    throw new Error('Required authors or genres not found');
  }

  const members = [
    {
      name: 'Alice',
      email: 'alice@example.com',
      password_hash: passwordHash,
      roles: { set: [Role.ADMIN, Role.USER] },
    },
    {
      name: 'Bob',
      email: 'bob@example.com',
      password_hash: passwordHash,
      roles: { set: [Role.USER] },
    },
    {
      name: 'Admin',
      email: 'admin@example.com',
      password_hash: passwordHash,
      roles: { set: [Role.ADMIN] },
    },
    {
      name: 'UniqueUser',
      email: `unique${Date.now()}@example.com`,
      password_hash: passwordHash,
      roles: { set: [Role.USER] },
    },
  ];

  await prisma.member.createMany({
    data: members,
    skipDuplicates: true, 
  });


  const createdMembers = await prisma.member.findMany();

  const harryPotter = await prisma.book.create({
    data: {
      title: "Harry Potter and the Philosopher's Stone",
      author: {
        connect: [{ id: jkRowling.id }],
      },
      genre: {
        connect: [{ id: fantasy.id }],
      },
    },
  });

  const lotr = await prisma.book.create({
    data: {
      title: 'The Lord of the Rings',
      author: {
        connect: [{ id: tolkien.id }],
      },
      genre: {
        connect: [{ id: fantasy.id }],
      },
    },
  });

  const dune = await prisma.book.create({
    data: {
      title: 'Dune',
      author: {
        connect: [{ id: herbert.id }],
      },
      genre: {
        connect: [{ id: sciFi.id }],
      },
    },
  });

  const alice = createdMembers.find((m) => m.email === 'alice@example.com');
  const bob = createdMembers.find((m) => m.email === 'bob@example.com');
  const admin = createdMembers.find((m) => m.email === 'admin@example.com');

  if (!alice || !bob || !admin) {
    throw new Error('Required members not found');
  }

  await prisma.borrowrecord.createMany({
    data: [
      {
        borrowDate: new Date(2024, 0, 10),
        returnDate: new Date(2024, 0, 20),
        bookId: harryPotter.id,
        memberId: alice.id,
      },
      {
        borrowDate: new Date(2024, 1, 5),
        returnDate: null, 
        bookId: lotr.id,
        memberId: alice.id,
      },
      {
        borrowDate: new Date(2024, 1, 15),
        returnDate: new Date(2024, 2, 1),
        bookId: dune.id,
        memberId: bob.id,
      },
      {
        borrowDate: new Date(2024, 2, 10),
        returnDate: null,
        bookId: harryPotter.id,
        memberId: admin.id,
      },
    ],
  });

  console.log('Seeding completed successfully!');
}

seedDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });