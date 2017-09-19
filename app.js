const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const routes = require('./routes');
var socketio = require('socket.io');
var server = app.listen(3000, () => console.log('Server listening...'));
var io = socketio.listen(server);

var locals = {
  title: 'The Fellowship of the Ring',
  people: [
    { name: 'Gandalf' },
    { name: 'Frodo' },
    { name: 'Samwise' },
  ]
};
nunjucks.configure('views', { noCache: true });
// nunjucks.render('index.html', locals, function (err, output) {
//   if (err) throw new Error(err);
//   console.log(output);
// })

app.set('view engine', 'html'); // What does 'view engine' do?
app.engine('html', nunjucks.render);

// middleware
app.use('/', routes(io));

app.use(express.static('./public'));

app.use(function(req, res, next) {
  console.log(req.method, req.url, res.statusCode);
  next();
})

app.use('/special/', function(req, res, next) {
  console.log('Access to all classified and restricted information: GRANTED');
})

// render result
app.get('/', (req, res) => res.render('index', locals));
