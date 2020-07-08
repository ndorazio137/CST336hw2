$(document).ready(function() {
    
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
    
    function draw() {
         $(".card").attr("src", "img/cards/" +cards[0]);
    }
}); //ready