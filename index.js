const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = 3000 || process.env.PORT;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send({
    msg: 'Hello'
  });
});

app.listen(port);

module.exports = app;
