import { expect } from 'chai';
import request from 'supertest';
import createServer, { Server } from '../src/createServer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Authentication API', function () {
  let server: Server;
  let httpServer: any;
  const testEmail = `testuser${Date.now()}@example.com`;
  const testPassword = 'securepassword123';
  const testName = 'John Doe';

  before(async () => {
    server = await createServer();
    await server.start();
    httpServer = server.getApp().callback();
    await prisma.member.deleteMany({ where: { email: testEmail } });
  });

  after(async () => {
    await prisma.member.deleteMany({ where: { email: testEmail } });
    if (server) await server.stop();
    await prisma.$disconnect();
  });

  describe('POST /api/sessions/register', function () {
    it('should register a new member and return a token', async function () {
      const res = await request(httpServer)
        .post('/api/sessions/register')
        .send({
          email: testEmail,
          password: testPassword,
          name: testName
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('token');
      expect(res.body.token).to.be.a('string');
    });

    it('should not register a member with an already used email', async function () {
      const res = await request(httpServer)
        .post('/api/sessions/register')
        .send({
          email: testEmail,
          password: testPassword,
          name: testName
        });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('code', 'VALIDATION_FAILED');
    });
  });

  describe('POST /api/sessions', function () {
    it('should log in an existing member and return a token', async function () {
      const res = await request(httpServer)
        .post('/api/sessions')
        .send({
          email: testEmail,
          password: testPassword
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
      expect(res.body.token).to.be.a('string');
    });

    it('should return 401 for incorrect password', async function () {
      const res = await request(httpServer)
        .post('/api/sessions')
        .send({
          email: testEmail,
          password: 'wrongpassword'
        });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('code', 'UNAUTHORIZED');
    });

    it('should return 401 for non-existing member', async function () {
      const res = await request(httpServer)
        .post('/api/sessions')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('code', 'UNAUTHORIZED');
    });
  });
});