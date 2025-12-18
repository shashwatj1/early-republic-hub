// ========================================
// ECONOMIC POLICY ROOM - JAVASCRIPT
// ========================================

// Tariff Slider Logic
document.addEventListener('DOMContentLoaded', function() {
    const tariffSlider = document.getElementById('tariffSlider');
    if (tariffSlider) {
        tariffSlider.addEventListener('input', updateTariffReactions);
        updateTariffReactions(); // Initial display
    }
    
    // Setup American System drag and drop
    setupAmericanSystemPuzzle();
});

function updateTariffReactions() {
    const rate = parseInt(document.getElementById('tariffSlider').value);
    document.getElementById('tariffRate').textContent = rate;
    
    // Federalist reactions
    let fedReaction = '';
    if (rate >= 40) {
        fedReaction = '🎉 Excellent! High tariffs protect our Northern manufacturers from cheap British goods. American industry will thrive!';
    } else if (rate >= 20) {
        fedReaction = '👍 Good, but we could go higher. American businesses need strong protection to compete with Europe.';
    } else if (rate >= 10) {
        fedReaction = '😐 Too low. Without adequate protection, British manufacturers will flood our markets and destroy American jobs.';
    } else {
        fedReaction = '😠 Unacceptable! Free trade will ruin American manufacturing. We need tariffs to build a strong economy!';
    }
    
    // Democratic-Republican reactions
    let demReaction = '';
    if (rate >= 40) {
        demReaction = '😡 Outrageous! High tariffs make imported tools expensive, hurting farmers. This only helps wealthy Northern merchants!';
    } else if (rate >= 20) {
        demReaction = '😟 Still too high. Farmers need affordable imported goods. These tariffs unfairly benefit the North at our expense.';
    } else if (rate >= 10) {
        demReaction = '🤔 More reasonable, but tariffs still burden farmers more than anyone else. States should decide their own trade policies.';
    } else {
        demReaction = '😊 Excellent! Free trade is best for farmers and consumers. Let markets work naturally without government interference!';
    }
    
    document.getElementById('federalistReaction').textContent = fedReaction;
    document.getElementById('democraticReaction').textContent = demReaction;
    
    // Update economic impact stats
    updateEconomicStats(rate);
}

function updateEconomicStats(rate) {
    const manufacturing = document.getElementById('manufacturingStat');
    const agriculture = document.getElementById('agricultureStat');
    const prices = document.getElementById('pricesStat');
    
    if (rate >= 30) {
        manufacturing.innerHTML = '📈📈📈<br><span class="small">Thriving!</span>';
        agriculture.innerHTML = '📉📉<br><span class="small">Struggling</span>';
        prices.innerHTML = '💰💰💰<br><span class="small">Expensive</span>';
    } else if (rate >= 15) {
        manufacturing.innerHTML = '📈📈<br><span class="small">Growing</span>';
        agriculture.innerHTML = '📉<br><span class="small">Challenged</span>';
        prices.innerHTML = '💰💰<br><span class="small">Moderate</span>';
    } else {
        manufacturing.innerHTML = '📉<br><span class="small">Weak</span>';
        agriculture.innerHTML = '📈📈<br><span class="small">Prospering</span>';
        prices.innerHTML = '💰<br><span class="small">Affordable</span>';
    }
}

// Whiskey Tax Calculator
function calculateWhiskeyTax() {
    const gallons = parseInt(document.getElementById('whiskeyGallons').value) || 0;
    const taxRate = 0.09; // $0.09 per gallon
    const totalTax = gallons * taxRate;
    
    document.getElementById('taxAmount').textContent = '$' + totalTax.toFixed(2);
    
    // Context based on amount
    let context = '';
    if (totalTax > 20) {
        context = `That's a LOT of money for a frontier farmer! For context, $${totalTax.toFixed(2)} in 1791 would be like paying around $${(totalTax * 30).toFixed(0)} today. Many farmers said this tax threatened their livelihood.`;
    } else if (totalTax > 10) {
        context = `$${totalTax.toFixed(2)} might not sound like much, but for a poor frontier farmer in 1791, this was a significant burden. Whiskey was often the only way they could make money from their grain crops.`;
    } else {
        context = `While $${totalTax.toFixed(2)} seems modest, remember that frontier farmers had almost no cash income. They used whiskey as currency! Any tax was seen as unfair.`;
    }
    
    document.getElementById('taxContext').textContent = context;
    document.getElementById('taxResults').style.display = 'block';
}

