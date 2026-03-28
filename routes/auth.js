const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const session = require('express-session');

router.get('/register', (req, res) => {
    res.render('pages/register');
});


router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send('Email already registered! <a href="/register">Go back</a>');
        }

        
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.redirect('/login'); 
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});



router.get('/login', (req, res) => {
    res.render('pages/login');
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

     
        const user = await User.findOne({ email });
        if (!user) {
            return res.send('No account found with that email! <a href="/login">Go back</a>');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send(`Wrong password! <a href="/login">Go back</a>`);
        }

        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        res.redirect('/dashboard');

    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;