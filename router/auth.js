const express = require('express'); 
const router = express.Router();

const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async function(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: password });
    await newUser.save();
    res.status(200).json({ message: 'User created successfully' });
});

router.post('/login', async function(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Email does not exist' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Password is not correct' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({ token });
});

async function isAuth (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

router.get('/profile', isAuth, async function(req, res) {
    const user = await User.findById(req.user._id).populate('orders').populate('quests').populate('attempts');
    res.json(user);
});

module.exports = router;