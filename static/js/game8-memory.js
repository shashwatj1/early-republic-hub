// ========================================
// GAME 8: MEMORY MATCH
// ========================================

const pairs = [
    { term: "Tariff", definition: "Tax on imported goods" },
    { term: "Elastic Clause", definition: "'Necessary and proper' - allows implied powers" },
    { term: "Impressment", definition: "Forcing sailors into British Navy" },
    { term: "Embargo Act", definition: "Banned all foreign trade (1807)" },
    { term: "War of 1812", definition: "Second war with Britain" },
    { term: "Louisiana Purchase", definition: "Doubled U.S. size for $15M" },
    { term: "Hartford Convention", definition: "Federalist meeting that killed party" },
    { term: "Monroe Doctrine", definition: "Americas off-limits to Europe" }
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let startTime = null;
let timerInterval = null;

document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

function initGame() {
    // Create card array (term + definition for each pair)
    cards = [];
    pairs.forEach((pair, index) => {
        cards.push({ id: index, type: 'term', content: pair.term });
        cards.push({ id: index, type: 'definition', content: pair.definition });
    });
    
    // Shuffle cards
    cards = cards.sort(() => Math.random() - 0.5);
    
    // Create card elements
    const board = document.getElementById('memoryBoard');
    board.innerHTML = cards.map((card, index) => `
        <div class="memory-card" data-index="${index}" onclick="flipCard(${index})">
            <div class="card-front">?</div>
            <div class="card-back">${card.content}</div>
        </div>
    `).join('');
    
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    startTime = Date.now();
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    
    updateStats();
}

function flipCard(index) {
    const cardElement = document.querySelector(`[data-index="${index}"]`);
    
    // Don't flip if already flipped or matched
    if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) {
        return;
    }
    
    // Don't flip if two cards already flipped
    if (flippedCards.length >= 2) {
        return;
    }
    
    // Flip the card
    cardElement.classList.add('flipped');
    flippedCards.push(index);
    
    // Check for match when two cards are flipped
    if (flippedCards.length === 2) {
        moves++;
        updateStats();
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [index1, index2] = flippedCards;
    const card1 = cards[index1];
    const card2 = cards[index2];
    
    const cardElement1 = document.querySelector(`[data-index="${index1}"]`);
    const cardElement2 = document.querySelector(`[data-index="${index2}"]`);
    
    if (card1.id === card2.id) {
        // Match!
        cardElement1.classList.add('matched');
        cardElement2.classList.add('matched');
        matchedPairs++;
        
        showNotification('✅ Match found!', 'success');
        updateStats();
        
        // Check if game complete
        if (matchedPairs === pairs.length) {
            setTimeout(showResults, 500);
        }
    } else {
        // No match - flip back
        cardElement1.classList.remove('flipped');
        cardElement2.classList.remove('flipped');
    }
    
    flippedCards = [];
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = `${matchedPairs} / ${pairs.length}`;
}

function showResults() {
    clearInterval(timerInterval);
    const timeText = document.getElementById('timer').textContent;
    
    const resultsDiv = document.getElementById('results');
    
    let grade = '';
    if (moves <= 12) {
        grade = '🏆 PERFECT! Amazing memory!';
    } else if (moves <= 20) {
        grade = '⭐ Excellent! Great job!';
    } else if (moves <= 30) {
        grade = '👍 Good work!';
    } else {
        grade = '✅ Complete!';
    }
    
    resultsDiv.innerHTML = `
        <div class="alert alert-success text-center">
            <h3>${grade}</h3>
            <p><strong>Time:</strong> ${timeText}</p>
            <p><strong>Moves:</strong> ${moves}</p>
            <p class="mb-0">You matched all ${pairs.length} pairs!</p>
        </div>
        
        <div class="text-center mt-4">
            <button class="btn btn-custom btn-lg" onclick="resetGame()">Play Again</button>
            <a href="/games" class="btn btn-outline-secondary btn-lg">Back to Games</a>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
}

function resetGame() {
    document.getElementById('results').style.display = 'none';
    initGame();
}