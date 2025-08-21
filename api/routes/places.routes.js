const express = require('express');
const router = express.Router();
const Place = require('../models/place.model');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) =>{
    const {token} = req.cookies;
    const {
        title, address, addedImages, 
        description, perks, extraInfo,
        checkIn, checkOut, maxGuest, price, 
    } = req.body;


    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;

        const placeDoc = await Place.create({
            owner: userData.id,
            title, 
            address, 
            images: addedImages, 
            description, 
            perks, 
            extraInfo,
            checkIn, 
            checkOut, 
            maxGuest,
            price,
        });

        res.json(placeDoc);
    });
});


router.get('/user-places', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        const {id} = userData;

        res.json(await Place.find({owner:id}));
    });
});


router.get('/:id', async (req, res) => {
    const {id} = req.params;

    res.json(await Place.findById(id));
});


router.put('/', async (req, res) =>{

    const {token} = req.cookies;
    const {
        id, title, address, addedImages, 
        description, perks, extraInfo,
        checkIn, checkOut, maxGuest, price,
    } = req.body;
    
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {

        if(err)
        {
            throw err;
        }

        const placeDoc = await Place.findById(id);

        if(userData.id === placeDoc.owner.toString())
        {
            placeDoc.set({
                title, 
                address, 
                images: addedImages, 
                description, 
                perks, 
                extraInfo,
                checkIn, 
                checkOut, 
                maxGuest,
                price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});


module.exports = router;