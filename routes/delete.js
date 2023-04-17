var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uri = 'mongodb://127.0.0.1:27017/songs';
var Song = require('../song_model.js');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function deleteSong(id){
  const songToDelete = await Song.findByIdAndRemove(id);
  //console.log(songs)
  return songToDelete;
}

router.delete('/delete:id', function(req, res) {
  //let results = getSongs();
  deleteSong(req.params.id).then(function(songToDelete){
    console.log(songToDelete)
    if (songToDelete == null) {
        res.send('Song deleted')
    }else {
        res.send('Something went wrong!')
    }
    

  });
});

module.exports = router;
