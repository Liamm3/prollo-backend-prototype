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


describe('GET /boards/:id', () => {
  it('should get one board', () => {

  });

  it('should return 404 if board was not found', () => {

  });

  it('should return 404 for non-object ids', () => {

  });
});

describe('POST /boards', () => {
  it('should create a new board', () => {

  });
});

describe('PUT /boards/:id', () => {
  it('should update the name of the board', () => {

  });

  it('should return 404 if board was not found', () => {

  });

  it('should return 404 for non-object ids', () => {

  });
});

describe('DELETE /boards/:id', () => {
  it('should delete a board by its id', () => {

  });

  it('should return 404 if board was not found', () => {

  });

  it('should return 404 for non-object ids', () => {

  });
});
