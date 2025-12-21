// ========================================
// HISTORICAL THINKING SKILLS - JAVASCRIPT
// ========================================

// ========================================
// SKILL 1: CHANGE & CONTINUITY
// ========================================

const changeData = {
    1790: {
        changed: [],
        continued: [
            "Two major political parties competing for power",
            "Debates over how much power federal government should have and how much the state can have",
            "Arguments about interpreting the Constitution",
            "Tensions with European powers (Britain and France)"
        ],
        analysis: "In 1790, the new nation was just beginning. The Constitution was only 3 years old, and political parties were forming."
    },
    1800: {
        changed: [
            "Jefferson's Democratic-Republicans won presidency (peaceful transfer of power)",
            "Federalists losing political dominance"
        ],
        continued: [
            "Ongoing debates about federal power vs states' rights",
            "Economic disagreements about tariffs and taxes",
            "Constitutional interpretation battles"
        ],
        analysis: "The 'Revolution of 1800' showed democracy could work - power transferred peacefully from Federalists to Democratic-Republicans."
    },
    1807: {
        changed: [
            "Embargo Act crippled American economy",
            "Americans angry at Jefferson's policies",
            "Smuggling became widespread"
        ],
        continued: [
            "Britain still impressing American sailors",
            "European wars still affecting America",
            "Debates about how to respond to foreign threats"
        ],
        analysis: "Jefferson's Embargo Act was a disaster - 'peaceable coercion' failed to change British behavior but devastated American trade."
    },
    1812: {
        changed: [
            "United States at war with Britain",
            "Economy shifting from trade to domestic manufacturing",
            "National pride and identity growing stronger"
        ],
        continued: [
            "Federalists still opposing war (Hartford Convention)",
            "Debates about federal power during crisis",
            "Americans divided by region and party"
        ],
        analysis: "War of 1812 tested whether the young nation could survive conflict with a superpower. It sparked intense nationalism but also dangerous divisions. American identity really came into fruition during the war."
    },
    1815: {
        changed: [
            "War ended - Treaty of Ghent restored status quo",
            "Federalist Party effectively dead after Hartford Convention",
            "American nationalism at peak ('Era of Good Feelings' beginning)",
            "British stopped supporting Native Americans"
        ],
        continued: [
            "Still no resolution of impressment issue (but Britain stopped doing it)",
            "Economic policy debates continued",
            "Western expansion continued"
        ],
        analysis: "Though the war ended in a draw, Americans celebrated it as a victory. The Federalists' opposition discredited them forever. After the Hartford Convention, in which federalitst proposed ideas such as a one term presdiency, they were discredited and fell out of favor with the American public. "
    },
    1823: {
        changed: [
            "Monroe Doctrine declared Western Hemisphere off-limits to Europe",
            "America asserting itself as regional power",
            "Democratic-Republicans adopting some Federalist ideas (American System)",
            "Only one major party remained"
        ],
        continued: [
            "Still debates about internal improvements and federal power",
            "Still concerned about European interference",
            "Still expanding westward"
        ],
        analysis: "By 1823, America was more confident and powerful. The Monroe Doctrine boldly told European empires to stay out of the Americas. Becuase the European powers respected the US's claim on South America, its showed that the Europeans respected America as an powerful nation. This meant that America was seen as a country worth respecting."
    },
    1825: {
        changed: [
            "Federalist Party completely gone",
            "Territory doubled through Louisiana Purchase",
            "National identity much stronger",
            "Democratic-Republicans dominated all branches",
            "Some Federalist policies adopted (banks, tariffs, internal improvements)"
        ],
        continued: [
            "Still debates about federal power vs states' rights",
            "Still economic disagreements (tariffs especially)",
            "Still tensions over slavery (though not yet critical)",
            "Constitutional interpretation still controversial"
        ],
        analysis: "The Early Republic period transformed America from a fragile experiment into a confident nation, but the fundamental debates about power and rights continued. Issues such as how much power the Government was Granted through the Elastic clause as well as debates on the morality of slavery were prevalent throughout the Nation."
    }
};

