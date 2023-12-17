const express = require('express');
const router = express.Router();

const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

router.post('/register', async function (req, res) {
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

router.post('/login', async function (req, res) {
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

async function isAuth(req, res, next) {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    token = token.split(' ')[1].replace(/['"]+/g, '')
    console.log(token);
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

router.get('/profile', isAuth, async function (req, res) {
    // const user = await User.findById(req.user._id).populate('orders').populate('quests').populate('attempts');
    const user = await User.findById(req.user._id).populate({
        path: 'orders',
        populate: {
            path: 'quest',
            model: 'Quest'
        }
    }).populate({
        path: 'attempts',
        populate: {
            path: 'quest',
            model: 'Quest'
        }
    }).populate({
        path: 'rating',
        populate: {
            path: 'quest',
            model: 'Quest'
        }
    }).populate({
        path: 'quests',
        populate: {
            path: 'quest',
            model: 'Quest'
        }
    });

    res.json(user);
});

router.post('/profile', isAuth, async function (req, res) {
    console.log(req.body);
    console.log(req.files);
    const { newPassword } = req.body;
    const profileImage = req.files?.profileImage;
    const user = await User.findById(req.user._id || req.body.id);
    if (user && newPassword && newPassword !== 'undefined') {
        user.password = newPassword;
        await user.save();
        return res.status(200).json({ message: 'Password updated successfully' });
    }
    else if (profileImage && profileImage !== 'undefined') {
        const oldImage = user.image;
        const image = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
                user.image = result.secure_url;
                await user.save();
                res.status(200).json({ message: 'Profile image updated successfully' });
                if (oldImage) {
                    cloudinary.uploader.destroy(oldImage.split('/').slice(-1)[0].split('.')[0]);
                }
            }
        }).end(profileImage.data);
    }
});

module.exports = router;