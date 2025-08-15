import { expect } from 'chai';
import request from 'supertest';
import createServer, { Server } from '../src/createServer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Book API', function () {
  let server: Server;
  let httpServer: any;
  let token: string;
  let createdBookId: number;
  let authorId: number;
  let genreId: number;
  const uniqueEmail = `booktest${Date.now()}@example.com`;

  before(async () => {
    server = await createServer();
    await server.start();
    httpServer = server.getApp().callback();

    await prisma.book.deleteMany({ where: { title: 'Test Book' } });
    await prisma.author.deleteMany({ where: { name: 'Test Author' } });
    await prisma.genre.deleteMany({ where: { name: 'Test Genre' } });

    const author = await prisma.author.create({ data: { name: 'Test Author' } });
    const genre = await prisma.genre.create({ data: { name: 'Test Genre' } });
    authorId = author.id;
    genreId = genre.id;

    await request(httpServer)
      .post('/api/sessions/register')
      .send({
        email: uniqueEmail,
        password: 'securepassword123',
        name: 'Book Test User'
      });

    const res = await request(httpServer)
      .post('/api/sessions')
      .send({
        email: uniqueEmail,
        password: 'securepassword123'
      });

    token = res.body.token;
  });

  after(async () => {
    await prisma.book.deleteMany({ where: { title: { contains: 'Test Book' } } });
    await prisma.author.deleteMany({ where: { name: 'Test Author' } });
    await prisma.genre.deleteMany({ where: { name: 'Test Genre' } });
    await prisma.$disconnect();
    if (server) await server.stop();
  });

  it('should create a new book', async () => {
    const res = await request(httpServer)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Book',
        authorIds: [authorId],
        genreIds: [genreId],
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.title).to.equal('Test Book');
    createdBookId = res.body.id;
  });

  it('should get all books', async () => {
    const res = await request(httpServer)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.items).to.be.an('array');
    const titles = res.body.items.map((b: any) => b.title);
    expect(titles).to.include('Test Book');
  });

  it('should get a book by id', async () => {
    const res = await request(httpServer)
      .get(`/api/books/${createdBookId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', createdBookId);
    expect(res.body.title).to.equal('Test Book');
  });

  it('should update a book', async () => {
    const res = await request(httpServer)
      .put(`/api/books/${createdBookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Test Book' });
    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('Updated Test Book');
    const updated = await prisma.book.findUnique({ where: { id: createdBookId } });
    expect(updated!.title).to.equal('Updated Test Book');
  });

  it('should delete a book', async () => {
    const res = await request(httpServer)
      .delete(`/api/books/${createdBookId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.include('deleted');
    const deleted = await prisma.book.findUnique({ where: { id: createdBookId } });
    expect(deleted).to.be.null;
  });
});