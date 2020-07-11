$(document).ready(function() {

    //event listeners.
    $("#draw").on("click", draw);
    
    $("#card0").on("click", holdCard);
    $("#card1").on("click", holdCard);
    $("#card2").on("click", holdCard);
    $("#card3").on("click", holdCard);
    $("#card4").on("click", holdCard);

    //possible states of gameplay
    var gameState = Object.freeze({
        DEAL: 0,
        DRAW: 1,
        WIN: 2,
        LOSE: 3,
        GAMEOVER: 4
    });

    //card values.
    var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    //card suits.
    var suits = ['C', 'D', 'H', 'S'];

    var hand;
    var __handSize = 5;
    var deck;
    var purse = 100;
    var bet = 0;
    var previouslyBetted = false;
    var previousBet = 0;
    var __currentGameState = gameState.DEAL;

    (function game() {
        if (__currentGameState == gameState.DEAL) {
            initialize();
            $("#bet-one").on("click", betOne);
            $("#bet-max").on("click", betMax);
            $("#increase-bet").on("click", increaseBet);
            $("#decrease-bet").on("click", decreaseBet);
        }

        if (__currentGameState == gameState.DRAW) {
            draw();
        }

        if (__currentGameState == gameState.WIN) {

        }

        if (__currentGameState == gameState.LOSE) {

        }

        if (__currentGameState == gameState.GAMEOVER) {

        }
    })();

    function initialize() {
        deck = allocateDeck();
        hand = allocateHand(__handSize);
        addCardsToDeck();
        shuffle(deck.cards);
        dealCards();
        __currentGameState = gameState.DRAW;
    }

    function addCardsToDeck() {
        ranks.forEach((rank) => {
            suits.forEach((suit) => {
                let card = new Card(suit, rank);
                deck.cards.push(card);
            });
        });
    }

    // Deals the cards and updates the hand
    function dealCards() {
        // fill hand
        let i;
        for (i = 0; i < hand.cards.length; i++) {
            hand.cards[i] = deck.cards.pop();
            // Display hand to screen
            $(`#card${i}`).attr("src", "img/" + hand.cards[i].value +
                hand.cards[i].suit + ".gif");
        }
    }

    //Display held card text
    function holdCard(card) {
        card.held = !card.held;
    }

    //TODO: update for held cards
    function draw() {
        dealCards();
    }

    //TODO: revert if bet max was pressed first
    function betOne() {
        if (previouslyBetted == true) {
            purse = purse + previousBet;
        }
        
        if(purse > 0) {
            bet = 1;
            --purse;
            previousBet = bet;
            previouslyBetted = true;
        }
            
        displayBet();
    }

    //TODO: revert if bet one was pressed first
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

    function increaseBet() {
        if ((purse >= 0) && (bet < 5)) {
            ++bet;
            ++previousBet;
            --purse;
            previouslyBetted = true;
        }
        
        displayBet();
    }

    function decreaseBet() {
        if (bet > 1) {
            --bet;
            --previousBet;
            ++purse
            previouslyBetted = true;
        }
        
        displayBet();
    }

    function displayBet() {
        document.getElementById("purse-info").innerHTML = "PURSE: " + purse.toString() + " COINS";
        document.getElementById("bet-info").innerHTML = "BET: " + bet.toString() + " COINS";
        document.getElementById("bet-text").innerHTML = bet.toString();
    }

}); //ready

// Creates a card. 
function Card(suit, value) {
    let card = {
        value: value,
        suit: suit,
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

// Shuffles any array.
function shuffle(array) {
    let i, temp, random;
    for (i = 0; i < array.length; i++) {
        temp = array[i];
        random = Math.floor(Math.random() * i);
        array[i] = array[random];
        array[random] = temp;
    }
}
