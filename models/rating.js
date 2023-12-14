const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    score: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rating', RatingSchema);