import { logger } from "../src/config/logging";
import { web } from "../src/config/web";
import supertest from "supertest"

describe('GET /api/product', () => {

  // Test for getting all products
  it('should return all products', async () => {
    const response = await supertest(web)
      .get('/api/products')
      .set('Accept', 'application/json')
      logger.debug('Response:', response.body)
      expect(response.status).toBe(200)
      expect(response.body.data).toBeDefined()
  })

  // Test for getting a product by ID
  it('should return a product by ID', async () => {
    const response = await supertest(web)
      .get('/api/products/1')
      .set('Accept', 'application/json')
      logger.debug('Response:', response.body)
      expect(response.status).toBe(200)
      expect(response.body.data).toBeDefined()
  })

})

describe ('POST /api/products/create', () => {

  // Test for creating a new product
  it('should create a new product', async () => {
    const response = await supertest(web)
      .post('/api/products/create')
      .send({
        name: 'New Product',
        description: 'This is a new product',
        price: 100000,
        stock: 100,
        categoryId: 1
      })
      .set('Accept', 'application/json')
      logger.debug('Response:', response.body)
      expect(response.status).toBe(200)
      expect(response.body.data).toBeDefined()
  })

  // Test for creating a product with invalid data
  it('should reject creating a product with invalid data', async () => {
    const response = await supertest(web)
      .post('/api/products/create')
      .send({
        name: '',
        description: '',
        price: -1,
        stock: -1,
        categoryId: -1
      })
      .set('Accept', 'application/json')
      logger.debug('Response:', response.body)
      expect(response.status).toBe(400)
      expect(response.body.error).toBeDefined()
  })

})