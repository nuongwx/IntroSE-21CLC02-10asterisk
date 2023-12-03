const express = require('express');
const router = express.Router();

const Request = require('../models/request');
const Quest = require('../models/quest');
const Question = require('../models/question');
const Order = require('../models/order');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/request', (req, res) => {
    Request.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/request/:id', (req, res) => {
    Request.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/request', (req, res) => {
    const request = new Request(req.body);
    request.save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.put('/request/:id', (req, res) => {
    Request.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.delete('/request/:id', (req, res) => {
    Request.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// get all quests
router.get('/quest', (req, res) => {
    Quest.find().populate('orders').populate('attempts')
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// create new quest
router.post('/quest', (req, res) => {
    const quest = new Quest(req.body);
    // decided that i dont want to use "order" field in question schema xd
    quest.questions.sort((a, b) => {
        return a.question > b.question ? 1 : -1;
    });
    quest.save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// get quest by id
router.get('/quest/:id', (req, res) => {
    Quest.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// update quest by id body params
router.put('/quest/:id', (req, res) => {
    Quest.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// delete quest by id
router.delete('/quest/:id', (req, res) => {
    Quest.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});


// TODOS: malfunctioned body params, sort questions on any changes

module.exports = router;