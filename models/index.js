const mongoose = require('mongoose');
// const Request = require('./request');
const Question = require('./question');
const Quest = require('./quest');
const Order = require('./order');
const User = require('./user');
const Attempt = require('./attempt');
const Rating = require('./rating');

exports.test = async (req, res) => {
    return;
    try {
        // try {
        //     await Question.collection.drop();
        //     await Request.collection.drop();
        //     await Quest.collection.drop();
        //     await User.collection.drop();
        //     await Order.collection.drop();
        //     await Attempt.collection.drop();
        // } catch (err) {
        //     console.log(err);
        // }

        let quest1 = await Quest.create({
            title: 'Khám phá Trường Đại học Khoa học Tự nhiên',
            description: 'Khám phá lịch sử, kiến trúc, các địa điểm nổi tiếng của trường Đại học Khoa học Tự nhiên',
            price: 100000,
            image: 'https://via.placeholder.com/150',
            questions: [
                {
                    order: 1,
                    question: 'Câu hỏi 1',
                    answer: '1',
                    location: {
                        type: 'Point',
                        coordinates: [106.8019, 10.8734]
                    },
                    info: '<b>Địa điểm 1</b><br>Địa chỉ 1 <br> Thành phố 1'
                },
                {
                    order: 2,
                    question: 'Câu hỏi 2',
                    answer: '2',
                    location: {
                        type: 'Point',
                        coordinates: [106.8019, 10.8734]
                    },
                    info: '<b>Địa điểm 2</b><br>Địa chỉ 2 <br> Thành phố 2'
                }
            ],
        });

        let quest2 = await Quest.create({
            title: 'Hà Nội - Thủ đô nghìn năm văn hiến',
            description: 'Khám phá lịch sử, kiến trúc, các địa điểm nổi tiếng của Hà Nội',
            price: 100000,
            image: 'https://via.placeholder.com/150',
            questions: [
                {
                    order: 1,
                    question: 'Câu hỏi 1',
                    answer: '1',
                    location: {
                        type: 'Point',
                        coordinates: [106.8019, 10.8734]
                    },
                    info: '<b>Địa điểm 1</b><br>Địa chỉ 1 <br> Thành phố 1'
                },
            ],
        });

        let user = await User.create({
            email: 'new@email.com',
            password: '123456'
        });

        let user2 = await User.create({
            email: '1@1.co',
            password: '123456'
        });

        await Order.create({
            user: user,
            quest: quest1,
            status: 'completed'
        });

        await Order.create({
            user: user2,
            quest: quest1,
            status: 'completed'
        });

        await Order.create({
            user: user2,
            quest: quest2,
            status: 'completed'
        });

        let Attempt1 = await Attempt.create({
            user: user,
            quest: quest1,
            score: 1
        });

        await Attempt.create({
            user: user2,
            quest: quest1,
            score: 1
        });

        await Attempt.create({
            user: user2,
            quest: quest2,
            score: 1
        });

        await Rating.create({
            user: user,
            quest: quest1,
            score: 5
        });

        await Rating.create({
            user: user2,
            quest: quest1,
            score: 3
        });

        await Rating.create({
            user: user2,
            quest: quest2,
            score: 2
        });

    }
    catch (err) {
        console.log(err);
    }
}