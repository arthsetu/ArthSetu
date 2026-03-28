const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    members: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            share: {
                type: Number,
                required: true
            },
            paid: {
                type: Boolean,
                default: false
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
