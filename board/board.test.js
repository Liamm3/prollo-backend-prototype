const request = require('supertest');
const {ObjectID} = require('mongodb');

const app = require('../app/app');
const {boards, populateBoards} = require('../db/seed');
const Board = require('../board/model');

beforeEach(populateBoards);

describe('GET /boards', () => {
  it('should get all boards', done => {
    request(app)
      .get('/boards')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /boards/:id', () => {
  it('should get one board', done => {
    request(app)
      .get(`/boards/${boards[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.name).toBe(boards[0].name);
      })
      .end(done);
  });

  it('should return 404 if board was not found', done => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/boards/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    request(app)
      .get('/boards/123')
      .expect(404)
      .end(done);
  });
});

describe('POST /boards', () => {
  it('should create a new board', done => {
    const name = 'Board 3';

    request(app)
      .post('/boards')
      .send({name})
      .expect(200)
      .expect(res => {
        expect(res.body.name).toBe(name);
      })
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const boards = await Board.find({});
          expect(boards.length).toBe(3);
          expect(boards[2].name).toBe(name);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });

  it('should not create a board with invalid body', done => {
    request(app)
      .post('/boards')
      .send({})
      .expect(400)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const boards = await Board.find({});
          expect(boards.length).toBe(2);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
});

describe('PUT /boards/:id', () => {
  it('should update the name of the board', done => {
    const name = 'New Board Name';
    const id = boards[0]._id.toHexString();

    request(app)
      .put(`/boards/${id}`)
      .send({name})
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(id);
      })
      .end(done);
  });

  it('should return 404 if board was not found', done => {
    const hexId = new ObjectID().toHexString();
    const name = 'New Board Name';

    request(app)
      .put(`/boards/${hexId}`)
      .send({name})
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    const name = 'New Board Name';

    request(app)
      .put('/boards/123')
      .send({name})
      .expect(404)
      .end(done);
  });
});

describe('DELETE /boards/:id', () => {
  it('should delete a board by its id and return it', done => {
    const hexId = boards[0]._id.toHexString();

    request(app)
      .delete(`/boards/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(hexId);
      })
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const boards = await Board.find({});
          expect(boards.length).toBe(1);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });

  it('should return 404 if board was not found', done => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/boards/${hexId}`)
      .expect(404)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const boards = await Board.find({});
          expect(boards.length).toBe(2);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });

  it('should return 404 for non-object ids', done => {
    request(app)
      .delete('/boards/123')
      .expect(404)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const boards = await Board.find({});
          expect(boards.length).toBe(2);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
});
