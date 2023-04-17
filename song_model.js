var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let songSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    year: {
        type: String,
        minLength: [4, "Too early, not interested."],
        maxLength: [4, "Way too late, unless you are from the future."]
    },
    album: String
});
module.exports = mongoose.model('song', songSchema);