$(document).ready(function() {

    //possible states of gameplay
    var gameState = Object.freeze({
        INTIALIZE: 0,
        DEAL: 1,
        DRAW: 2,
        WIN: 3,
        LOSE: 4,
        GAMEOVER: 5
    });

    //card values.
    //var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    var ranks = [{key: 1, value: 'A'},
                       {key: 2, value: '2'},
                       {key: 3, value: '3'},
                       {key: 4, value: '4'},
                       {key: 5, value: '5'},
                       {key: 6, value: '6'},
                       {key: 7, value: '7'},
                       {key: 8, value: '8'},
                       {key: 9, value: '9'},
                       {key: 10, value: 'T'},
                       {key: 11, value: 'J'},
                       {key: 12, value: 'Q'},
                       {key: 13, value: 'K'},
                       {key: 14, value: 'A'}];
    
    //card suits.
    var suits = ['C', 'D', 'H', 'S'];

    var hand;
    var __handSize = 5;
    var deck;
    var purse = 100;
    var bet = 0;
    var previouslyBetted = false;
    var previousBet = 0;
    var __currentGameState = gameState.INTIALIZE;

    (function initialize() {
        __currentGameState = gameState.DEAL;
        deck = allocateDeck();
        hand = allocateHand(__handSize);
        addCardsToDeck();
        shuffle(deck.cards);
        dealCards();
        displayCards();
        
        // Enable all buttons.
        $("#bet-one").on("click", betOne);
        $("#bet-max").on("click", betMax);
        $("#increase-bet").on("click", increaseBet);
        $("#decrease-bet").on("click", decreaseBet);
        $("#card0").on("click", holdCard);
        $("#card1").on("click", holdCard);
        $("#card2").on("click", holdCard);
        $("#card3").on("click", holdCard);
        $("#card4").on("click", holdCard);
        
        $("#draw").click(function(){
            __currentGameState = gameState.DRAW;
             draw();
        });
    })();
    
    //TODO: update for held cards
    function draw() {
        if (gameState = gameState.DRAW) {
            // Disable all buttons except for "Draw".
            $("#draw").prop("disabled", true);
            $("#bet-one").prop("disabled", true);
            $("#bet-max").prop("disabled", true);
            $("#increase-bet").prop("disabled", true);
            $("#decrease-bet").prop("disabled", true);
            $("#card0").prop("disabled", true);
            $("#card1").prop("disabled", true);
            $("#card2").prop("disabled", true);
            $("#card3").prop("disabled", true);
            $("#card4").prop("disabled", true);
            dealCards();
            sort(hand);
            displayCards();
        }
    }

    function addCardsToDeck() {
        let i;
        //starts at 1 to avoid duplicate Aces.
        for (i = 1; i < ranks.length; i++) {
            suits.forEach((suit) => {
                let card = new Card(suit, ranks[i].value, ranks[i].key);
                deck.cards.push(card);
            });
        }
    }

    // Deals cards to the hand
    function dealCards() {
        let i;
        for (i = 0; i < hand.cards.length; i++) {
            hand.cards[i] = deck.cards.pop(); 
        }
    }
    
    // Updates cards on screen.
    function displayCards() {
        for (i = 0; i < hand.cards.length; i++) {
            $(`#card${i}`).attr("src", "img/" + hand.cards[i].value +
                    hand.cards[i].suit + ".gif");
        }
    }

    // Bet one button was pressed.
    function betOne() {
        if (previouslyBetted == true) {
            purse = purse + previousBet;
        }

        if (purse > 0) {
            bet = 1;
            --purse;
            previousBet = bet;
            previouslyBetted = true;
        }

        displayBet();
    }

    // Bet max button was pressed.
    function betMax() {
        if (previouslyBetted == true) {
            purse = purse + previousBet;
        }

        if (purse >= 5) {
            bet = 5;
            purse = purse - 5;
            previousBet = bet;
            previouslyBetted = true;
        }

        displayBet();
    }

    // "+"/Increase Bet button was pressed.
    function increaseBet() {
        if ((purse >= 0) && (bet < 5)) {
            ++bet;
            ++previousBet;
            --purse;
            previouslyBetted = true;
        }

        displayBet();
    }

    // "-"/Decrease Bet button was pressed. 
    function decreaseBet() {
        if (bet == 0) {
            ++bet;
            --purse;
        }

        if (bet > 1) {
            --bet;
            --previousBet;
            ++purse
            previouslyBetted = true;
        }

        displayBet();
    }

    // Displays Purse and Bet text to screen.
    function displayBet() {
        document.getElementById("purse-info").innerHTML = "PURSE: " + purse.toString() + " COINS";
        document.getElementById("bet-info").innerHTML = "BET: " + bet.toString() + " COINS";
        document.getElementById("bet-text").innerHTML = bet.toString();
    }
    
    
    //TODO: finish.
    function holdCard() {
        
    }
    
    // check for winning hands.
    function checkForWin(array) {
       sort(array);
       
    }


}); //ready

// Creates a card. 
function Card(suit, value, key) {
    let card = {
        value: value,
        suit: suit,
        key: key,
        held: true
    };

    return card;
}

// Creates a hand
function allocateHand(size) {
    let hand = {
        cards: new Array(size)
    };

    return hand;
}

// Creates the deck
function allocateDeck() {
    let deck = {
        cards: []
    };

    return deck;
}

// Fisher-Yates shuffles. Used to shuffle a deck.
function shuffle(array) {
    let i, temp, random;
    for (i = 0; i < array.length; i++) {
        temp = array[i];
        random = Math.floor(Math.random() * i);
        array[i] = array[random];
        array[random] = temp;
    }
}


//TODO: Fix this.
// Simple insertion sort. Used to sort the hand to simplify checking winning hands.
function sort(array) {
    let i; 
    for (i = 1; array.length; i++) {
       let key = array[i];
       let j = i - 1;
       while (j >= 0 && array[j].key < array[j].key) {
           array[j + 1] = array[j];
           --j;
       }
       array[j + 1] = key;
    }
}



