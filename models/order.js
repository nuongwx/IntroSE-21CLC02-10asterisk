const mongoose = require('mongoose');

const Quest = require('./quest');
const User = require('./user');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quest'
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// unique user-quest pair
// OrderSchema.index({ user: 1, quest: 1 }, { unique: true });

module.exports = mongoose.model('Order', OrderSchema);