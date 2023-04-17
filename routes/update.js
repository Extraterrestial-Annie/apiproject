var express = require('express');
var router = express.Router();

async function ModifySong(id, ){
  //console.log(id)
  const songToModify = await Song.findByIdAndUpdate(id, {});
  //console.log(songs)
  return songToModify;
}

router.patch('/update/:id', function(req, res) {
  //let results = getSongs();
  ModifySong(req.params.id,).then(function(songToModify){
    //console.log(songToDelete)
    
    

  });
});

module.exports = router;
