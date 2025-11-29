const request = require('supertest');
const app = require('../src/app');

describe('Auth System', () => {
    it('should accept a strong password with special characters', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'juniordev',
                password: 'Password123!' // This fails on the buggy regex
            });
        
        if (res.statusCode === 400) {
            throw new Error("FAIL: The validator rejected a strong password.");
        }
        expect(res.statusCode).toEqual(201);
    });
});
