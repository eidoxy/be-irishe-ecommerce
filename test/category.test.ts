import { logger } from './../src/config/logging';
import { web } from '../src/config/web';
import supertest from "supertest"

describe('GET /api/category', () => {

  // Test for getting all categories
  it('should return all categories', async () => {
    const response = await supertest(web)
      .get('/api/categories')
      .set('Accept', 'application/json')
      logger.debug('Response:', response.body)
      expect(response.status).toBe(200)
      expect(response.body.data).toBeDefined()
  })

  // Test for getting a category by ID
  it('should return a category by ID', async () => {
    const response = await supertest(web)
      .get('/api/categories/1')
      .set('Accept', 'application/json')
      logger.debug('Response:', response.body)
      expect(response.status).toBe(200)
      expect(response.body.data).toBeDefined()
  })
})

// describe('POST /api/categories/create', () => {

//   // Test for creating a new category
//   it('should create a new category', async () => {
//     const response = await supertest(web)
//       .post('/api/categories/create')
//       .send({
//         name: 'New Category',
//         description: 'This is a new category'
//       })
//       .set('Accept', 'application/json')
//       logger.debug('Response:', response.body)
//       expect(response.status).toBe(200)
//       expect(response.body.data).toBeDefined()
//   })

//   // Test for creating a category with invalid data
//   it('should reject creating a category with invalid data', async () => {
//     const response = await supertest(web)
//       .post('/api/categories/create')
//       .send({
//         name: '',
//         description: ''
//       })
//       .set('Accept', 'application/json')
//       logger.debug('Response:', response.body)
//       expect(response.status).toBe(400)
//       expect(response.body.error).toBeDefined()
//   })
  
// })

// describe('PUT /api/categories/update/:id', () => {

//   // Test for updating a category
//   it('should update a category', async () => {
//     const response = await supertest(web)
//       .put('/api/categories/update/1')
//       .send({
//         name: 'Updated Category 1',
//         description: 'This is an updated category'
//       })
//       .set('Accept', 'application/json')
//       logger.debug('Response:', response.body)
//       expect(response.status).toBe(200)
//       expect(response.body.data).toBeDefined()
//   })

//   // Test for updating a category with invalid data
//   it('should reject updating a category with invalid data', async () => {
//     const response = await supertest(web)
//       .put('/api/categories/update/1')
//       .send({
//         name: '',
//         description: ''
//       })
//       .set('Accept', 'application/json')
//       logger.debug('Response:', response.body)
//       expect(response.status).toBe(400)
//       expect(response.body.error).toBeDefined()
//   })

//   // Test for updating data with existing name
//   it('should reject updating a category with existing name', async () => {
//     const response = await supertest(web)
//       .put('/api/categories/update/1')
//       .send({
//         name: 'Clothing',
//         description: 'This is an updated category'
//       })
//       .set('Accept', 'application/json')
//       logger.debug('Response:', response.body)
//       expect(response.status).toBe(400)
//       expect(response.body.error).toBeDefined()
//   })
  
// })

describe('DELETE /api/categories/delete/:id', () => {

  // Test for deleting a category
  it('should delete a category', async () => {
    const response = await supertest(web)
      .delete('/api/categories/delete/13')
      .set('Accept', 'application/json')
      logger.debug('Response:', response.body)
      expect(response.status).toBe(200)
      expect(response.body.data).toBeDefined()
  })

  // Test for deleting a non-existing category
  it('should reject deleting a non-existing category', async () => {
    const response = await supertest(web)
      .delete('/api/categories/delete/9999')
      .set('Accept', 'application/json')
      logger.debug('Response:', response.body)
      expect(response.status).toBe(404)
      expect(response.body.error).toBeDefined()
  })
  
})