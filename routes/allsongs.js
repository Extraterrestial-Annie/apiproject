var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uri = 'mongodb://127.0.0.1:27017/songs';
var Song = require('../song_model.js');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function getSongs(){
  const songs = await Song.find({});
  //console.log(songs)
  return songs;
}

router.get('/getall', function(req, res, next) {
  //let results = getSongs();
  getSongs().then(function(songs){
    console.log(songs)
    res.send(JSON.stringify(songs));

  });
});

module.exports = router;
