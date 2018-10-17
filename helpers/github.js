const request = require('request');
const config = require('../config.js');
const db = require('../database');

let getReposByUsername = (username, callback) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, function(err, githubObject) {
    if (err) {
      console.error(err, null);
    } else {
      callback(githubObject);
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;
