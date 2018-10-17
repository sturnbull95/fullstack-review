const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const Save = require('../database/index.js');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  console.log(req.body)
  helpers.getReposByUsername(req.body.data, function(githubObject) {
    Save.save(githubObject);
  });
  res.end('got here');
});

app.get('/repos', function (req, res) {
  Save.repoFinder(function(repos) {
    res.send(repos);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
