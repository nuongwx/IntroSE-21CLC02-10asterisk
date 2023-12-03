const mongoose = require('mongoose');
const Request = require('./request');
const Question = require('./question');
const Quest = require('./quest');
const Order = require('./order');
const User = require('./user');
const Attempt = require('./attempt');

exports.test = async (req, res) => {
    try {
        try {
            await Request.collection.drop();
            await Quest.collection.drop();
            await User.collection.drop();
            await Order.collection.drop();
            await Attempt.collection.drop();
        } catch (err) {
            console.log(err);
        }

        let request = await Request.create({
            email: 'brand@new.mail',
            message: 'hello world',
            status: 'pending'
        });

        let question = new Question({
            question: '1. a new one',
            answer: '42'
        });

        let quest = await Quest.create({
            title: 'quest1',
            description: 'desc1',
            price: 100,
            questions: [
                {
                    question: '3. 2',
                    answer: '2'
                },
                {
                    question: '2. 2',
                    answer: '2'
                }
            ]
        });

        quest.questions.push(question);
        await quest.save();

        let user = await User.create({
            email: 'new@email.com',
            password: '123456'
        });

        // direct POST api > model
        let Order1 = await Order.create({
            user: user,
            quest: quest,
            status: 'approved'
        });

        let Attempt1 = await Attempt.create({
            user: user,
            quest: quest,
            score: 1
        });

    }
    catch (err) {
        console.log(err);
    }
}