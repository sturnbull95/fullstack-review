const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  owner: String,
  description: String,
  avatar_url: String,
  html_url: String,

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (githubObject) => {

  var repoArray = [];
  var parsedRepos = JSON.parse(githubObject.body);

  for (var i = 0; i < parsedRepos.length; i++) {
    var repoObj = {};

    repoObj.id = parsedRepos[i].id;
    repoObj.name = parsedRepos[i].name;
    repoObj.owner = parsedRepos[i].owner.login;
    repoObj.description = parsedRepos[i].description;
    repoObj.avatar_url = parsedRepos[i].avatar_url;
    repoObj.html_url = parsedRepos[i].html_url;

    var repo = new Repo(repoObj); //new document

    repo.save(function (err) {
      if (err) {
        console.log(err);
      }
    })
    repoArray.push(repoObj);
  }
}

var repoFinder = function(callback) {
  Repo.find(function(err, repos) {
    if (err) {
      console.log(err);
    } else {
      callback(repos);
    }
  }).
  limit(25).
  sort({'name': 1});
}

module.exports.save = save;
module.exports.repoFinder = repoFinder;
