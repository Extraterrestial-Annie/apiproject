var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uri = 'mongodb://127.0.0.1:27017/songs';
var Song = require('../song_model.js');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/add', function(req, res) {
  var newSong = new Song ({
      name: req.body.name,
      artist: req.body.artist,
      year: req.body.year,
      album: req.body.album
  });

  newSong
      .save()
      .then(() => {
        console.log("Saved ")
        let data = req.body;
        res.send('Data Received: ' + JSON.stringify(data));
      })
      .catch(err => {
          console.log("Validator error: ");
          console.log(err.message);
          return res.status(400).json({"error": err.message})
      });

});

async function deleteSong(id){
  console.log(id)
  const songToDelete = await Song.findByIdAndDelete(id);
  //console.log(songs)
  return songToDelete;
}

router.delete('/delete/:id', function(req, res) {
  //let results = getSongs();
  deleteSong(req.params.id).then(function(songToDelete){
    console.log(songToDelete)
    if (songToDelete != null) {
        res.send('Song deleted')
    }else {
        res.status(400).json({"error": 'Id not found'})
    }
    

  });
});

async function ModifySong(id, newData){
  //console.log(id)
  const songToModify = await Song.findByIdAndUpdate(id, newData);
  //console.log(songs)
  return songToModify;
}

router.patch('/update/:id', function(req, res) {
  //let results = getSongs();
  if (req.body.year != undefined && (req.body.year.length) != 4) {
    return res.status(400).json({"error": "Year has to be between 1000 and 9999!"})
  }
  if (req.body.name != undefined && (req.body.name.length) == 0) {
    return res.status(400).json({"error": "Name cannot be empty!"})
  }
  if (req.body.artist != undefined && (req.body.artist.length) == 0) {
    return res.status(400).json({"error": "Artist cannot be empty"})
  }
  var newData =  {
    'name': req.body.name,
    'artist': req.body.artist,
    'year': req.body.year,
    'album': req.body.album }

  ModifySong(req.params.id, newData).then(function(songToModify){
    console.log(songToModify)
    if(songToModify != null){
      res.send(JSON.stringify(songToModify));
    }
    else {
      res.status(400).json({"error": "Id not found!"})
    }
  });
});

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

async function getSong(id){
  const song = await Song.findById(id);
  //console.log(songs)
  return song;
}

router.get('/:id', function(req, res) {
  //let results = getSongs();
  getSong(req.params.id).then(function(song){
    console.log(song)
    if(song != null){
      res.send(JSON.stringify(song));
    }
    else {
      res.status(400).json({"error": "Id not found!"})
    }

  });
});



module.exports = router;

