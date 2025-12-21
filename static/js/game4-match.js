// ========================================
// GAME 4: TRIPLE MATCH
// ========================================

const terms = [
    { name: "Tariff", party: "federalist", category: "economic" },
    { name: "Louisiana Purchase", party: "democratic", category: "federal" },
    { name: "National Bank", party: "federalist", category: "economic" },
    { name: "Embargo Act", party: "democratic", category: "european" },
    { name: "Hartford Convention", party: "federalist", category: "federal" },
    { name: "War of 1812", party: "democratic", category: "european" },
    { name: "Whiskey Tax", party: "federalist", category: "economic" },
    { name: "Monroe Doctrine", party: "democratic", category: "european" },
    { name: "Elastic Clause", party: "federalist", category: "federal" },
    { name: "American System", party: "democratic", category: "economic" }
];

let currentSelection = {
    term: null,
    party: null,
    category: null
};

let matchedTerms = [];
let score = 0;

document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

function initGame() {
    // Shuffle and display terms
    const shuffled = [...terms].sort(() => Math.random() - 0.5);
    const termsDiv = document.getElementById('termsColumn');
    
    termsDiv.innerHTML = shuffled.map((term, index) => `
        <div class="match-card term-card" data-term-index="${terms.indexOf(term)}" onclick="selectTerm(${terms.indexOf(term)})">
            <strong>${term.name}</strong>
        </div>
    `).join('');
    
    matchedTerms = [];
    score = 0;
    currentSelection = { term: null, party: null, category: null };
    
    updateDisplay();
}

function selectTerm(termIndex) {
    if (matchedTerms.includes(termIndex)) {
        showNotification('This term is already matched!', 'info');
        return;
    }
    
    // Clear previous selections
    document.querySelectorAll('.match-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    currentSelection = { term: termIndex, party: null, category: null };
    
    // Highlight selected term
    document.querySelector(`[data-term-index="${termIndex}"]`).classList.add('selected');
    
    updateDisplay();
}

function selectParty(party) {
    if (currentSelection.term === null) {
        showNotification('Select a term first!', 'warning');
        return;
    }
    
    // Remove previous party selection
    document.querySelectorAll('.party-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    currentSelection.party = party;
    
    // Highlight selected party
    document.querySelector(`[data-party="${party}"]`).classList.add('selected');
    
    updateDisplay();
}

function selectCategory(category) {
    if (currentSelection.term === null) {
        showNotification('Select a term first!', 'warning');
        return;
    }
    
    if (currentSelection.party === null) {
        showNotification('Select a party second!', 'warning');
        return;
    }
    
    // Remove previous category selection
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    currentSelection.category = category;
    
    // Highlight selected category
    document.querySelector(`[data-category="${category}"]`).classList.add('selected');
    
    // Check if match is correct
    checkMatch();
}

function checkMatch() {
    const term = terms[currentSelection.term];
    const isCorrect = 
        term.party === currentSelection.party && 
        term.category === currentSelection.category;
    
    if (isCorrect) {
        score++;
        matchedTerms.push(currentSelection.term);
        
        // Mark term as matched
        const termCard = document.querySelector(`[data-term-index="${currentSelection.term}"]`);
        termCard.classList.remove('selected');
        termCard.classList.add('matched');
        
        showNotification(`✅ Correct! ${term.name} matches!`, 'success');
        
        // Clear selections
        document.querySelectorAll('.party-card, .category-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        currentSelection = { term: null, party: null, category: null };
        
        updateDisplay();
        
        // Check if game complete
        if (matchedTerms.length === terms.length) {
            showGameComplete();
        }
    } else {
        // Wrong match
        let feedback = `❌ Not quite! ${term.name} is actually `;
        
        if (term.party !== currentSelection.party) {
            const correctParty = term.party === 'federalist' ? 'Federalist' : 'Democratic-Republican';
            feedback += `a ${correctParty} issue`;
        }
        
        if (term.category !== currentSelection.category) {
            const categoryNames = {
                'economic': 'Economic Policy',
                'federal': 'Federal Power',
                'european': 'European Relations'
            };
            feedback += ` in ${categoryNames[term.category]}`;
        }
        
        showNotification(feedback, 'error');
        
        // Clear party and category selections to try again
        document.querySelectorAll('.party-card, .category-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        currentSelection.party = null;
        currentSelection.category = null;
        
        updateDisplay();
    }
}

function updateDisplay() {
    const displayDiv = document.getElementById('selectionDisplay');
    
    if (currentSelection.term !== null) {
        displayDiv.style.display = 'block';
        
        document.getElementById('selectedTerm').textContent = 
            terms[currentSelection.term].name;
        
        document.getElementById('selectedParty').textContent = 
            currentSelection.party ? 
            (currentSelection.party === 'federalist' ? '🔵 Federalist' : '🔴 D-R') : 
            '-';
        
        document.getElementById('selectedCategory').textContent = 
            currentSelection.category ? 
            ({
                'economic': '💰 Economic',
                'federal': '⚖️ Federal Power',
                'european': '🌍 European'
            }[currentSelection.category]) : 
            '-';
    } else {
        displayDiv.style.display = 'none';
    }
    
    // Update score
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = terms.length;
    
    const percentage = (score / terms.length) * 100;
    document.getElementById('progressBar').style.width = percentage + '%';
}

function showGameComplete() {
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerHTML = `
        <div class="alert alert-success">
            <h3>🏆 Perfect! All ${terms.length} matches complete!</h3>
            <p class="mb-0">You successfully matched every term to its party and category!</p>
        </div>
        
        <h5 class="mt-4">Review:</h5>
        <div class="row g-3">
            <div class="col-md-4">
                <h6>💰 Economic Policy:</h6>
                <ul class="small">
                    ${terms.filter(t => t.category === 'economic').map(t => 
                        `<li>${t.name} (${t.party === 'federalist' ? 'Fed' : 'D-R'})</li>`
                    ).join('')}
                </ul>
            </div>
            <div class="col-md-4">
                <h6>⚖️ Federal Power:</h6>
                <ul class="small">
                    ${terms.filter(t => t.category === 'federal').map(t => 
                        `<li>${t.name} (${t.party === 'federalist' ? 'Fed' : 'D-R'})</li>`
                    ).join('')}
                </ul>
            </div>
            <div class="col-md-4">
                <h6>🌍 European Relations:</h6>
                <ul class="small">
                    ${terms.filter(t => t.category === 'european').map(t => 
                        `<li>${t.name} (${t.party === 'federalist' ? 'Fed' : 'D-R'})</li>`
                    ).join('')}
                </ul>
            </div>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
}

function resetGame() {
    document.getElementById('results').style.display = 'none';
    document.querySelectorAll('.match-card').forEach(card => {
        card.classList.remove('selected', 'matched');
    });
    initGame();
}