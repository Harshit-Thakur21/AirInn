const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User',
    },
    title : {
        type : String,
    },
    address : {
        type : String,
    },
    images : {
        type : [String]
    },
    description : {
        type : String
    },
    perks : {
        type : [String]
    },
    extraInfo : {
        type : String
    },
    checkIn : {
        type : Number
    },
    checkOut : {
        type : Number
    },
    maxGuest : {
        type : Number
    },
    price : {
        type : Number
    }
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;