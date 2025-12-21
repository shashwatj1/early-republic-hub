// ========================================
// GAME 7: CONSTITUTIONAL LAWYER
// ========================================

const cases = [
    {
        title: "Case #1: The National Bank (1791)",
        description: "Is Congress allowed to create a national bank? The Constitution doesn't explicitly say so.",
        arguments: [
            {
                text: "Elastic Clause allows implied powers necessary to execute listed powers",
                correct: true,
                explanation: "This is Hamilton's argument! The 'necessary and proper' clause gives flexibility."
            },
            {
                text: "Constitution must be interpreted strictly - no bank mentioned = no bank allowed",
                correct: false,
                explanation: "This was Jefferson's argument, but Washington sided with Hamilton."
            },
            {
                text: "States should decide whether to allow banks in their territories",
                correct: false,
                explanation: "This doesn't address federal power question."
            }
        ]
    },
    {
        title: "Case #2: Louisiana Purchase (1803)",
        description: "Can the President buy territory even though Constitution doesn't grant that power?",
        arguments: [
            {
                text: "Treaty-making power implicitly includes territorial acquisition",
                correct: true,
                explanation: "This is how Jefferson justified it! He used loose interpretation despite believing in strict interpretation."
            },
            {
                text: "We must amend Constitution first before buying territory",
                correct: false,
                explanation: "Jefferson considered this but worried France would back out."
            },
            {
                text: "Only Congress can approve territorial expansion",
                correct: false,
                explanation: "Congress did approve, but the President initiated it via treaty."
            }
        ]
    },
    {
        title: "Case #3: Embargo Act (1807)",
        description: "Can federal government ban all foreign trade to pressure Britain?",
        arguments: [
            {
                text: "Commerce Clause gives Congress power to regulate foreign trade",
                correct: true,
                explanation: "Correct! Though controversial, this fell under Congress's enumerated powers."
            },
            {
                text: "States have right to trade independently",
                correct: false,
                explanation: "Constitution explicitly gives foreign commerce power to Congress."
            },
            {
                text: "President has war powers to restrict trade",
                correct: false,
                explanation: "This was Congressional action, not presidential war powers."
            }
        ]
    }
];

let currentCase = 0;
let selectedArguments = [];

document.addEventListener('DOMContentLoaded', function() {
    loadCase();
});

function loadCase() {
    if (currentCase >= cases.length) {
        showFinalVerdict();
        return;
    }
    
    const case_obj = cases[currentCase];
    
    document.getElementById('caseTitle').textContent = case_obj.title;
    document.getElementById('caseDescription').textContent = case_obj.description;
    
    const optionsDiv = document.getElementById('argumentOptions');
    optionsDiv.innerHTML = case_obj.arguments.map((arg, index) => `
        <div class="argument-option" onclick="selectArgument(${index})">
            ${arg.text}
        </div>
    `).join('');
    
    document.getElementById('selectedEvidence').innerHTML = '<p class="text-muted">Select arguments to build your case...</p>';
    document.getElementById('presentBtn').disabled = true;
    document.getElementById('verdict').style.display = 'none';
    
    selectedArguments = [];
}

function selectArgument(index) {
    // Clear previous selections
    document.querySelectorAll('.argument-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select this argument
    document.querySelectorAll('.argument-option')[index].classList.add('selected');
    selectedArguments = [index];
    
    // Show evidence
    const case_obj = cases[currentCase];
    const arg = case_obj.arguments[index];
    
    document.getElementById('selectedEvidence').innerHTML = `
        <div class="evidence-item">
            <h5>Your Argument:</h5>
            <p>${arg.text}</p>
        </div>
    `;
    
    document.getElementById('presentBtn').disabled = false;
}

function presentCase() {
    if (selectedArguments.length === 0) return;
    
    const case_obj = cases[currentCase];
    const selectedArg = case_obj.arguments[selectedArguments[0]];
    
    const verdictDiv = document.getElementById('verdict');
    
    if (selectedArg.correct) {
        verdictDiv.innerHTML = `
            <div class="alert alert-success">
                <h3>✅ Court Rules in Your Favor!</h3>
                <p>${selectedArg.explanation}</p>
            </div>
        `;
    } else {
        verdictDiv.innerHTML = `
            <div class="alert alert-danger">
                <h3>❌ Court Rejects Your Argument</h3>
                <p>${selectedArg.explanation}</p>
                <p class="mt-2"><strong>The correct argument was:</strong> ${case_obj.arguments.find(a => a.correct).text}</p>
            </div>
        `;
    }
    
    verdictDiv.style.display = 'block';
}

function nextCase() {
    currentCase++;
    loadCase();
}

function showFinalVerdict() {
    document.getElementById('caseDisplay').innerHTML = `
        <div class="text-center">
            <h2>🏛️ All Cases Complete!</h2>
            <p class="lead">You've argued through the major constitutional debates of the Early Republic!</p>
            
            <div class="alert alert-info mt-4">
                <h5>📚 What You Learned:</h5>
                <ul class="text-start">
                    <li>How the Elastic Clause expanded federal power</li>
                    <li>Why Jefferson compromised his principles for Louisiana</li>
                    <li>How Constitution gave Congress control over foreign commerce</li>
                </ul>
            </div>
            
            <div class="text-center mt-4">
                <button class="btn btn-custom btn-lg" onclick="resetGame()">Try Again</button>
                <a href="/games" class="btn btn-outline-secondary btn-lg">Back to Games</a>
            </div>
        </div>
    `;
}

function resetGame() {
    currentCase = 0;
    location.reload();
}