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
    var suit = ["C", "D", "H", "S"];
    
    var __currentGameState = gameState.UNINITIALIZED; //starting gamestate
    var __value; //card's face value
    var __suit; //cards suit
    var __held; //is card legal
    var __startingCoins = 100; //number of coins at start
    var coins = __startingCoins; //number of coins in purse
    var bet = 1; //number of coins currently betting
    var __hand; // players showing hand.
    var __handSize = 5; 
    var __deckSize = 52; //52 cards in a deck. No Jokers.
    var __deck; //playing deck to deal from.
    
    (function initialize() {
        if (__currentGameState == gameState.UNINITIALIZED)
        {
            // create hand and deck.
            __hand = new Array(__handSize);
            Deck();
            
            
            // fill hand
            let i;
            for (i = 1; i <= __handSize; i++) {
                __hand[i - 1] = __deck.pop();
                $(`#card${i}`).attr("src", "img/" + __hand[i - 1].__value +
                 __hand[i - 1].__suit + ".gif");
            }
        }
    })();
    
    // Constructor. Creates a card. 
    function Card(suit, value) {
        this.__suit = suit;
        this.__value = value;
        this.__held = false;
    }
    
    // Creates and Loads Deck with cards.
    function Deck() {
        __deck = new Array(__deckSize);
        let i, j, card;
        for (i = 0; i < ranks.length; i++) {
            for (j = 0; j < suit.length; j++) {
                card = new Card(suit[j], ranks[i]);
                __deck.push(card);
            }
        }
        shuffle(__deck);
    }
    
    function shuffle(array) {
        let i, temp, random;
        for(i = 0; i < __deckSize; i++) {
            temp = array[i];
            random = Math.floor(Math.random() * __deckSize);
            array[i] = array[random];
            array[random] = temp;
        }
    }
    
    // Insertion sort for hand. Needed to simplify winning hand checks.
    function sort(array) {
        let i, key, j;
        for (i = 1; i < array.length; i++) {
            key = array[i];
            j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j = j -1;
            }
            array[j + 1] = key;
        }
    }
    
    
}); //ready


    
   
    
    