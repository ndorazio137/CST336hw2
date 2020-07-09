$(document).ready(function() {

     // card suit enum
    var suit = Object.freeze({
        CLUBS: "clubs",
        DIAMONDS: "diamonds",
        HEARTS: "hearts",
        SPADES: "spades"
    });
    
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
    var values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    
    var __currentGameState = gameState.UNINITIALIZED; //starting gamestate
    var __value; //card's face value
    var __suit; //cards suit
    var __held; //is card legal
    var __startingCoins = 100; //number of coins at start
    var __coins = __startingCoins; //number of coins in purse
    var __bet = 1; //number of coins currently betting
   
    //card images
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
        if (__holds[0] == false) {
            setHold(index, true);
        }
        else {
            setHold(index, false);
        }
    });
    
    function draw() {
        for(let i = 1; i <= handSize; i++) {
            if(__holds[i-1] != true) {
                let index = Math.floor(Math.random() * numCards);
                $(`#card${i}`).attr("src", "img/" + cards[index]);
            }
        }
    }
    
    function card(suit, value) {
        this.__suit = suit;
        this.__value = value;
        this.__held = false;
    }
    
    set hold(card) {

    }
}); //ready


    
   
    
    