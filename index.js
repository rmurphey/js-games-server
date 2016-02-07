'use strict';

let restify = require('restify');
let routes = require('./routes');

var server = restify.createServer({
  name : 'js-games-server'
});

// CORS
server.use(
  (req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return next();
  }
);

routes(server);

server.listen(9000);

console.log('server listening at http://localhost:9000');
