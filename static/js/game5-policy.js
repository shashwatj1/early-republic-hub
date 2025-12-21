// ========================================
// GAME 5: POLICY MAKER
// ========================================

const scenarios = [
    {
        title: "The National Bank Question (1791)",
        description: "As a member of Congress, you must decide: Should we create a national bank as Hamilton proposes?",
        choices: [
            {
                text: "✅ Yes - Create the bank to stabilize currency and provide credit",
                alignment: "federalist",
                consequence: "You sided with Federalists! The bank stabilizes the economy but angers those who fear federal overreach. Jefferson is furious."
            },
            {
                text: "❌ No - Reject the bank as unconstitutional",
                alignment: "democratic",
                consequence: "You sided with Democratic-Republicans! States' rights are protected but the economy struggles without stable currency."
            }
        ]
    },
    {
        title: "The Whiskey Rebellion (1794)",
        description: "Farmers in Pennsylvania are refusing to pay the whiskey tax and threatening violence. What should President Washington do?",
        choices: [
            {
                text: "⚔️ Send troops to enforce the law",
                alignment: "federalist",
                consequence: "You chose the Federalist approach! Federal authority is established but farmers feel oppressed. Some compare you to King George III."
            },
            {
                text: "🤝 Negotiate and reduce the tax",
                alignment: "democratic",
                consequence: "You chose the Democratic-Republican approach! Farmers are happy but critics say you're showing federal weakness."
            }
        ]
    },
    {
        title: "France vs. Britain (1793)",
        description: "France and Britain are at war. France helped us win independence, but Britain is our main trading partner. Who should we support?",
        choices: [
            {
                text: "🇬🇧 Support Britain - Stability and trade matter most",
                alignment: "federalist",
                consequence: "You chose the Federalist position! Trade thrives but French supporters call you a traitor to revolutionary ideals."
            },
            {
                text: "🇫🇷 Support France - Loyalty to our revolutionary ally",
                alignment: "democratic",
                consequence: "You chose the Democratic-Republican position! You honor our debt to France but risk war with Britain's powerful navy."
            }
        ]
    },
    {
        title: "The Embargo Act (1807)",
        description: "Britain is impressing American sailors. Jefferson proposes stopping ALL trade to pressure Britain. Do you support this?",
        choices: [
            {
                text: "✅ Yes - Economic pressure will work",
                alignment: "democratic",
                consequence: "You supported Jefferson! But the embargo devastates American merchants more than Britain. The economy collapses."
            },
            {
                text: "❌ No - This will hurt America more than Britain",
                alignment: "federalist",
                consequence: "You opposed the embargo! Federalists agree, but the policy passes anyway. New England's economy is ruined."
            }
        ]
    },
    {
        title: "War of 1812 (1812)",
        description: "War Hawks want to declare war on Britain over impressment. But are we ready for war with the world's most powerful navy?",
        choices: [
            {
                text: "⚔️ Declare war - Defend national honor!",
                alignment: "democratic",
                consequence: "You supported the War Hawks! The war goes poorly at first - Washington burns - but ends with renewed nationalism."
            },
            {
                text: "🕊️ Avoid war - We're not ready",
                alignment: "federalist",
                consequence: "You opposed the war! Federalists agree but you're labeled unpatriotic. The war happens anyway."
            }
        ]
    }
];

let currentScenario = 0;
let scores = { federalist: 0, democratic: 0 };

document.addEventListener('DOMContentLoaded', function() {
    loadScenario();
});

function loadScenario() {
    if (currentScenario >= scenarios.length) {
        showFinalResults();
        return;
    }
    
    const scenario = scenarios[currentScenario];
    const displayDiv = document.getElementById('scenarioDisplay');
    
    displayDiv.innerHTML = `
        <h2 class="scenario-title">${scenario.title}</h2>
        <div class="scenario-description">${scenario.description}</div>
        <div class="choices">
            ${scenario.choices.map((choice, index) => `
                <button class="choice-btn" onclick="makeChoice(${index})">
                    ${choice.text}
                </button>
            `).join('')}
        </div>
    `;
    
    updateProgress();
}

