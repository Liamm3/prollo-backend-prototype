const request = require('supertest');
const {ObjectID} = require('mongodb');

const app = require('../index');
const {lists, populateLists} = require('../db/seed');
const List = require('../list/model');

beforeEach(populateLists);

describe('GET /lists', () => {
  it('should get all lists', done => {
    request(app)
      .get('/lists')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /lists/:id', () => {
  it('should get one List', done => {
    request(app)
      .get(`/lists/${lists[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.name).toBe(lists[0].name);
      })
      .end(done);
  });

  it('should return 404 if List was not found', done => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/lists/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    request(app)
      .get('/lists/123')
      .expect(404)
      .end(done);
  });
});

describe('POST /lists', () => {
  it('should create a new List', done => {
    const name = 'List 3';

    request(app)
      .post('/lists')
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
          const lists = await List.find({});
          expect(lists.length).toBe(3);
          expect(lists[2].name).toBe(name);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });

  it('should not create a List with invalid body', done => {
    request(app)
      .post('/lists')
      .send({})
      .expect(400)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const lists = await List.find({});
          expect(lists.length).toBe(2);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
});

describe('PUT /lists/:id', () => {
  it('should update the name of the List', done => {
    const name = 'New List Name';
    const id = lists[0]._id.toHexString();

    request(app)
      .put(`/lists/${id}`)
      .send({name})
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(id);
      })
      .end(done);
  });

  it('should return 404 if List was not found', done => {
    const hexId = new ObjectID().toHexString();
    const name = 'New List Name';

    request(app)
      .put(`/lists/${hexId}`)
      .send({name})
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    const name = 'New List Name';

    request(app)
      .put('/lists/123')
      .send({name})
      .expect(404)
      .end(done);
  });
});

describe('DELETE /lists/:id', () => {
  it('should delete a List by its id and return it', done => {
    const hexId = lists[0]._id.toHexString();

    request(app)
      .delete(`/lists/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(hexId);
      })
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const lists = await List.find({});
          expect(lists.length).toBe(1);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });

  it('should return 404 if List was not found', done => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/lists/${hexId}`)
      .expect(404)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const lists = await List.find({});
          expect(lists.length).toBe(2);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });

  it('should return 404 for non-object ids', done => {
    request(app)
      .delete('/lists/123')
      .expect(404)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const lists = await List.find({});
          expect(lists.length).toBe(2);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
});
