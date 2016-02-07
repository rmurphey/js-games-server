'use strict';

let path = require('path');
let fs = require('fs');

module.exports = function (server) {
  let dictionaries = {};

  server.get('/magnetic-poetry/:dictionary', (req, res) => {
    let dictionary = req.params.dictionary;
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
};
