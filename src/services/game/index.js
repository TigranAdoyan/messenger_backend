const RedisClients = require('../../Cores/Redis');
const MongoClients = require('../../mongo/gameDb');
const helpers = require('./helpers');
const dict = require('./dict');

class GameService {
   gameState = RedisClients.gameState;

   gameData = MongoClients.game;

   constructor() {
   }

   async startNewGame(props) {

      console.log(props);


     const game = await this.gameData.create({
         accessType: props.accessType,
         gameType: props.gameType,
         status: 'PENDING',
         playersIds: props.players,
      });

      const deck = helpers.shuffleCards(dict.deck);

      return game;
   }
}


module.exports = new GameService();
