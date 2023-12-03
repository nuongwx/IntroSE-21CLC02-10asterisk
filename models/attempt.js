const mongoose = require('mongoose');

const Quest = require('./quest');
const User = require('./user');

const AttemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    quest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quest',
    },
    score: {
        type: Number,
        default: 0
    },
    time: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// unique user-quest pair
AttemptSchema.index({ user: 1, quest: 1 }, { unique: true });

module.exports = mongoose.model('Attempt', AttemptSchema);