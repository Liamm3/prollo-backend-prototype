const {ObjectID} = require('mongodb');

const Board = require('../board/model');

const boardOneId = new ObjectID();
const boardTwoId = new ObjectID();

const boards = [
  {
    _id: boardOneId,
    name: 'Board 1',
    lists: []
  },
  {
    _id: boardTwoId,
    name: 'Board 2',
    lists: []
  }
];

const populateBoards = async done => {
  await Board.remove({});

  const boardOne = new Board(boards[0]).save();
  const boardTwo = new Board(boards[1]).save();
  await Promise.all([boardOne, boardTwo]);

  done();
};

module.exports = {
  boards,
  populateBoards
};
