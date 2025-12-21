// ========================================
// GAME 2: GREAT DEBATE
// ========================================

const debates = [
    {
        topic: "Should Congress Create a National Bank?",
        federalistArgs: [
            { text: "A bank is necessary to stabilize currency and provide credit", strength: 3 },
            { text: "The Elastic Clause allows implied powers for effective government", strength: 3 },
            { text: "Britain and France have national banks - we need one to compete", strength: 2 }
        ],
        democraticArgs: [
            { text: "Constitution doesn't explicitly give power to create banks", strength: 3 },
            { text: "A national bank concentrates too much power in federal hands", strength: 3 },
            { text: "This benefits Northern merchants at expense of Southern farmers", strength: 2 }
        ]
    },
    {
        topic: "Should America Support France or Britain?",
        federalistArgs: [
            { text: "Britain is stable and our main trading partner", strength: 3 },
            { text: "French Revolution became too violent and radical", strength: 2 },
            { text: "British navy protects our merchant ships", strength: 2 }
        ],
        democraticArgs: [
            { text: "France helped us win independence - we owe them loyalty", strength: 3 },
            { text: "French are fighting for liberty, just like we did", strength: 3 },
            { text: "Britain still treats us like a colony", strength: 2 }
        ]
    },
    {
        topic: "Should We Have High Tariffs on Imports?",
        federalistArgs: [
            { text: "Tariffs protect American manufacturers from cheap foreign goods", strength: 3 },
            { text: "Industrial growth makes America strong and independent", strength: 3 },
            { text: "Tariff revenue funds the federal government", strength: 2 }
        ],
        democraticArgs: [
            { text: "Tariffs make tools and goods more expensive for farmers", strength: 3 },
            { text: "This is federal overreach - states should decide trade policy", strength: 2 },
            { text: "Free trade benefits consumers and farmers", strength: 3 }
        ]
    }
];

let playerSide = '';
let currentRound = 0;
let scores = { player: 0, opponent: 0 };

function selectCharacter(side) {
    playerSide = side;
    document.getElementById('characterSelect').style.display = 'none';
    document.getElementById('debateGame').style.display = 'block';
    
    const yourChar = side === 'federalist' ? '🔵 Alexander Hamilton (Federalist)' : '🔴 Thomas Jefferson (D-R)';
    const oppChar = side === 'federalist' ? '🔴 Thomas Jefferson (D-R)' : '🔵 Alexander Hamilton (Federalist)';
    
    document.getElementById('yourCharacter').textContent = yourChar;
    document.getElementById('opponentCharacter').textContent = oppChar;
    
    startRound();
}

function startRound() {
    if (currentRound >= debates.length) {
        showFinalResults();
        return;
    }
    
    const debate = debates[currentRound];
    document.getElementById('roundNumber').textContent = currentRound + 1;
    document.getElementById('topicTitle').textContent = debate.topic;
    
    document.getElementById('yourArguments').innerHTML = '';
    document.getElementById('opponentArguments').innerHTML = '';
    document.getElementById('roundResult').style.display = 'none';
    
    showArgumentChoices();
}

function showArgumentChoices() {
    const debate = debates[currentRound];
    const yourArgs = playerSide === 'federalist' ? debate.federalistArgs : debate.democraticArgs;
    
    const choicesDiv = document.getElementById('choiceButtons');
    choicesDiv.innerHTML = yourArgs.map((arg, index) => `
        <button class="choice-btn" onclick="makeArgument(${index})">
            ${arg.text}
        </button>
    `).join('');
}

function makeArgument(index) {
    const debate = debates[currentRound];
    const yourArgs = playerSide === 'federalist' ? debate.federalistArgs : debate.democraticArgs;
    const oppArgs = playerSide === 'federalist' ? debate.democraticArgs : debate.federalistArgs;
    
    const yourArg = yourArgs[index];
    
    // Add your argument
    addArgument('your', yourArg.text);
    
    // Opponent responds
    setTimeout(() => {
        const oppArg = oppArgs[Math.floor(Math.random() * oppArgs.length)];
        addArgument('opponent', oppArg.text);
        
        setTimeout(() => {
            evaluateRound(yourArg.strength, oppArg.strength);
        }, 1000);
    }, 1500);
    
    document.getElementById('argumentChoices').style.display = 'none';
}

function addArgument(side, text) {
    const targetDiv = side === 'your' ? 'yourArguments' : 'opponentArguments';
    const argDiv = document.createElement('div');
    argDiv.className = `argument-item ${side === 'opponent' ? 'opponent-argument' : ''}`;
    argDiv.textContent = text;
    document.getElementById(targetDiv).appendChild(argDiv);
}

function evaluateRound(yourStrength, oppStrength) {
    const resultDiv = document.getElementById('roundResult');
    
    let result = '';
    if (yourStrength > oppStrength) {
        scores.player++;
        result = `
            <div class="alert alert-success">
                <h4>✅ You won this round!</h4>
                <p>Your argument was stronger and more persuasive!</p>
            </div>
        `;
    } else if (yourStrength < oppStrength) {
        scores.opponent++;
        result = `
            <div class="alert alert-danger">
                <h4>❌ Your opponent won this round!</h4>
                <p>Their argument was more convincing.</p>
            </div>
        `;
    } else {
        result = `
            <div class="alert alert-warning">
                <h4>🤝 This round was a tie!</h4>
                <p>Both arguments were equally strong.</p>
            </div>
        `;
    }
    
    resultDiv.innerHTML = result + `
        <div class="text-center mt-3">
            <button class="btn btn-custom btn-lg" onclick="nextRound()">
                ${currentRound < debates.length - 1 ? 'Next Round →' : 'See Final Results →'}
            </button>
        </div>
    `;
    resultDiv.style.display = 'block';
}

function nextRound() {
    currentRound++;
    document.getElementById('argumentChoices').style.display = 'block';
    startRound();
}

function showFinalResults() {
    document.getElementById('debateGame').style.display = 'none';
    
    const finalDiv = document.getElementById('finalResults');
    const scoreDiv = document.getElementById('finalScore');
    
    let message = '';
    if (scores.player > scores.opponent) {
        message = '🏆 Victory! You won the debate!';
    } else if (scores.player < scores.opponent) {
        message = '📚 Defeat! Your opponent was more persuasive.';
    } else {
        message = '🤝 Draw! Both sides made strong arguments.';
    }
    
    scoreDiv.innerHTML = `
        <h3>${message}</h3>
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="alert alert-success">
                    <h4>Your Score: ${scores.player}</h4>
                </div>
            </div>
            <div class="col-md-6">
                <div class="alert alert-danger">
                    <h4>Opponent Score: ${scores.opponent}</h4>
                </div>
            </div>
        </div>
        <p class="mt-3">Both Federalists and Democratic-Republicans had valid points - understanding both perspectives is key to APUSH!</p>
    `;
    
    finalDiv.style.display = 'block';
}

function restartDebate() {
    currentRound = 0;
    scores = { player: 0, opponent: 0 };
    document.getElementById('finalResults').style.display = 'none';
    document.getElementById('characterSelect').style.display = 'block';
}