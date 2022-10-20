const mongoose = require('mongoose');

const connection = mongoose.createConnection(configs.MONGO_GAME_URL);

connection.on('connected', () => {
    logger.info(`MongoDb: connected successfully "${configs.MONGO_GAME_URL}"`);
});

connection.on('disconnected', () => {
    logger.error(`MongoDb: disconnected ${configs.MONGO_GAME_URL}`);
});

module.exports = connection;