// Initialize Change & Continuity slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('yearSlider');
    if (slider) {
        slider.addEventListener('input', function() {
            updateChangeDisplay(parseInt(this.value));
        });
        updateChangeDisplay(1790);
    }
    
    // Initialize other modules
    initializeCauseEffect();
    initializeVennDiagram();
    initializeContextualization();
});

function updateChangeDisplay(year) {
    document.getElementById('currentYear').textContent = year;
    
    // Find closest year in data
    const years = Object.keys(changeData).map(Number).sort((a,b) => a-b);
    const closestYear = years.reduce((prev, curr) => {
        return (Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev);
    });
    
    const data = changeData[closestYear];
    
    // Update Changed list
    const changedList = document.getElementById('changedList');
    changedList.innerHTML = data.changed.length > 0
        ? data.changed.map(item => `<li>✨ ${item}</li>`).join('')
        : '<li><em>Not much had changed yet at this point...</em></li>';
    
    // Update Continued list
    const continuedList = document.getElementById('continuedList');
    continuedList.innerHTML = data.continued.map(item => `<li>➡️ ${item}</li>`).join('');
    
    // Update analysis
    document.getElementById('changeAnalysis').textContent = data.analysis;
}

// ========================================
// SKILL 2: CAUSE & EFFECT
// ========================================

const causeEffectChains = {
    "Embargo Act (1807)": ["Economic Depression", "Smuggling", "War of 1812"],
    "Economic Depression": ["Political Backlash", "War of 1812"],
    "Smuggling": ["Jefferson Expands Powers", "War of 1812"],
    "Jefferson Expands Powers": ["Critics Call Him Tyrant"],
    "War of 1812": ["Federalist Opposition", "Hartford Convention", "Treaty of Ghent", "American Nationalism"],
    "Federalist Opposition": ["Hartford Convention"],
    "Hartford Convention": ["Federalist Party Dies"],
    "Treaty of Ghent": ["Status Quo Restored", "American Nationalism"],
    "American Nationalism": ["Era of Good Feelings", "Monroe Doctrine"],
    "Louisiana Purchase": ["Territory Doubled", "Jefferson's Hypocrisy Shown", "Westward Expansion"],
    "Territory Doubled": ["More States Join Union"],
    "Whiskey Tax": ["Whiskey Rebellion"],
    "Whiskey Rebellion": ["Federal Power Demonstrated"]
};

let currentChain = ["British Impressment of American Sailors"];
const correctChains = {
    "British Impressment of American Sailors": ["Embargo Act (1807)", "War of 1812"]
};

function initializeCauseEffect() {
    const eventBank = document.getElementById('eventBank');
    if (!eventBank) return;
    
    const events = Object.keys(causeEffectChains).sort();
    
    eventBank.innerHTML = events.map(event => `
        <div class="col-md-4 col-lg-3">
            <div class="event-card" onclick="addToChain('${event}')">
                ${event}
            </div>
        </div>
    `).join('');
}

function addToChain(event) {
    const lastEvent = currentChain[currentChain.length - 1];
    const validNextEvents = causeEffectChains[lastEvent] || correctChains[lastEvent] || [];
    
    const isCorrect = validNextEvents.includes(event);
    
    currentChain.push(event);
    
    const chainDisplay = document.getElementById('chainDisplay');
    const chainItem = document.createElement('div');
    chainItem.className = `chain-item ${isCorrect ? 'correct' : 'incorrect'}`;
    chainItem.textContent = event;
    chainDisplay.appendChild(chainItem);
    
    // Mark event as used
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        if (card.textContent.trim() === event) {
            card.classList.add('used');
        }
    });
    
    if (isCorrect) {
        showNotification(`✅ Correct! ${event} was caused by ${lastEvent}`, 'success');
    } else {
        showNotification(`❌ Hmm, that's not quite right. But keep building your chain!`, 'warning');
    }
}

