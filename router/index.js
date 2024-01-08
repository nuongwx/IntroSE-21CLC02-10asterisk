const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

const Quest = require('../models/quest');
const Question = require('../models/question');
const Order = require('../models/order');
const User = require('../models/user');
const Attempt = require('../models/attempt');
const Rating = require('../models/rating');

router.get('/', (req, res) => {
    res.send('Hello World!');
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
    Quest.findById(req.params.id).populate('orders').populate('attempts').populate('ratings').populate('ratings.user')
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

router.post('/quest/:id/rating', (req, res) => {
    Quest.findById(req.params.id)
        .then((result) => {
            const rating = new Rating(req.body);
            result.ratings.push(rating);
            result.save()
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/quest/:id/image', (req, res) => {
    const file = req.files.image;
    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            Quest.findByIdAndUpdate(req.params.id, { $push: { images: result.secure_url } })
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }).end(file.data);
});

router.delete('/quest/:id/image/', (req, res) => {
    Quest.findByIdAndUpdate(req.params.id, { $pull: { images: req.body.image } })
        .then((result) => {
            cloudinary.uploader.destroy(req.body.image.split('/').pop().split('.')[0], (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
            res.json(result);
        }
        )
        .catch((err) => {
            console.log(err);
        }
        );
});

// get quest's questions by quest id
router.get('/quest/:id/questions', (req, res) => {
    Quest.findById(req.params.id)
        .then((result) => {
            res.json(result.questions);
        })
        .catch((err) => {
            console.log(err);
        });
});

// create new question for quest by quest id
router.post('/quest/:id/questions', (req, res) => {
    const question = new Question(req.body);
    Quest.findById(req.params.id)
        .then((result) => {
            result.questions.push(question);
            result.save()
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

// get question by quest id and question id
router.get('/quest/:id/questions/:questionId', (req, res) => {
    Quest.findById(req.params.id)
        .then((result) => {
            res.json(result.questions.id(req.params.questionId));
        })
        .catch((err) => {
            console.log(err);
        });
});

// update question by quest id and question id body params
router.put('/quest/:id/questions/:questionId', (req, res) => {
    Quest.findById(req.params.id)
        .then((result) => {
            const question = result.questions.id(req.params.questionId);
            question.set(req.body);
            result.save()
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

// delete question by quest id and question id
router.delete('/quest/:id/questions/:questionId', (req, res) => {
    Quest.findByIdAndUpdate(req.params.id, {
        $pull: {
            questions: { _id: req.params.questionId }
        }
    })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// get all orders
router.get('/order', (req, res) => {
    Order.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/order', async (req, res) => {
    const { email, quest } = req.body;

    // add order to user matching email
    await User.findOne({ email: email }).then(async (res_user) => {
        if (res_user) {
            await Quest.findById(quest).then(async (res_quest) => {
                console.log(res_quest);
                if (res_quest) {
                    let order = await Order.create({ user: res_user, quest: res_quest, status: 'completed' })
                    return res.json(order);
                } else {
                    return res.status(400).json({ error: 'Quest not found' });
                }
            });
        } else {
            return res.status(400).json({ error: 'User not found' });
        }
    });
});

// get order by id
router.get('/order/:id', (req, res) => {
    Order.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// update order by id body params
router.put('/order/:id', (req, res) => {
    Order.findById(req.params.id)
        .then((result) => {
            result.set(req.body);
            result.save()
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

// get all users
router.get('/user', (req, res) => {
    User.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// get user by id
router.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
        .populate('orders')
        .populate('quests')
        .populate('attempts')
        .populate('rating')
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// update user by id body params
router.put('/user/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            result.set(req.body);
            result.save()
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

// Get top quest for homepage
router.get('/home/quest/top4Quests/', async (req, res) => {
    try {
        // Use Mongoose to query the database and sort by averageRating
        const topRatedQuests = await Quest.find().sort({ averageRating: -1 }).limit(4);

        res.json(topRatedQuests);
    }
    catch (error) {
        console.error('Error fetching top-rated quests:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;