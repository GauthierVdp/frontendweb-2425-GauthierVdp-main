import { expect } from 'chai';
import request from 'supertest';
import createServer, { Server } from '../src/createServer';
import { prisma } from '../src/data';
import type * as Mocha from 'mocha';

describe('Author API', function (this: Mocha.Suite) {
  this.timeout(10000);

  let server: Server;
  let httpServer: any;
  let token: string;
  const uniqueEmail = `unique${Date.now()}@example.com`;

  before(async () => {
    server = await createServer();
    await server.start();
    httpServer = server.getApp().callback();

    await prisma.author.deleteMany({});
    await prisma.author.createMany({
      data: [
        { name: 'J.K. Rowling' },
        { name: 'J.R.R. Tolkien' },
        { name: 'Frank Herbert' },
      ],
    });

    await request(httpServer)
      .post('/api/sessions/register')
      .send({
        email: uniqueEmail,
        password: 'securepassword123',
        name: 'Test User'
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
    await server.stop();
    await prisma.author.deleteMany({});
  });

  describe('GET /authors', () => {
    it('should return all authors', async () => {
      const authorsInDb = await prisma.author.findMany();
      const res = await request(httpServer)
        .get('/api/authors')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.items).to.be.an('array');
      expect(res.body.items.length).to.equal(authorsInDb.length);
      const namesFromDb = authorsInDb.map(a => a.name).sort();
      const namesFromApi = res.body.items.map((a: any) => a.name).sort();
      expect(namesFromApi).to.deep.equal(namesFromDb);
    });
  });

  describe('GET /authors/:id', () => {
    it('should return a single author by id', async () => {
      const author = await prisma.author.findFirst({ where: { name: 'J.K. Rowling' } });
      expect(author).to.not.be.null;
      const res = await request(httpServer)
        .get(`/api/authors/${author!.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('J.K. Rowling');
    });
  });

  describe('POST /authors', () => {
    it('should create a new author', async () => {
      const res = await request(httpServer)
        .post('/api/authors')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'George Orwell' });
      expect(res.status).to.equal(201);
      expect(res.body.name).to.equal('George Orwell');
      const author = await prisma.author.findFirst({ where: { name: 'George Orwell' } });
      expect(author).to.not.be.null;
    });
  });

  describe('PUT /authors/:id', () => {
    it('should update an existing author', async () => {
      const author = await prisma.author.findFirst({ where: { name: 'J.K. Rowling' } });
      expect(author).to.not.be.null;
      const res = await request(httpServer)
        .put(`/api/authors/${author!.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Joanne Rowling' });
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('Joanne Rowling');
      const updated = await prisma.author.findUnique({ where: { id: author!.id } });
      expect(updated!.name).to.equal('Joanne Rowling');
    });
  });

  describe('DELETE /authors/:id', () => {
    it('should delete an existing author', async () => {
      const author = await prisma.author.findFirst({ where: { name: 'Frank Herbert' } });
      expect(author).to.not.be.null;
      const res = await request(httpServer)
        .delete(`/api/authors/${author!.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Author deleted successfully');
      const deleted = await prisma.author.findUnique({ where: { id: author!.id } });
      expect(deleted).to.be.null;
    });
  });
});