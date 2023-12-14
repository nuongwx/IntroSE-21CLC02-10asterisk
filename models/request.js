const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    message: {
        type: String,
        required: true,
        trim: true,
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

// module.exports = mongoose.model('Request', RequestSchema);