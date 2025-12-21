// ========================================
// GAME 6: CATEGORY BLITZ
// ========================================

const terms = [
    { name: "Tariff", category: "economic" },
    { name: "National Bank", category: "economic" },
    { name: "Whiskey Tax", category: "economic" },
    { name: "American System", category: "economic" },
    { name: "Elastic Clause", category: "federal" },
    { name: "Louisiana Purchase", category: "federal" },
    { name: "Hartford Convention", category: "federal" },
    { name: "Impressment", category: "european" },
    { name: "Embargo Act", category: "european" },
    { name: "War of 1812", category: "european" },
    { name: "Treaty of Ghent", category: "european" },
    { name: "Monroe Doctrine", category: "european" }
];

let gameActive = false;
let timeLeft = 60;
let score = 0;
let streak = 0;
let currentTermIndex = 0;
let shuffledTerms = [];
let timerInterval = null;

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    
    // Shuffle terms
    shuffledTerms = [...terms].sort(() => Math.random() - 0.5);
    currentTermIndex = 0;
    score = 0;
    streak = 0;
    timeLeft = 60;
    gameActive = true;
    
    showNextTerm();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        // Warning animation when < 10 seconds
        if (timeLeft <= 10) {
            document.getElementById('timer').classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function showNextTerm() {
    if (currentTermIndex >= shuffledTerms.length) {
        // Reshuffle if we run out
        shuffledTerms = [...terms].sort(() => Math.random() - 0.5);
        currentTermIndex = 0;
    }
    
    const term = shuffledTerms[currentTermIndex];
    document.getElementById('currentTerm').textContent = term.name;
}

function categorize(selectedCategory) {
    if (!gameActive) return;
    
    const term = shuffledTerms[currentTermIndex];
    const isCorrect = term.category === selectedCategory;
    
    if (isCorrect) {
        score++;
        streak++;
        
        // Bonus points for streaks
        if (streak >= 5) {
            score += 2;
            showNotification(`🔥 ${streak} streak! +3 points!`, 'success');
        } else {
            showNotification('✅ Correct!', 'success');
        }
    } else {
        streak = 0;
        showNotification('❌ Wrong category!', 'error');
    }
    
    updateDisplay();
    currentTermIndex++;
    showNextTerm();
}

function updateDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('streak').textContent = streak;
}

function endGame() {
    clearInterval(timerInterval);
    gameActive = false;
    
    document.getElementById('gameScreen').style.display = 'none';
    
    const resultsDiv = document.getElementById('resultsScreen');
    
    let grade = '';
    let message = '';
    
    if (score >= 30) {
        grade = '🏆 AMAZING!';
        message = 'You\'re a category sorting master!';
    } else if (score >= 20) {
        grade = '⭐ Great Job!';
        message = 'You really know your Early Republic history!';
    } else if (score >= 10) {
        grade = '👍 Good Work!';
        message = 'Not bad! Keep practicing!';
    } else {
        grade = '📚 Keep Studying!';
        message = 'You\'ll get better with practice!';
    }
    
    resultsDiv.innerHTML = `
        <h2 class="text-center mb-4">${grade}</h2>
        <div class="alert alert-success text-center">
            <h3>Final Score: ${score} points</h3>
            <p>${message}</p>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-4">
                <div class="alert alert-info text-center">
                    <h5>💰 Economic</h5>
                    <p class="small mb-0">Tariff, Bank, Taxes, American System</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="alert alert-warning text-center">
                    <h5>⚖️ Federal Power</h5>
                    <p class="small mb-0">Elastic Clause, Louisiana, Hartford</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="alert alert-success text-center">
                    <h5>🌍 European</h5>
                    <p class="small mb-0">Impressment, Embargo, War 1812, Monroe</p>
                </div>
            </div>
        </div>
        
        <div class="text-center mt-4">
            <button class="btn btn-custom btn-lg" onclick="resetGame()">Play Again</button>
            <a href="/games" class="btn btn-outline-secondary btn-lg">Back to Games</a>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
}

function resetGame() {
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('timer').classList.remove('warning');
}