let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;

function startGame() {
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    document.getElementById('result').innerHTML = '';
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
    document.getElementById('player-hand').textContent = 'Player Hand: ';
    document.getElementById('dealer-hand').textContent = 'Dealer Hand: ';
    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(playerHand);
    dealCard(dealerHand, true);
    hideNewGameButton();
}

function dealCard(hand, hidden = false) {
    const cardValue = Math.floor(Math.random() * 13) + 1;
    const card = cardValue > 10 ? 10 : cardValue;
    hand.push(card);
    const handElement = hidden ? 'dealer-hand' : 'player-hand';
    document.getElementById(handElement).textContent += `${card} `;
    calculateScore();
}

function calculateScore() {
    playerScore = calculateHandScore(playerHand);
    dealerScore = calculateHandScore(dealerHand);
    if (playerScore === 21) {
        endGame('Player wins with Blackjack!');
    } else if (playerScore > 21) {
        endGame('Player busts. Dealer wins.');
    }
}

function calculateHandScore(hand) {
    let score = 0;
    let numAces = 0;
    for (let card of hand) {
        score += card;
        if (card === 1) {
            numAces++;
        }
    }
    while (numAces > 0 && score + 10 <= 21) {
        score += 10;
        numAces--;
    }
    return score;
}

function hit() {
    dealCard(playerHand);
}

function stand() {
    while (dealerScore < 17) {
        dealCard(dealerHand);
    }
    if (dealerScore > 21) {
        endGame('Dealer busts. Player wins!');
    } else if (dealerScore > playerScore) {
        endGame('Dealer wins.');
    } else if (dealerScore === playerScore) {
        endGame('It\'s a tie.');
    } else {
        endGame('Player wins!');
    }
}

function endGame(message) {
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    document.getElementById('result').textContent = message;
    showNewGameButton();
}

function showNewGameButton() {
    document.getElementById('new-game-button').style.display = 'block';
}

function hideNewGameButton() {
    document.getElementById('new-game-button').style.display = 'none';
}

function newGame() {
    startGame();
}
