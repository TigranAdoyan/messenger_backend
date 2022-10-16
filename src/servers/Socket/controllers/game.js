const events = {
   start_game: 'start_game'
}


class GameController {
   _namespace = 'game';

   _handlersBinding = {
      [events.start_game]: 'startGame',
   }

   startGame(payload) {

   }
}

module.exports = GameController;