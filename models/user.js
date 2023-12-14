const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        set: value => bcrypt.hashSync(value, 10)
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin', 'creator', 'pending']
    },
});

UserSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'user'
});

UserSchema.virtual('quests', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'user',
    match: { status: 'approved' },
    options: { select: 'quest' }
});

UserSchema.virtual('attempts', {
    ref: 'Attempt',
    localField: '_id',
    foreignField: 'user'
});

UserSchema.virtual('rating', {
    ref: 'Rating',
    localField: '_id',
    foreignField: 'user'
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);