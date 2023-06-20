import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint index', () => {
  it('the server has response?', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});

describe('Test API endpoint', () => {
  it('the API has response?', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});

describe('Test API resize Image', () => {
  it('The API should be response 404 status code', async () => {
    const response = await request.get('/images');
    expect(response.status).toBe(404);
  });
});
