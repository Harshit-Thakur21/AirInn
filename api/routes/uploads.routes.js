const express = require('express');
const router = express.Router();
const imageDownloader = require('image-downloader');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


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

const imageMiddleware = multer({dest:'uploads/'});
router.post('/uploadImage', imageMiddleware.array('images', 100), (req, res) => {

    const uploadedFiles = [];

    for(let i=0; i<req.files.length; i++)
    {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];

        const newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', '').replace('uploads/', ''));
    }
    res.json(uploadedFiles);
});


module.exports = router;