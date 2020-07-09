$(document).ready(function() {
    
    var numCards = 52; //number of cards in deck
    var handSize = 5; //number of cards in a hand
    var hand;
    var coins = 100; //number of coins in purse
    
    var holds = [false, false, false, false, false]; // is card index held
    var cards = ["2C.gif", "2D.gif", "2H.gif", "2S.gif",
                "3C.gif", "3D.gif", "3H.gif", "3S.gif",
                "4C.gif", "4D.gif", "4H.gif", "4S.gif",
                "5C.gif", "5D.gif", "5H.gif", "5S.gif",
                "6C.gif", "6D.gif", "6H.gif", "6S.gif",
                "7C.gif", "7D.gif", "7H.gif", "7S.gif",
                "8C.gif", "8D.gif", "8H.gif", "8S.gif",
                "9C.gif", "9D.gif", "9H.gif", "9S.gif",
                "TC.gif", "TD.gif", "TH.gif", "TS.gif",
                "JC.gif", "JD.gif", "JH.gif", "JS.gif",
                "QC.gif", "QD.gif", "QH.gif", "QS.gif",
                "KC.gif", "KD.gif", "KH.gif", "KS.gif",
                "AC.gif", "AD.gif", "AH.gif", "AS.gif"];
    
    $("#draw").on("click", draw);
    $("#card1").on( "click", function() {
        if (holds[0] == false) {
            setHold(index, true);
        }
        else {
            setHold(index, false);
        }
    });
    
    function draw() {
        for(let i = 1; i <= handSize; i++) {
            if(holds[i-1] != true) {
                let index = Math.floor(Math.random() * numCards);
                $(`#card${i}`).attr("src", "img/" + cards[index]);
            }
        }
    }
    
    function setHold(index, bool) {
        holds[index] = bool;
    }
    
    function jackOrBetter() {
        
    }
}); //ready

class Card {
    
    // suit enum
    suit = Object.freeze({
        CLUBS: "clubs",
        DIAMONDS: "diamonds",
        HEARTS: "hearts",
        SPADES: "spades"
    });
    
    __value; //card's face value
    __suit; //cards suit
    __errorFlag; //is card legal
    
    constructor(suit, value) {
        set(suit, value);
    }
    
    set setSuit(suit) {
        if (isValid(value, suit)) {
            this.__suit = suit;
            __errorFlag = false;
            return __errorFlag;
        }
        this.__suit = suit;
        __errorFlag = true;
        return __errorFlag;
    }
    
    set setValue(value) {
        if (isValid(value, suit)) {
            this.__value = value;
            __errorFlag = false;
            return __errorFlag;
        }
        this.__value = value;
        __errorFlag = true;
        return __errorFlag;
    }
    
    isValid(suit, value) {
        if (__value == 'A' || __value == '2' || __value == '3' || __value == '4' || 
            __value == '5' || __value == '6' || __value == '7' || __value == '8' ||
            __value == '9' || __value == 'T' || __value == 'J' || __value == 'Q' ||
            __value == 'K') 
        {
            return true;
        } 
        return false;
    }
    
    equals(card) {
        if (card != null && card != undefined && card.__suit == this.__suit
            && card.__value == this.__value) {
            return true;
        }
        return false;
    }
    
    get getValue() {
        return __value;
    }
    
    get getSuit() {
        return __suit;
    }
    
    get getErrorFlag() {
        return __errorFlag;
    }
}

class Hand {
    static NUM_CARDS = 5; //cards per hand
    
    constructor() {
        
    }
    
}