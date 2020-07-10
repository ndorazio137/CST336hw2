$(document).ready(function() {

    $("#draw").on("click", draw);
    //possible states of gameplay
    var gameState = Object.freeze({
        UNINITIALIZED: 0,
        DEAL: 1,
        DRAW: 2,
        WIN: 3,
        LOSE: 4,
        GAMEOVER: 5
    });
    
    //card values
    var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    //card suits
    var suits = ['C', 'D', 'H', 'S'];

    var hand;
    var __handSize = 5;
    var __deckSize = 52; //52 cards in a deck. No Jokers.
    var deck;
    var __currentGameState = gameState.UNINITIALIZED;

    (function createDeck() {
        deck = Deck(0);
        hand = Hand(__handSize);
        let i = 0;
        (function initializeDeck() {
            ranks.forEach((rank) => {
                suits.forEach((suit) => {
                    let card = new Card(suit, rank);
                    deck.cards.push(card);
                    //deck.cards[i] = card;
                    console.log(deck.cards[i].value);
                    i++;
                });
            });
        })();
        //console.log(deck.cards[1]);
        shuffle(deck.cards);
        dealCards();
        __currentGameState = gameState.DEAL;
    })();
    
    function dealCards() {
        // fill hand
        let i;
        for (i = 0; i < hand.cards.length; i++) {
            //console.log(i);
            hand.cards[i] = deck.cards.pop();
            $(`#card${i}`).attr("src", "img/" + hand.cards[i].value +
                hand.cards[i].suit + ".gif");
        }
    }
    
    function draw() {
        
        dealCards();
    }
            
        
   

    
}); //ready

// Creates a card. 
function Card(suit, value) {
    let card = {
        value: value,
        suit: suit,
        held: false
    };

    return card;
}

function Hand(size) {
    let hand = {
       cards: new Array(size)
    };
    
    return hand;
}

function Deck(size) {
    let deck = {
        cards: new Array(size)
    };

    return deck;
}

function shuffle(array) {
    let i, temp, random;
    for (i = 0; i < array.length; i++) {
        temp = array[i];
        random = Math.floor(Math.random() * array.length);
        array[i] = array[random];
        array[random] = temp;
    }
    
    //return array;
}
