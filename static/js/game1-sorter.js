// ========================================
// GAME 1: POLITICAL PARTY SORTER
// ========================================

const issues = [
    {
        title: "High Protective Tariffs",
        description: "Tax on imported goods to protect American manufacturers",
        answer: "federalist",
        explanation: "Federalists supported tariffs to protect Northern manufacturing!"
    },
    {
        title: "Strict Constitutional Interpretation",
        description: "Government can only do what's explicitly written in Constitution",
        answer: "democratic",
        explanation: "Democratic-Republicans believed in strict interpretation to limit federal power!"
    },
    {
        title: "National Bank",
        description: "Federal government creates a central bank to stabilize currency",
        answer: "federalist",
        explanation: "Federalists supported the national bank (Hamilton's idea)!"
    },
    {
        title: "States' Rights",
        description: "Individual states should have more power than federal government",
        answer: "democratic",
        explanation: "Democratic-Republicans championed states' rights!"
    },
    {
        title: "Strong Central Government",
        description: "Federal government should have significant power over states",
        answer: "federalist",
        explanation: "Federalists wanted a powerful federal government!"
    },
    {
        title: "Support for France",
        description: "America should support France in their war against Britain",
        answer: "democratic",
        explanation: "Democratic-Republicans favored France (revolutionary ally)!"
    },
    {
        title: "Support for Britain",
        description: "America should maintain close ties with Great Britain",
        answer: "federalist",
        explanation: "Federalists favored Britain (trade partner, stable government)!"
    },
    {
        title: "Loose Constitutional Interpretation",
        description: "Constitution's 'necessary and proper' clause allows flexibility",
        answer: "federalist",
        explanation: "Federalists supported loose interpretation for federal power!"
    },
    {
        title: "Agrarian Economy",
        description: "America should remain a nation of farmers and agriculture",
        answer: "democratic",
        explanation: "Democratic-Republicans idealized farming and rural life!"
    },
    {
        title: "Manufacturing Economy",
        description: "America should develop industrial manufacturing",
        answer: "federalist",
        explanation: "Federalists wanted to build American industry!"
    },
    {
        title: "Opposition to Whiskey Tax",
        description: "Internal taxes on goods like whiskey are unfair to farmers",
        answer: "democratic",
        explanation: "Democratic-Republicans opposed internal taxes!"
    },
    {
        title: "Support War of 1812",
        description: "America should fight Britain to defend national honor",
        answer: "democratic",
        explanation: "Democratic-Republicans (War Hawks) pushed for War of 1812!"
    },
    {
        title: "Oppose War of 1812",
        description: "War with Britain will destroy New England's economy",
        answer: "federalist",
        explanation: "Federalists opposed the war (Hartford Convention)!"
    },
    {
        title: "Elastic Clause is Dangerous",
        description: "'Necessary and proper' clause gives too much federal power",
        answer: "democratic",
        explanation: "Democratic-Republicans feared the Elastic Clause!"
    }
];

let currentIndex = 0;
let scores = { federalist: 0, democratic: 0 };
let streak = 0;
let shuffledIssues = [];

document.addEventListener('DOMContentLoaded', function() {
    initGame();
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            swipeCard('federalist');
        } else if (e.key === 'ArrowRight') {
            swipeCard('democratic');
        }
    });
});

function initGame() {
    // Shuffle issues
    shuffledIssues = [...issues].sort(() => Math.random() - 0.5);
    currentIndex = 0;
    scores = { federalist: 0, democratic: 0 };
    streak = 0;
    
    updateScores();
    renderCard();
}

function renderCard() {
    const cardStack = document.getElementById('cardStack');
    
    if (currentIndex >= shuffledIssues.length) {
        showGameComplete();
        return;
    }
    
    const issue = shuffledIssues[currentIndex];
    
    const card = document.createElement('div');
    card.className = 'issue-card';
    card.innerHTML = `
        <h3>${issue.title}</h3>
        <p>${issue.description}</p>
    `;
    
    cardStack.innerHTML = '';
    cardStack.appendChild(card);
}

function swipeCard(choice) {
    if (currentIndex >= shuffledIssues.length) return;
    
    const issue = shuffledIssues[currentIndex];
    const card = document.querySelector('.issue-card');
    const isCorrect = choice === issue.answer;
    
    // Animate card
    card.classList.add(choice === 'federalist' ? 'swiping-left' : 'swiping-right');
    
    // Show feedback
    showFeedback(isCorrect, issue.explanation);
    
    // Update scores
    if (isCorrect) {
        scores[choice]++;
        streak++;
    } else {
        streak = 0;
    }
    
    updateScores();
    
    // Next card after delay
    setTimeout(() => {
        currentIndex++;
        renderCard();
    }, 1500);
}

function showFeedback(isCorrect, explanation) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback-overlay';
    feedback.innerHTML = isCorrect ? '✅' : '❌';
    feedback.style.color = isCorrect ? '#10b981' : '#ef4444';
    
    document.querySelector('.game-container').appendChild(feedback);
    
    setTimeout(() => feedback.classList.add('show'), 100);
    
    // Show explanation notification
    showNotification(
        isCorrect ? `✅ Correct! ${explanation}` : `❌ Wrong! ${explanation}`,
        isCorrect ? 'success' : 'error'
    );
    
    setTimeout(() => {
        feedback.remove();
    }, 1400);
}

function updateScores() {
    document.getElementById('federalistScore').textContent = scores.federalist;
    document.getElementById('democraticScore').textContent = scores.democratic;
    document.getElementById('streak').textContent = streak;
}

function showGameComplete() {
    const total = scores.federalist + scores.democratic;
    const percentage = Math.round((total / shuffledIssues.length) * 100);
    
    document.getElementById('cardStack').style.display = 'none';
    
    const completeDiv = document.getElementById('gameComplete');
    const finalScoreDiv = document.getElementById('finalScore');
    
    let message = '';
    if (percentage === 100) {
        message = `🏆 PERFECT SCORE! You got all ${shuffledIssues.length} correct!`;
    } else if (percentage >= 80) {
        message = `🌟 Excellent! You got ${total}/${shuffledIssues.length} correct (${percentage}%)`;
    } else if (percentage >= 60) {
        message = `👍 Good job! You got ${total}/${shuffledIssues.length} correct (${percentage}%)`;
    } else {
        message = `📚 Keep studying! You got ${total}/${shuffledIssues.length} correct (${percentage}%)`;
    }
    
    finalScoreDiv.innerHTML = `
        <h3>${message}</h3>
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="alert alert-primary">
                    <h5>🔵 Federalist Issues: ${scores.federalist}</h5>
                </div>
            </div>
            <div class="col-md-6">
                <div class="alert alert-danger">
                    <h5>🔴 D-R Issues: ${scores.democratic}</h5>
                </div>
            </div>
        </div>
    `;
    
    completeDiv.style.display = 'block';
}

function restartGame() {
    document.getElementById('gameComplete').style.display = 'none';
    document.getElementById('cardStack').style.display = 'block';
    initGame();
}