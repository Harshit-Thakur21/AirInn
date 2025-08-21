const express = require('express');
const router = express.Router();
const Place = require('../models/place.model');


router.get('/places', async (req, res) => {
    res.json(await Place.find());
});

router.get('/places/:id', async (req, res) => {
    const {id} = req.params;

    res.json(await Place.findById(id));
})

module.exports = router;