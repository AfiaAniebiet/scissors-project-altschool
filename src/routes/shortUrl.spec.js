const request = require('supertest');
const app = require('../app');

describe('Test GET /', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app).get('/').expect(200).expect('Content-Type', /html/);
    // expect(response.statusCode).toBe(200);
  });
});
