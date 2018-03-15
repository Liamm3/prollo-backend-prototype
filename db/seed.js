const {ObjectID} = require('mongodb');

const Board = require('../board/model');

const boardOneId = new ObjectID();
const boardTwoId = new ObjectID();

const boards = [
  {
    _id: boardOneId,
    name: 'Board 1'
  },
  {
    _id: boardTwoId,
    name: 'Board 2'
  }
];

const populateBoards = async done => {
  await Board.remove({});
  await Board.insertMany(boards);
  return done();
};

module.exports = {
  boards,
  populateBoards
};
