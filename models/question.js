const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    answer: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            // required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    info: {
        type: String,
        // required: true,
        trim: true,
        maxlength: 1000
    },
});

module.exports = mongoose.model('Question', QuestionSchema);