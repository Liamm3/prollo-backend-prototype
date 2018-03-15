const request = require('supertest');

const app = require('../index');
const {populateBoards} = require('../db/seed');

beforeEach(populateBoards);

describe('GET /boards', () => {
  it('should get all boards', () => {
    request(app)
      .get('/boards')
      .expect(res => {
        expect(res.body.boards.length).toBe(2);
      })
      .expect(200);
  });
});
