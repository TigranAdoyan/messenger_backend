const _ = require('lodash');

function shuffleCards(cards) {
   const newCards = _.cloneDeep(cards);

   newCards.sort(() => Math.random() > 0.5);

   return newCards;
}

module.exports = {
   shuffleCards,
}