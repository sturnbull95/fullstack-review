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

let help = (obj, parsedRepos, callback) => {
  var repoObj = {};
  var repoArray = [];
  Repo.find({id:obj.id}, function(err,repos){
    if(repos.length === 0){
      repoObj.id = obj.id;
      repoObj.name = obj.name;
      repoObj.owner = obj.owner.login;
      repoObj.description = obj.description;
      repoObj.avatar_url = obj.avatar_url;
      repoObj.html_url = obj.html_url;

      var repo = new Repo(repoObj);

      repo.save(function (err) {
        if (err) {
          console.log(err);
        }
      })
      repoArray.push(repoObj);
    } else{
      console.log('not important');
    }

  })
}

let save = (githubObject, callback) => {

  var repoArray = [];
  var parsedRepos = JSON.parse(githubObject.body);
  //let flag = false;
  for (var i = 0; i < parsedRepos.length; i++) {
    var newPar = parsedRepos[i]
    console.log(newPar)
    help(newPar);
    
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
