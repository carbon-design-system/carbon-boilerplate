#!/usr/bin/env node
const app = require('../server');

const port = process.env.PORT || 7777;

app.listen(port, (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
    return;
  }

  console.log('\nServer running\n'); // eslint-disable-line
});
