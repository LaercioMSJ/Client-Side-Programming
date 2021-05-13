// IIFE
(function(){

    const pokerSymbols = ["ACE", "KING", "QUEEN", "JACK", "10", "9", "8", "7", "6", "5", "4", "3", "2"]

    var deck = {};
    var hand = new Array(5); // Number of cards in the hand - 5 cards
    var remainingCardsInTheDeck = [];
    var sameSuit = true;
    var consecutiveNumbers  = true;
    var pokerHand = "";
    var highestValue = [0,0];
    var countSameValue = new Array(13);

    for (let i = 0; i < countSameValue.length; i++) {
        countSameValue[i] = new Array(2);
        countSameValue[i][0] = pokerSymbols[i];
        countSameValue[i][1] = 0;
    }

        //fetch('https://prog2700.netlify.app/json/cards/royalflush.json')
	//fetch('https://prog2700.netlify.app/json/cards/straightflush.json')

        //fetch('https://prog2700.netlify.app/json/cards/fourofakind.json')

        //fetch('https://prog2700.netlify.app/json/cards/fullhouse.json')

        //fetch('https://prog2700.netlify.app/json/cards/flush.json')

        //fetch('https://prog2700.netlify.app/json/cards/highstraight.json')

        //fetch('https://prog2700.netlify.app/json/cards/lowstraight.json')

        //fetch('https://prog2700.netlify.app/json/cards/threeofakind.json')

        //fetch('https://prog2700.netlify.app/json/cards/twopair.json')

        //fetch('https://prog2700.netlify.app/json/cards/pair.json')

        //fetch('https://prog2700.netlify.app/json/cards/acehigh.json')
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
    .then(function(response){ 
        return response.json()
    })
    .then(function(data){ 

        deck = data.cards;

        // Create a array with a index to each card [0,...51] that will be used to take random cards not repeated
        for (let i = 0; i < deck.length; i++) {
            remainingCardsInTheDeck.push(i);
        }


        // Requested 5 random non-repeated cards to add to the hand array
        for (let i = 0; i < hand.length; i++) {

            let len = remainingCardsInTheDeck.length;

            let randomPosition = Math.floor(Math.random() * len);

            hand[i] = new Array(2);

            // Just added the Deck index to the hand array
            hand[i][0] = remainingCardsInTheDeck[randomPosition];

            // Added the index that the card occupies in the pokerSymbols rank
            // This information will be used to organize the cards in the hand from the highest rank to the lowest rank
            hand[i][1] = pokerSymbols.indexOf(deck[hand[i][0]].value);

            remainingCardsInTheDeck.splice(randomPosition,1);
        }


        // Loop used to organize the cards in the hand from the highest rank to the lowest rank
        for (let i = 0; i < hand.length - 1; i++) {
            for (let j = 0, temp; j < hand.length - 1; j++) {
                if (hand[j][1] > hand[j+1][1]) {
                    temp = hand[j+1];
                    hand[j+1] = hand[j];
                    hand[j] = temp;
                };
            };
        };


        // Loop used to verify that all cards in the hand are in the same suit and are consecutive
        for (let i = 0; i < hand.length - 1; i++) {

            if (deck[hand[i][0]].suit !== deck[hand[i+1][0]].suit) {
                sameSuit = false;
            }

            if (pokerSymbols.indexOf(deck[hand[i+1][0]].value) - pokerSymbols.indexOf(deck[hand[i][0]].value) !== 1) {
                if (pokerSymbols.indexOf(deck[hand[i+1][0]].value) - pokerSymbols.indexOf(deck[hand[i][0]].value) !== 9) {
                    consecutiveNumbers = false
                }
            }
        }


        // Loop used to count how many of the cards in the hand have the same value
        for (let i = 0; i < hand.length; i++) {
            for (let j = 0; j < countSameValue.length; j++) {
                if (deck[hand[i][0]].value === countSameValue[j][0]) {
                    countSameValue[j][1] += 1;
                }
            }
        }

        // Loop used to store only the highest value of cards with the same value found
        for (let j = 0; j < countSameValue.length; j++) {
            if (highestValue[0] < countSameValue[j][1]) {
                highestValue[1] = highestValue[0];
                highestValue[0] = countSameValue[j][1];
            }
            else if (highestValue[1] < countSameValue[j][1]) {
                highestValue[1] = countSameValue[j][1];
            }
        }


        // Sequence of if statements used to check which poker hand the cards in the hand fit into
        if (deck[hand[0][0]].value === "ACE" && sameSuit && consecutiveNumbers) {
            pokerHand = "1# Royal Flush";
        }
        else if (sameSuit && consecutiveNumbers) {
            pokerHand = "2# Straight Flush";
        }
        else if (highestValue[0] === 4) {
            pokerHand = "3# Four of a Kind";
        }
        else if (highestValue[0] === 3 && highestValue[1] === 2) {
            pokerHand = "4# Full House";
        }
        else if (sameSuit) {
            pokerHand = "5# Flush";
        }
        else if (consecutiveNumbers) {
            pokerHand = "6# Straight";
        }
        else if (highestValue[0] === 3) {
            pokerHand = "7# Three of a Kind";
        }
        else if (highestValue[0] === 2 && highestValue[1] === 2) {
            pokerHand = "8# Two Pair";
        }
        else if (highestValue[0] === 2) {
            pokerHand = "9# Pair";
        }
        else {
            pokerHand = "10# High Card";
        }


        // Loop used to add the image of each card contained in the hand to the page's html
        for (let i = 0; i < hand.length; i++) {
            $(".hands").append("<img src=\"" + deck[hand[i][0]].image + "\">");
        }

        $(".text").append("<h1>" + pokerHand + "</h1>");
    });
})();
