import { logger } from './../src/config/logging';
import { web } from '../src/config/web';
import supertest from "supertest"

describe('POST /api/admin/register', () => {

  it('should reject register new admin if request is invalid', async () => {
    const response = await supertest(web)
      .post('/api/admin/register')
      .send({
        email: 'invalid-email',
        password: 'short',
        name: 'John Doe',
        role: 'admin'
      })
      logger.debug('Response:', response.body)
      expect(response.status).toBe(400)
      expect(response.body.error).toBeDefined()
  })
  
  
})