function makeChoice(choiceIndex) {
    const scenario = scenarios[currentScenario];
    const choice = scenario.choices[choiceIndex];
    
    // Update scores
    scores[choice.alignment]++;
    
    // Show consequence
    const displayDiv = document.getElementById('scenarioDisplay');
    const choicesDiv = displayDiv.querySelector('.choices');
    
    choicesDiv.innerHTML = `
        <div class="consequence">
            <h4>📊 Consequence:</h4>
            <p>${choice.consequence}</p>
            <p class="mt-3">
                <strong>This was a ${choice.alignment === 'federalist' ? '🔵 Federalist' : '🔴 Democratic-Republican'} position.</strong>
            </p>
            <button class="btn btn-custom btn-lg mt-3" onclick="nextScenario()">
                ${currentScenario < scenarios.length - 1 ? 'Next Scenario →' : 'See Final Results →'}
            </button>
        </div>
    `;
    
    updateProgress();
}

function nextScenario() {
    currentScenario++;
    loadScenario();
}

function updateProgress() {
    document.getElementById('scenarioNum').textContent = currentScenario + 1;
    document.getElementById('fedScore').textContent = scores.federalist;
    document.getElementById('drScore').textContent = scores.democratic;
    
    const percentage = ((currentScenario + 1) / scenarios.length) * 100;
    document.getElementById('progress').style.width = percentage + '%';
}

function showFinalResults() {
    document.getElementById('scenarioDisplay').style.display = 'none';
    
    const resultsDiv = document.getElementById('finalResults');
    const total = scenarios.length;
    
    let alignment = '';
    let description = '';
    
    if (scores.federalist > scores.democratic) {
        alignment = '🔵 Federalist';
        description = `You leaned Federalist! You believe in strong federal government, economic development, and order. Like Hamilton, you think America needs a powerful central government to succeed.`;
    } else if (scores.democratic > scores.federalist) {
        alignment = '🔴 Democratic-Republican';
        description = `You leaned Democratic-Republican! You believe in states' rights, agriculture, and limited federal power. Like Jefferson, you think local control and individual liberty are most important.`;
    } else {
        alignment = '⚖️ Moderate';
        description = `You're balanced! Like many Americans of the era, you see merit in both sides. The best policies often combined Federalist and Democratic-Republican ideas.`;
    }
    
    resultsDiv.innerHTML = `
        <h2 class="text-center mb-4">🏛️ Your Political Profile</h2>
        <div class="alert alert-info text-center">
            <h3>${alignment}</h3>
            <p class="mb-0">${description}</p>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="alert alert-primary">
                    <h4>🔵 Federalist Decisions: ${scores.federalist}/${total}</h4>
                </div>
            </div>
            <div class="col-md-6">
                <div class="alert alert-danger">
                    <h4>🔴 D-R Decisions: ${scores.democratic}/${total}</h4>
                </div>
            </div>
        </div>
        
        <div class="alert alert-warning mt-3">
            <h5>💡 Historical Note:</h5>
            <p class="mb-0">Both parties had valid concerns! Federalists built economic strength but risked tyranny. Democratic-Republicans protected liberty but sometimes left government too weak. Understanding BOTH perspectives is key to APUSH!</p>
        </div>
        
        <div class="text-center mt-4">
            <button class="btn btn-custom btn-lg" onclick="resetGame()">Play Again</button>
            <a href="/games" class="btn btn-outline-secondary btn-lg">Back to Games</a>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
}

function resetGame() {
    currentScenario = 0;
    scores = { federalist: 0, democratic: 0 };
    document.getElementById('finalResults').style.display = 'none';
    document.getElementById('scenarioDisplay').style.display = 'block';
    loadScenario();
}