function showRebellionInfo() {
    showNotification('The Whiskey Rebellion (1794): Farmers in western Pennsylvania refused to pay the whiskey tax. Washington sent 13,000 troops - larger than the army that won the Revolution! This showed the new federal government could enforce its laws. The rebellion collapsed without major fighting.', 'info');
    
    // Create a modal with more info
    const modal = `
        <div class="modal fade" id="rebellionModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">⚔️ The Whiskey Rebellion (1794)</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>What Happened:</h6>
                        <ul>
                            <li>Western Pennsylvania farmers refused to pay the whiskey tax</li>
                            <li>They tarred and feathered tax collectors</li>
                            <li>Created an armed resistance of about 500 men</li>
                        </ul>
                        
                        <h6>Government Response:</h6>
                        <ul>
                            <li>Washington personally led 13,000 militia troops</li>
                            <li>Largest armed force assembled in North America up to that point</li>
                            <li>Rebellion collapsed without major battle</li>
                            <li>About 20 men arrested, 2 convicted of treason (later pardoned)</li>
                        </ul>
                        
                        <h6>Significance:</h6>
                        <ul>
                            <li><strong>Federalist View:</strong> Victory! Proved federal government could enforce laws and maintain order</li>
                            <li><strong>Democratic-Republican View:</strong> Overreaction. Government using military force against its own citizens over an unfair tax</li>
                            <li><strong>Long-term Impact:</strong> Established precedent that federal government has authority to enforce its laws, even against armed resistance</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Got it!</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page if not exists
    if (!document.getElementById('rebellionModal')) {
        document.body.insertAdjacentHTML('beforeend', modal);
    }
    
    // Show modal
    const modalEl = new bootstrap.Modal(document.getElementById('rebellionModal'));
    modalEl.show();
}

// American System Puzzle
let systemPuzzle = {
    bank: false,
    tariff: false,
    roads: false
};

function setupAmericanSystemPuzzle() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const slots = document.querySelectorAll('.puzzle-slot');
    
    if (!pieces.length) return;
    
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('piece', this.dataset.piece);
        });
    });
    
    slots.forEach(slot => {
        slot.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        slot.addEventListener('drop', function(e) {
            e.preventDefault();
            const pieceType = e.dataTransfer.getData('piece');
            const slotType = this.dataset.piece;
            
            if (pieceType === slotType) {
                // Correct placement
                this.classList.add('filled');
                this.innerHTML = `
                    <div class="slot-label">${this.querySelector('.slot-label').textContent}</div>
                    <div class="text-success fw-bold">✅ Correct!</div>
                `;
                systemPuzzle[pieceType] = true;
                
                // Mark piece as placed
                const piece = document.querySelector(`.puzzle-piece[data-piece="${pieceType}"]`);
                piece.classList.add('placed');
                piece.draggable = false;
                
                showNotification('Correct placement! ✅', 'success');
            } else {
                showNotification('Not quite! Try a different piece.', 'warning');
            }
        });
    });
}

function checkAmericanSystem() {
    const allPlaced = systemPuzzle.bank && systemPuzzle.tariff && systemPuzzle.roads;
    const resultsDiv = document.getElementById('systemResults');
    
    if (allPlaced) {
        resultsDiv.innerHTML = `
            <div class="alert alert-success">
                <h4>🎉 Perfect! You've assembled the American System!</h4>
                <p><strong>These three parts worked together:</strong></p>
                <ol>
                    <li><strong>National Bank</strong> provided stable currency and credit for businesses</li>
                    <li><strong>Protective Tariffs</strong> raised prices on imports, helping American manufacturers compete</li>
                    <li><strong>Internal Improvements</strong> (roads, canals) connected regions and helped farmers get goods to market</li>
                </ol>
                <p class="mb-0"><strong>The Irony:</strong> Henry Clay (a Democratic-Republican) championed this plan, but it used <em>Federalist</em> ideas about strong federal power! Shows how the D-Rs evolved after the War of 1812.</p>
            </div>
        `;
    } else {
        const missing = [];
        if (!systemPuzzle.bank) missing.push('National Bank');
        if (!systemPuzzle.tariff) missing.push('Protective Tariffs');
        if (!systemPuzzle.roads) missing.push('Internal Improvements');
        
        resultsDiv.innerHTML = `
            <div class="alert alert-warning">
                <h5>Not quite complete yet!</h5>
                <p>You're still missing: <strong>${missing.join(', ')}</strong></p>
                <p>Drag all three pieces into their correct slots, then check again!</p>
            </div>
        `;
    }
    
    resultsDiv.style.display = 'block';
}
