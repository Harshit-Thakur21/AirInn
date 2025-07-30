    const express = require('express');
    const router = express.Router();
    const User = require('../models/user.model')
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');


    router.post('/register', async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        });

        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
    });



    router.post('/login', async(req, res) => {
        const {email, password} = req.body;

        const findUser = await User.findOne({
            email:email
        });

        if (!findUser) {
            return res.status(400).json({
                message: 'Username or password is incorrrect'
            })
        }

        const isMatch = await bcrypt.compare(password, findUser.password);

        if(!isMatch)
        {
            return res.status(400).json({
                message: 'Username or password is incorrrect'
            })
        }

        //jwt
        const token = jwt.sign({
            id : findUser._id,
            email : findUser.email
        },
            process.env.JWT_SECRET
        )

        res.cookie('token', token).json(findUser); //made change here .json(findUser)
    });

    
    router.post('/logout', (req, res) =>{
        res.cookie('token', '').json(true);
    });

    
    router.get('/profile', (req, res) => {

        const {token} = req.cookies;

        if(token)
        {
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
                if(err) throw err;

                const {name, email, _id} = await User.findById(userData.id)
                res.json({name, email, _id});
            });
        }
        else
        {
            res.json(null);
        }
    });

    module.exports = router;