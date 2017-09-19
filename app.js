const express = require('express');
const app = express();

app.use(function(req, res, next) {
  console.log(req.method, req.url, res.statusCode);
  next();
})

app.use('/special/', function(req, res, next) {
  console.log('Access to all classified and restricted information: GRANTED');
})

app.get('/', (req, res) => res.send('Welcome!'));

app.listen(3000, () => console.log('Server listening...'));
