const express = require('express');

const controller = require('./controller');

const Router = express.Router;
const router = new Router();

router.get('/lists', controller.getAllLists);
router.get('/lists/:id', controller.getOneList);
router.post('/lists', controller.createList);
router.put('/lists/:id', controller.updateList);
router.delete('/lists/:id', controller.deleteList);

module.exports = router;
