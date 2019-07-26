const request = require('supertest');

const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe('server', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('POST /api/register', () => {
    it('return 500 with incorrect submission', async () => {
      const user = { username: 'jp' };

      return request(server)
        .post('/api/register', user)
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
    it('should return user object after successful register', async () => {
      const newUser = {
        username: 'mike',
        password: 'password'
      };

      return request(server)
        .post('/api/register')
        .send(newUser)
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body.username).toEqual(newUser.username);
        });
    });
  });

  describe('POST /api/login', () => {
    it('should return 401 with incorrect username or password', async () => {
      const user = {
        username: 'mike',
        password: 'password'
      };
      const newUser = await request(server)
        .post('/api/register')
        .send(user)
        .then(res => console.log(res.body));

      user.password = 'pass';

      return request(server)
        .post('/api/login')
        .send(user)
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
    it('should return 200 with successful login', async () => {
      const user = {
        username: 'mike',
        password: 'password'
      };
      const newUser = await request(server)
        .post('/api/register')
        .send(user)
        .then(res => console.log(res.body));

      return request(server)
        .post('/api/login')
        .send(user)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
