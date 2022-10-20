const controllerValidator = require('../helpers/controllerValidator');
const CoreController = require('./core');
const gameService = require('../../../services/game');

class GameController extends CoreController {
    gameService = gameService;

    constructor() {
        super('game');
    }

    async create(req, res) {
        const {
            accessType,
            gameType,
            status,
            players
        } = req.body;

        const game = await gameService.startNewGame({
            accessType,
            gameType,
            status,
            players
        });

        res.json(game)
    }
}


module.exports = controllerValidator(new GameController());