function resetChain() {
    currentChain = ["British Impressment of American Sailors"];
    const chainDisplay = document.getElementById('chainDisplay');
    chainDisplay.innerHTML = '<div class="chain-start">START: British Impressment of American Sailors</div>';
    
    // Reset event cards
    document.querySelectorAll('.event-card').forEach(card => {
        card.classList.remove('used');
    });
    
    document.getElementById('chainResults').style.display = 'none';
}

function showChainAnalysis() {
    const resultsDiv = document.getElementById('chainResults');
    const correctCount = document.querySelectorAll('.chain-item.correct').length;
    const totalCount = currentChain.length - 1;
    
    let message = `<h4>📊 Your Chain Analysis</h4>`;
    message += `<p>You made ${totalCount} connections, and ${correctCount} were historically accurate!</p>`;
    message += `<h5>Your Chain:</h5>`;
    message += `<p>${currentChain.join(' → ')}</p>`;
    
    if (correctCount === totalCount && totalCount > 0) {
        message += `<p class="text-success"><strong>🎉 Perfect! You understand cause and effect!</strong></p>`;
    } else {
        message += `<p>A historically accurate chain: British Impressment → Embargo Act → Economic Depression → War of 1812 → Hartford Convention → Federalist Party Dies</p>`;
    }
    
    resultsDiv.innerHTML = message;
    resultsDiv.style.display = 'block';
}

// ========================================
// SKILL 3: COMPARE & CONTRAST
// ========================================

const vennData = {
    "Elastic Clause": "federalist",
    "Tariff": "federalist",
    "Louisiana Purchase": "both", // Both dealt with it
    "Internal Taxes": "federalist",
    "Hartford Convention": "federalist",
    "War of 1812": "both", // Both had positions
    "Embargo Act": "democratic",
    "Impressment": "both", // Both opposed it
    "Monroe Doctrine": "democratic",
    "American System": "both" // D-Rs split on this
};

function initializeVennDiagram() {
    const termCards = document.getElementById('termCards');
    if (!termCards) return;
    
    const terms = Object.keys(vennData);
    
    termCards.innerHTML = terms.map(term => `
        <div class="col-md-4 col-lg-3">
            <div class="term-card" draggable="true" data-term="${term}">
                ${term}
            </div>
        </div>
    `).join('');
    
    // Add drag and drop functionality
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const cards = document.querySelectorAll('.term-card');
    const zones = document.querySelectorAll('.drop-zone');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.term);
        });
    });
    
    zones.forEach(zone => {
        zone.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            const term = e.dataTransfer.getData('text');
            const card = document.querySelector(`[data-term="${term}"]`);
            
            if (card && !card.classList.contains('placed')) {
                const clone = card.cloneNode(true);
                clone.classList.add('placed');
                clone.style.margin = '0.5rem';
                clone.style.cursor = 'default';
                clone.draggable = false;
                this.appendChild(clone);
                card.classList.add('placed');
            }
        });
    });
}

function checkVennAnswers() {
    const zones = {
        'federalistZone': 'federalist',
        'bothZone': 'both',
        'democraticZone': 'democratic'
    };
    
    let correct = 0;
    let total = 0;
    
    Object.entries(zones).forEach(([zoneId, zoneType]) => {
        const zone = document.getElementById(zoneId);
        const cards = zone.querySelectorAll('.term-card');
        
        cards.forEach(card => {
            total++;
            const term = card.dataset.term;
            if (vennData[term] === zoneType) {
                correct++;
                card.style.border = '3px solid #10b981';
            } else {
                card.style.border = '3px solid #ef4444';
            }
        });
    });
    
    const resultsDiv = document.getElementById('vennResults');
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    let message = `<h4>📊 Results: ${correct} out of ${total} correct (${percentage}%)</h4>`;
    
    if (percentage === 100) {
        message += `<p class="text-success"><strong>🎉 Perfect! You understand how the parties compared!</strong></p>`;
    } else if (percentage >= 70) {
        message += `<p class="text-warning"><strong>✅ Good job! You understand the major differences.</strong></p>`;
    } else {
        message += `<p class="text-danger"><strong>Keep learning! Remember: Federalists wanted strong federal government, D-Rs wanted states' rights.</strong></p>`;
    }
    
    message += `<h5>Key Comparisons:</h5>`;
    message += `<ul>`;
    message += `<li><strong>Federalists ONLY:</strong> Supported Elastic Clause, tariffs, internal taxes, organized Hartford Convention</li>`;
    message += `<li><strong>Democratic-Republicans ONLY:</strong> Supported Embargo Act, Monroe Doctrine</li>`;
    message += `<li><strong>BOTH:</strong> Had to deal with Louisiana Purchase, War of 1812, impressment, American System (D-Rs split)</li>`;
    message += `</ul>`;
    
    resultsDiv.innerHTML = message;
    resultsDiv.style.display = 'block';
}

