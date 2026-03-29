const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        default: 'other'
    },
    totalBudget: {
        type: Number,
        required: true
    },
    attendees: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    expenses: [
        {
            title: { type: String, required: true },
            amount: { type: Number, required: true },
            category: { type: String, default: 'other' }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);