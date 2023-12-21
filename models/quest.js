const mongoose = require('mongoose');

const QuestionSchema = require('./question').schema;
const RatingSchema = require('./rating').schema;
const User = require('./user');

const QuestSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        default: 0
    },
    images: [String],
    // image: {
    //     type: String,
    //     default: 'https://via.placeholder.com/150'
    // },
    questions: [QuestionSchema],

    ratings: [RatingSchema],

    duration: {
        type: Number,
        default: 0
    },
    distance: {
        type: Number,
        default: 0
    },
    commission: {
        type: Number,
        default: 0
    },

    // creator, location, category, tags, status, createdDate, updatedDate

});

QuestSchema.pre('validate', function (next) {
    this.questions.sort((a, b) => {
        return a.order > b.order ? 1 : -1;
    });
    next();
});

QuestSchema.virtual('image').get(function () {
    if (Array.isArray(this.images) && this.images.length > 0) {
        return this.images[0];
    }
    return 'https://via.placeholder.com/150';
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
    // Check if this.ratings is defined and is an array
    if (Array.isArray(this.ratings) && this.ratings.length > 0) {
        // Filter out null or undefined ratings and calculate the average
        const validRatings = this.ratings.filter(rating => rating && rating.rating !== undefined);

        if (validRatings.length > 0) {
            const sum = validRatings.reduce((acc, cur) => acc + cur.rating, 0);
            return sum / validRatings.length;
        }
    }

    return 0; // Return 0 if there are no valid ratings
});

QuestSchema.virtual('totalAttempts').get(function () {
    if (Array.isArray(this.attempts)) {
        return this.attempts.length;
    }
    return 0; // Return 0 if this.attempts is not an array
});

QuestSchema.virtual('totalOrders').get(function () {
    if (Array.isArray(this.orders)) {
        return this.orders.length;
    }
    return 0; // Return 0 if this.orders is not an array
});


QuestSchema.set('toObject', { virtuals: true });
QuestSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Quest', QuestSchema);