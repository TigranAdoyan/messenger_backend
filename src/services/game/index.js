const RedisClient = require('../../Cores/Redis');
const helpers = require('./helpers');
const dict = require('./dict');

const gameDataStructure = {
   token: 'some_token',
   players: [
      {
         id: 234,
         cards: [
            {

            }
         ]
      }
   ]
}

class Game {
   gameStorage = new RedisClient('game_state');

   constructor() {

   }

   async startNewGame() {
      const deck = helpers.shuffleCards(dict.deck);

      console.log(deck);
   }
}


module.exports = new Game();