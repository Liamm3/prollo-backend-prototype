const List = require('./model');

const {ObjectID} = require('mongodb');

const getAllLists = async (req, res) => {
  try {
    const lists = await List.find({});

    return res.send(lists);
  } catch (err) {
    return res.status(400).send();
  }
};

const getOneList = async (req, res) => {
  const {id} = req.params;

  if (!ObjectID.isValid) {
    return res.status(404).send();
  }

  try {
    const list = await List.findById(id);

    if (!list) {
      return res.status(404).send();
    }

    return res.send(list);
  } catch (err) {
    return res.status(404).send();
  }
};

const createList = async (req, res) => {
  try {
    const list = await List.create(req.body);

    return res.send(list);
  } catch (err) {
    return res.status(404).send();
  }
};

const updateList = async (req, res) => {
  const {id} = req.params;
  const {body} = req;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const list = await List.findByIdAndUpdate(id, body, {new: true});

    if (!list) {
      return res.status(404).send();
    }

    return res.send(list);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deleteList = async (req, res) => {
  const {id} = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const list = await List.findByIdAndRemove(id);

    if (!list) {
      return res.status(404).send();
    }

    return res.send(list);
  } catch (err) {
    return res.status(400).send();
  }
};

module.exports = {
  getAllLists,
  getOneList,
  createList,
  updateList,
  deleteList,
};
