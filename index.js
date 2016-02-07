'use strict';

require('babel-register');

let restify = require('restify');
let routes = require('./routes');

var server = restify.createServer({
  name : 'js-games-server'
});

server.use(restify.CORS());
server.use(restify.bodyParser());

routes(server);

server.listen(9000);

console.log('server listening at http://localhost:9000');
