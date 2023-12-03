const mongoose = require('mongoose');

const QuestionSchema = require('./question').schema;
const RatingSchema = require('./rating').schema;
const User = require('./user');

const QuestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
        // required: true,
        // trim: true,
        // maxlength: 1000
    },
    questions: [QuestionSchema],

    ratings: [RatingSchema],


    // creator, location, category, tags, status, createdDate, updatedDate

});

QuestSchema.pre('validate', function (next) {
    this.questions.sort((a, b) => {
        return a.order > b.order ? -1 : 1;
    });
    next();
});

QuestSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'quest'
});

QuestSchema.virtual('attempts', {
    ref: 'Attempt',
    localField: '_id',
    foreignField: 'quest'
});

QuestSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) return 0;
    return this.ratings.reduce((acc, cur) => acc + cur.rating, 0) / this.ratings.length;
});

QuestSchema.virtual('totalAttempts').get(function () {
    return this.attempts.length;
});

QuestSchema.virtual('totalOrders').get(function () {
    return this.orders.length;
});


QuestSchema.set('toObject', { virtuals: true });
QuestSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Quest', QuestSchema);