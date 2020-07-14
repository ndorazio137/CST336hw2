$(document).ready(function() {
    
    prompt("Enter Your Name");
    
    // Possible states of gameplay
    var gameState = Object.freeze({
        INTIALIZE: 0,
        DEAL: 1,
        DRAW: 2,
        WIN: 3,
        LOSE: 4,
        GAMEOVER: 5
    });

    // Card values.
    var values = [{ name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: 'T', value: 10 },
        { name: 'J', value: 11 },
        { name: 'Q', value: 12 },
        { name: 'K', value: 13 },
        { name: 'A', value: 14 }
    ];

    // Card suits.
    var suits = [{ name: 'C', value: 0 },
        { name: 'D', value: 1 },
        { name: 'H', value: 2 },
        { name: 'S', value: 3 }
    ];

    var hand;
    var __handSize = 5;
    var deck;
    var purse = 100;
    var bet = 0;
    var previouslyBetted = false;
    var previousBet = 0;
    var __currentGameState;

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

        $("#draw").click(function() {
            __currentGameState = gameState.DRAW;
            draw();
        });
    })();


    function draw() {
        if (gameState = gameState.DRAW) {
            // Disable all buttons except for "Draw".
            $("#draw").prop("disabled", true);
            $("#bet-one").prop("disabled", true);
            $("#bet-max").prop("disabled", true);
            $("#increase-bet").prop("disabled", true);
            $("#decrease-bet").prop("disabled", true);
            dealCards();
            let win = checkForWin(hand.cards);
            updateHeldCards();
            displayCards();
            
            if (win) {
                won();
            }
            else {
                lost();
            }
        }
    }

    // Adds one full deck.
    function addCardsToDeck() {
        values.forEach((val) => {
            suits.forEach((st) => {
                let card = new Card(st.name, st.value, val.name, val.value);
                deck.cards.push(card);
            });
        });
    }

    // Deals cards to the hand.
    function dealCards() {
        let i;
        for (i = 0; i < hand.cards.length; i++) {
            if ((hand.cards[i] == undefined) || (hand.cards[i].held == false)) {
                hand.cards[i] = deck.cards.pop();
            }
        }
        
        sortByValue(hand.cards);
    }

    // Updates cards on screen.
    function displayCards() {
        let i;
        for (i = 0; i < hand.cards.length; i++) {
            $(`#card${i}`).attr("src", "img/" + hand.cards[i].rankName +
                hand.cards[i].suitName + ".gif");
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
            ++purse;
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


    // Used to hold cards to prevent redeal. Toggles card's hold status on click.
    function holdCard() {
        let i;
        for (i = 0; i < __handSize; i++) {
            if (this.id.toString() == ("card" + i.toString())) {
                hand.cards[i].held = !hand.cards[i].held;
                if (hand.cards[i].held) {
                    // document.getElementById("card-held-" + i.toString()).style.color = "white";
                    document.getElementById("card-held-" + i.toString()).style.display = "inline-block";
                } 
                else {
                    // document.getElementById("card-held-" + i.toString()).style.color = "black";
                    document.getElementById("card-held-" + i.toString()).style.display = "none";
                }
            }
        }
    }
    
    // Switch which cards are visibly held so that it matches the actual "held" values.
    function updateHeldCards() {
        let i;
        for (i = 0; i < __handSize; i++) {
            if (hand.cards[i].held) {
                    // document.getElementById("card-held-" + i.toString()).style.color = "white";
                    document.getElementById("card-held-" + i.toString()).style.display = "inline-block";
                } 
                else {
                    // document.getElementById("card-held-" + i.toString()).style.color = "black";
                    document.getElementById("card-held-" + i.toString()).style.display = "none";
                }
        }
    }

    // Check for winning hands.
    function checkForWin(array) {
        if (royalFlush(array)) {
            return true;
        }
        
        if (straightFlush(array)) {
            return true;
        }
        
        if (fourOfAKind(array)) {
            return true;
        }
        
        if (fullHouse(array)) {
            return true;
        }
        
        if (flush(array)) {
            return true;
        }
        if (straight(array)) {
            return true;
        }
        
        if (threeOfAKind(array)) {
            return true;
        }
        
        if (twoPair(array)) {
            return true;
        }
        
        return false;
    }
    
    function won() {
        alert("You WIN!");
    }
    
    function lost() {
        alert("You lose...");
    }
    
    // Used to check hand for two pairs.
    function twoPair(array) {
        sortByValue(array);
        let i, count = 0;
        for (i = 0; i < (array.length - 1); i++) {
            if (array[i].rankValue == array[i + 1].rankValue) {
                ++i;
                ++count;
            }
        }
        
        if(count == 2) {
            return true;
        }
        
        return false;
    }
    
    // Used to check hand for three of a Kind.
    function threeOfAKind(array) {
        sortByValue(array);
        let i;
        for (i = 1; i < (array.length - 1); i++) {
            if ((array[i - 1].rankValue == array[i].rankValue)
                && (array[i].rankValue == array[i + 1].rankValue)) {
                return true;
            }
        }
        
        return false;
    }
    
    // Used to check hand for straight.
    function straight(array) {
        sortByValue(array);
        let i, count = 0;
        for (i = 0; i < (array.length - 1); i++) {
            if((array[i + 1].rankValue - array[i].rankValue) == 1) {
                ++count;
            }
        }
        
        if(count == (__handSize - 1)) {
            return true;
        }
        
        return false;
    }
    
    // Used to check hand for flush.
    function flush(array) {
        sortBySuit(array);
        
        if (array[0].suitValue == array[__handSize - 1].suitValue) {
            return true;
        }
        
        return false;
    }

    // Used to check hand for fullHouse.
    function fullHouse(array) {
        sortByValue(array);
        let i;
        let foundFullHouse = false;
        if (hand.cards[0].rankValue == hand.cards[1].rankValue) {
            if (hand.cards[1].rankValue == hand.cards[2].rankValue) {
                // three of a kind was found
                if (hand.cards[3].rankValue == hand.cards.rankValue[4]) {
                    // pair was found after three of a kind was found...FULL HOUSE!
                    foundFullHouse = true;
                }
            }
            else {
                // pair was found
                if (hand.cards[2].rankValue == hand.cards[3].rankValue) {
                    if (hand.cards[3].rankValue == hand.cards[4].rankValue) {
                        // three of a kind found after pair was found...FULL HOUSE!
                        foundFullHouse = true;
                    }
                }
            }
        }
        if (foundFullHouse) {
            return true;
        }
        
        return false;
    }
    
    function fourOfAKind(array) {
        sortByValue(array);
        let i;
        for (i = 1; i < (array.length - 2); i++) {
            if ((array[i - 1].rankValue == array[i].rankValue)
                && (array[i].rankValue == array[i + 1].rankValue)
                && (array[i+1].rankValue == array[i+2].rankValue)) {
                return true;
            }
        }
        
        return false;
    }
    
    function straightFlush(array) {
        sortByValue(array);
        sortBySuit(array);
        
        if (((array[__handSize - 1].rankValue - array[0].rankValue) == 4) 
            && (array[0].suitValue == array[__handSize - 1].suitValue)) {
            return true;
        }
        
        return false;
    }
    
    function royalFlush(array) {
        sortByValue(array);
        sortBySuit(array);
        
        if ((array[0].suitName == 'S') && (array[0].rankValue == 10) 
            && (array[__handSize - 1].suitName == 'S') 
            && (array[__handSize - 1].rankValue == 14)) {
            return true;
        }
        
        return false;
    }
    
    // Creates a card. 
    function Card(sName, sValue, rName, rValue) {
        let card = {
            suitName: sName,
            suitValue: sValue,
            rankName: rName,
            rankValue: rValue,
            held: false
        };

        return card;
    }

    // Creates a hand.
    function allocateHand(size) {
        let hand = {
            cards: new Array(size)
        };

        return hand;
    }

    // Creates the deck.
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

    // Simple insertion sort. Used to sort the hand to simplify checking winning hands.
    function sortByValue(array) {
        let length = array.length;
        for (let i = 1; i < length; i++) {
            let card = array[i];
            let j = i - 1;
            while (j >= 0 && array[j].rankValue > card.rankValue) {
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = card;
        }
    }

    // Simple insertion sort. Used to sort the hand by suit.
    function sortBySuit(array) {
        let length = array.length;
        for (let i = 1; i < length; i++) {
            let card = array[i];
            let j = i - 1;
            while (j >= 0 && array[j].suitValue > card.suitValue) {
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = card;
        }
    }

}); //ready


