const {ObjectID} = require('mongodb');

const Board = require('./model');

const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({});
    return res.send(boards);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getBoardById = async (req, res) => {
  const {id} = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const board = await Board.findById(id);

    if (!board) {
      return res.status(404).send();
    }

    return res.send(board);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const createBoard = async (req, res) => {
  try {
    const board = await Board.create(req.body);

    return res.send(board);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const updateBoard = async (req, res) => {
  const {id} = req.params;
  const {body} = req;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const board = await Board.findByIdAndUpdate(id, body, {new: true});

    if (!board) {
      return res.status(404).send();
    }

    return res.send(board);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deleteBoard = async (req, res) => {
  const {id} = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const board = await Board.findByIdAndRemove(id);

    if (!board) {
      return res.status(404).send();
    }

    return res.send(board);
  } catch (err) {
    return res.status(400).send();
  }
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
