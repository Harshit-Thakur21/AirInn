const express = require('express');
const router = express.Router();
const imageDownloader = require('image-downloader');
const path = require('path');


router.post('/upload-by-link', async(req, res) => {
    const {link} = req.body;
    const newName = 'image' + Date.now() + '.jpg';

    const uploadPath = path.join(__dirname, '..', 'uploads', newName) // '..' so that it does not upload to routes directory

    await imageDownloader.image({
        url: link,
        dest: uploadPath,
    });
    res.json(newName);
});

module.exports = router;