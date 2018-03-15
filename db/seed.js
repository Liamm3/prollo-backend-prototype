const {ObjectID} = require('mongodb');

const Board = require('../board/model');
const List = require('../list/model');

const boardOneId = new ObjectID();
const boardTwoId = new ObjectID();

const listOneId = new ObjectID();
const listTwoId = new ObjectID();

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

const lists = [
  {
    _id: listOneId,
    name: 'List 1',
    _board: boardOneId
  },
  {
    _id: listTwoId,
    name: 'List 2',
    _board: boardTwoId
  }
];

const populateBoards = async done => {
  await Board.remove({});
  await Board.insertMany(boards);
  return done();
};

const populateLists = async done => {
  await List.remove({});
  await List.insertMany(lists);
  return done();
};

module.exports = {
  boards,
  populateBoards,
  lists,
  populateLists
};
