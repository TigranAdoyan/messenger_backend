const mongoose = require('mongoose');
const connection = require('./connection');

const schema = new mongoose.Schema({
    accessType: {
        type: 'String',
        enum: ['public', 'secret']
    },
    gameType: {
        type: 'String',
        enum: ['single', 'friendly']
    },
    status: {
        type: 'String',
        enum: ['PENDING', 'PROCESS', 'FINISHED']
    },
    playersIds: {
        type: ['String'],
        minlength: 2,
        maxlength: 4,
    },
    startedAt: {
        type: 'Date',
        default: Date.now
    },
    finishedAt: {
        type: 'Date',
        default: Date.now
    },
});

module.exports = connection.model('games', schema);
