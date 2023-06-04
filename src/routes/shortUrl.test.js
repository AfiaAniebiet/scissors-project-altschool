const request = require('supertest');
const app = require('../app');

describe('Test GET /short-url', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app).get('/short-url').expect(200).expect('Content-Type', /html/);
    // expect(response.statusCode).toBe(200);
  });
});
