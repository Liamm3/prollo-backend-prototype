const express = require('express');

const app = express();
const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  res.send({
    msg: 'Hello'
  });
});

app.listen(port);

module.exports = app;
