var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var uri = 'mongodb://127.0.0.1:27017/songs';
const bodyParser = require('body-parser')
var Song = require('../song_model.js');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/', function(req, res) {
    var newSong = new Song ({
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year,
        album: req.body.album
    });

    //console.log('jee')

    newSong
        .save()
        .then(() => console.log("Saved "))
        .catch(err => {
            console.log("Validator error: ");
            console.log(err.message);
        });

    let data = req.body;
    res.send('Data Received: ' + JSON.stringify(data));
});

module.exports = router;
