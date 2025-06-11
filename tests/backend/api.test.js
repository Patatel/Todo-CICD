const request = require('supertest');
const app = require('../../backend/src/app');

describe('Backend API Tests', () => {
  describe('GET /api/system-info', () => {
    it('should return system information', async () => {
      const response = await request(app)
        .get('/api/system-info')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('cpu');
      expect(response.body).toHaveProperty('memory');
      expect(response.body).toHaveProperty('network');
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('ok');
    });
  });
}); 