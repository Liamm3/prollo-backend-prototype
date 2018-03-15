const express = require('express');

const controller = require('./controller');

const Router = express.Router;
const router = new Router();

router.get('/boards', controller.getAllBoards);
router.get('/boards/:id', controller.getBoardById);
router.post('/boards', controller.createBoard);
router.put('/boards/:id', controller.updateBoard);
router.delete('/boards/:id', controller.deleteBoard);

module.exports = router;