function resetVenn() {
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.innerHTML = '';
    });
    
    document.querySelectorAll('.term-card').forEach(card => {
        card.classList.remove('placed');
        card.style.border = '2px solid var(--sepia)';
    });
    
    document.getElementById('vennResults').style.display = 'none';
}

// ========================================
// SKILL 4: CONTEXTUALIZATION
// ========================================

const americanEvents = [
    { year: 1803, event: "Louisiana Purchase", explanation: "Doubled U.S. size for $15M" },
    { year: 1807, event: "Embargo Act", explanation: "Failed attempt at economic pressure" },
    { year: 1812, event: "War of 1812 begins", explanation: "Second war with Britain" },
    { year: 1814, event: "Hartford Convention", explanation: "Federalists oppose war" },
    { year: 1815, event: "Treaty of Ghent", explanation: "War ends in draw" },
    { year: 1823, event: "Monroe Doctrine", explanation: "Americas off-limits to Europe" }
];

const worldEvents = [
    { year: 1799, event: "Napoleon seizes power in France", explanation: "Begins Napoleonic era" },
    { year: 1804, event: "Haiti wins independence", explanation: "First Black republic, terrifies slaveholders" },
    { year: 1805, event: "Battle of Trafalgar", explanation: "Britain dominates seas" },
    { year: 1812, event: "Napoleon invades Russia", explanation: "Disastrous campaign weakens France" },
    { year: 1815, event: "Napoleon defeated at Waterloo", explanation: "European wars finally end" },
    { year: 1821, event: "Latin America independence movements", explanation: "Spain losing colonies" }
];

const connections = [
    {
        american: 1803,
        world: 1799,
        explanation: "Napoleon's need for war funds made him willing to sell Louisiana to the U.S."
    },
    {
        american: 1807,
        world: 1805,
        explanation: "Britain's naval dominance after Trafalgar led to impressment of American sailors"
    },
    {
        american: 1812,
        world: 1812,
        explanation: "Napoleon's invasion of Russia distracted Europe, giving U.S. chance for war"
    },
    {
        american: 1823,
        world: 1821,
        explanation: "Latin American independence inspired Monroe Doctrine to keep Europe out"
    }
];

function initializeContextualization() {
    const americanDiv = document.getElementById('americanEvents');
    const worldDiv = document.getElementById('worldEvents');
    const examplesDiv = document.getElementById('contextExamples');
    
    if (!americanDiv) return;
    
    // Display American events
    americanDiv.innerHTML = americanEvents.map(e => `
        <div class="timeline-event" data-year="${e.year}">
            <div class="year">${e.year}</div>
            <div><strong>${e.event}</strong></div>
            <div class="small">${e.explanation}</div>
        </div>
    `).join('');
    
    // Display World events
    worldDiv.innerHTML = worldEvents.map(e => `
        <div class="timeline-event" data-year="${e.year}">
            <div class="year">${e.year}</div>
            <div><strong>${e.event}</strong></div>
            <div class="small">${e.explanation}</div>
        </div>
    `).join('');
    
    // Display examples
    examplesDiv.innerHTML = connections.map(c => `
        <li>
            <strong>${c.american}:</strong> ${americanEvents.find(e => e.year === c.american).event} ↔ 
            <strong>${c.world}:</strong> ${worldEvents.find(e => e.year === c.world).event}<br>
            <em>${c.explanation}</em>
        </li>
    `).join('');
}
