const mongoose = require('mongoose');
const connection = require('./connection');

const {
    String,
    Boolean,
    Date,
    Array
} = mongoose.Schema.Types;

const schema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    receiverType: {
        type: String,
        enum: ['group', 'user'],
        required: true,
    },
    seen: {
        type: Boolean,
        default: false
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    content: {
        type: {
            text: {
                type: String,
                required: true,
            },
            files: {
                type: [{ type: String }],
                required: true,
            }
        }
    },
    deletedAt: {
        type: Date,
        default: null
    },
});

module.exports = connection.model('messages', schema);
