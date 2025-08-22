const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');
const jwt = require('jsonwebtoken');


function getUserDataFromReq(req)
{
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if(err)
                throw err;
            resolve(userData);
        });
    });
}

router.post('/', async (req, res) => {

    const userData = await getUserDataFromReq(req);
    const {
        place, checkIn, checkOut, 
        numberOfGuest, name, mobile, price
    } = req.body;

    Booking.create({
        place, checkIn, checkOut, 
        numberOfGuest, name, mobile,
        price, user:userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});



router.get('/account/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);

    res.json(await Booking.find({user:userData.id}).populate('place'))
});

module.exports = router;