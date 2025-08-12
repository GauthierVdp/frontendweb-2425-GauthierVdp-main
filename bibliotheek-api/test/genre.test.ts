import { expect } from 'chai';
import request from 'supertest';
import createServer, { Server } from '../src/createServer';
import { prisma } from '../src/data';

describe('Genre API', function (this: Mocha.Suite) {
  this.timeout(10000);

  let server: Server;
  let httpServer: any;
  let token: string;
  const uniqueEmail = `unique${Date.now()}@example.com`;

  before(async () => {
    server = await createServer();
    await server.start();
    httpServer = server.getApp().callback();

    // Zorg dat er genres zijn in de database
    await prisma.genre.deleteMany({});
    await prisma.genre.createMany({
      data: [
        { name: 'Fantasy' },
        { name: 'Science Fiction' },
      ],
    });

    // Register en login om een token te krijgen
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
    await prisma.genre.deleteMany({});
  });

  describe('GET /genres', () => {
    it('should return all genres in the database', async () => {
      const genresInDb = await prisma.genre.findMany();
      const res = await request(httpServer)
        .get('/api/genres')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.items).to.be.an('array');
      expect(res.body.items.length).to.equal(genresInDb.length);
      // Check that all genres from DB are present in response
      const namesFromDb = genresInDb.map(g => g.name).sort();
      const namesFromApi = res.body.items.map((g: any) => g.name).sort();
      expect(namesFromApi).to.deep.equal(namesFromDb);
    });
  });

  describe('GET /genres/:id', () => {
    it('should return a single genre by id', async () => {
      const genre = await prisma.genre.findFirst({ where: { name: 'Fantasy' } });
      expect(genre).to.not.be.null;
      const res = await request(httpServer)
        .get(`/api/genres/${genre!.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('Fantasy');
    });
  });

  describe('POST /genres', () => {
    it('should create a new genre', async () => {
      const res = await request(httpServer)
        .post('/api/genres')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Horror' });
      expect(res.status).to.equal(201);
      expect(res.body.name).to.equal('Horror');
      // Check it is in the database
      const genre = await prisma.genre.findFirst({ where: { name: 'Horror' } });
      expect(genre).to.not.be.null;
    });
  });

  describe('PUT /genres/:id', () => {
    it('should update an existing genre', async () => {
      const genre = await prisma.genre.findFirst({ where: { name: 'Fantasy' } });
      expect(genre).to.not.be.null;
      const res = await request(httpServer)
        .put(`/api/genres/${genre!.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Epic Fantasy' });
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('Epic Fantasy');
      // Check in database
      const updated = await prisma.genre.findUnique({ where: { id: genre!.id } });
      expect(updated!.name).to.equal('Epic Fantasy');
    });
  });

  describe('DELETE /genres/:id', () => {
    it('should delete an existing genre', async () => {
      const genre = await prisma.genre.findFirst({ where: { name: 'Science Fiction' } });
      expect(genre).to.not.be.null;
      const res = await request(httpServer)
        .delete(`/api/genres/${genre!.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Genre deleted successfully');
      // Check it is gone
      const deleted = await prisma.genre.findUnique({ where: { id: genre!.id } });
      expect(deleted).to.be.null;
    });
  });
});