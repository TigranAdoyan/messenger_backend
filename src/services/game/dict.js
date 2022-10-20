const suits = [
   'spade',
   'heart',
   'diamond',
   'club'
];

const cards = [
    'age',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'jack',
    'queen',
    'king'
];

const deck = (function () {
    const deck = [];

    cards.forEach((card) => {
        suits.forEach((suit) => {
            deck.push({
                card,
                suit
            })
        })
    });

    return deck;
})();

console.log(deck);

module.exports = {
    suits,
    cards,
    deck
}
