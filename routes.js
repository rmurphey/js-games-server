'use strict';

let path = require('path');
let fs = require('fs');
let cache = require('memory-cache');
let md5 = require('md5');

module.exports = function (server) {
  let dictionaries = {};

  server.get('/magnetic-poetry/:dictionary', (req, res) => {
    let { dictionary } = req.params;
    let words = dictionaries[dictionary];

    if (words) {
      return res.json(200, { words });
    }

    fs.readFile(
      path.join(__dirname, 'magnetic-poetry', `${dictionary}.txt`),
      { encoding : 'utf8' },
      (err, data) => {
        if (err) {
          return res.json(404, { error : 'Not found' });
        }

        let words = dictionaries[dictionary] = data.trim().split('\n');

        res.json(200, { words });
      }
    )
  });

  server.post('/magnetic-poetry/poem', (req, res) => {
    let key = md5(JSON.stringify(req.body));
    cache.put(key, req.body);
    res.json(200, { key });
  });

  server.get('/magnetic-poetry/poem/:key', (req, res) => {
    let { key } = req.params;
    res.json(
      200,
      cache.get(key) || {}
    )
  });
};
