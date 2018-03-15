const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('../db/mongoose');

const boardRoutes = require('../board/routes');
const listRoutes = require('../list/routes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', boardRoutes);
app.use('/', listRoutes);

module.exports = app;
