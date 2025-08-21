const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');

router.post('/', (req, res) => {
    const {
        place, checkIn, checkOut, 
        numberOfGuest, name, mobile, price
    } = req.body;

    Booking.create({
        place, checkIn, checkOut, 
        numberOfGuest, name, mobile, price
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});

module.exports = router;