const express = require('express');
const logger = require('morgan');

const app = express();
const port = 3000 || process.env.PORT;

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send({
    msg: 'Hello'
  });
});

app.listen(port);

module.exports = app;
