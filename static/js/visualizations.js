// ========================================
// VISUALIZATIONS - JAVASCRIPT
// ========================================

// Smooth scroll to sections
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// ========================================
// VISUALIZATION 1: THREE PILLARS
// ========================================

function togglePillar(pillarId) {
    const content = document.getElementById(`${pillarId}-content`);
    const toggle = document.getElementById(`${pillarId}-toggle`);
    
    content.classList.toggle('open');
    toggle.classList.toggle('open');
}

// ========================================
// VISUALIZATION 2: TIMELINE WITH TENSION METER
// ========================================

const timelineData = {
    1800: {
        tension: 40,
        label: "Moderate",
        details: `
            <h4>1800 - Revolution of 1800</h4>
            <p><strong>Event:</strong> Jefferson defeats Adams in first peaceful transfer of power between parties</p>
            <p><strong>Tension Level:</strong> Moderate - Political competition but democracy works!</p>
            <p><strong>Key Issues:</strong> Federalists losing power, D-Rs gaining control, Alien & Sedition Acts controversy</p>
        `
    },
    1803: {
        tension: 30,
        label: "Low-Moderate",
        details: `
            <h4>1803 - Louisiana Purchase</h4>
            <p><strong>Event:</strong> Jefferson doubles U.S. size for $15 million</p>
            <p><strong>Tension Level:</strong> Low-Moderate - Some controversy over constitutionality</p>
            <p><strong>Key Issues:</strong> Jefferson compromises strict interpretation, Federalists object, but mostly supported</p>
        `
    },
    1807: {
        tension: 70,
        label: "High",
        details: `
            <h4>1807 - Embargo Act</h4>
            <p><strong>Event:</strong> Jefferson bans all foreign trade to pressure Britain/France</p>
            <p><strong>Tension Level:</strong> High - Economic disaster and political backlash</p>
            <p><strong>Key Issues:</strong> Ports closed, economy collapsing, smuggling rampant, New England furious</p>
        `
    },
    1812: {
        tension: 90,
        label: "Very High",
        details: `
            <h4>1812 - War of 1812 Begins</h4>
            <p><strong>Event:</strong> U.S. declares war on Britain</p>
            <p><strong>Tension Level:</strong> Very High - Nation divided, some regions oppose war</p>
            <p><strong>Key Issues:</strong> Impressment, trade restrictions, War Hawks vs Federalists, early defeats</p>
        `
    },
    1814: {
        tension: 95,
        label: "Crisis",
        details: `
            <h4>1814 - Hartford Convention</h4>
            <p><strong>Event:</strong> New England Federalists meet to discuss grievances</p>
            <p><strong>Tension Level:</strong> CRISIS - Peak tensions, hints of secession</p>
            <p><strong>Key Issues:</strong> Washington D.C. burned, war going badly, Federalists propose constitutional amendments</p>
        `
    },
    1815: {
        tension: 20,
        label: "Low",
        details: `
            <h4>1815 - Era of Good Feelings Begins</h4>
            <p><strong>Event:</strong> War ends, Federalists discredited, nationalism surges</p>
            <p><strong>Tension Level:</strong> Low - National unity and one-party dominance</p>
            <p><strong>Key Issues:</strong> Treaty of Ghent signed, Battle of New Orleans victory, Federalist Party dies</p>
        `
    },
    1823: {
        tension: 15,
        label: "Very Low",
        details: `
            <h4>1823 - Monroe Doctrine</h4>
            <p><strong>Event:</strong> Monroe declares Americas off-limits to European colonization</p>
            <p><strong>Tension Level:</strong> Very Low - Confident, unified nation</p>
            <p><strong>Key Issues:</strong> American assertiveness, regional power status, minimal domestic conflict</p>
        `
    }
};

function selectYear(year) {
    // Remove active from all years
    document.querySelectorAll('.timeline-year').forEach(el => {
        el.classList.remove('active');
    });
    
    // Add active to selected year
    document.querySelector(`[data-year="${year}"]`).classList.add('active');
    
    // Update tension meter
    const data = timelineData[year];
    const tensionBar = document.getElementById('tensionBar');
    const tensionLabel = document.getElementById('tensionLabel');
    
    tensionBar.style.width = data.tension + '%';
    tensionLabel.style.left = data.tension + '%';
    tensionLabel.textContent = data.label;
    
    // Update details
    document.getElementById('timelineDetails').innerHTML = data.details;
}

// ========================================
// VISUALIZATION 3: COMPARISON MATRIX
// (No JavaScript needed - pure HTML/CSS table)
// ========================================

// ========================================
// VISUALIZATION 4: CAUSE & EFFECT WEB
// ========================================

const webData = {
    nodes: [
        { id: 'impressment', label: 'Impressment', category: 'european', x: 150, y: 100 },
        { id: 'embargo', label: 'Embargo Act', category: 'economic', x: 400, y: 150 },
        { id: 'depression', label: 'Economic\nDepression', category: 'economic', x: 650, y: 100 },
        { id: 'war1812', label: 'War of 1812', category: 'european', x: 400, y: 300 },
        { id: 'hartford', label: 'Hartford\nConvention', category: 'federal', x: 150, y: 400 },
        { id: 'feddie', label: 'Federalists Die', category: 'federal', x: 150, y: 550 },
        { id: 'nationalism', label: 'American\nNationalism', category: 'federal', x: 650, y: 400 },
        { id: 'monroe', label: 'Monroe\nDoctrine', category: 'european', x: 650, y: 550 }
    ],
    connections: [
        { from: 'impressment', to: 'embargo' },
        { from: 'embargo', to: 'depression' },
        { from: 'embargo', to: 'war1812' },
        { from: 'impressment', to: 'war1812' },
        { from: 'war1812', to: 'hartford' },
        { from: 'hartford', to: 'feddie' },
        { from: 'war1812', to: 'nationalism' },
        { from: 'nationalism', to: 'monroe' }
    ]
};

let selectedNode = null;

function initializeWeb() {
    const svg = document.getElementById('causeEffectSVG');
    const container = document.getElementById('webContainer');
    
    if (!svg || !container) return;
    
    // Set SVG dimensions
    svg.setAttribute('width', container.offsetWidth);
    svg.innerHTML = '';
    
    const categoryColors = {
        economic: '#fbbf24',
        federal: '#8b5cf6',
        european: '#10b981'
    };
    
    // Draw connections
    webData.connections.forEach(conn => {
        const fromNode = webData.nodes.find(n => n.id === conn.from);
        const toNode = webData.nodes.find(n => n.id === conn.to);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromNode.x);
        line.setAttribute('y1', fromNode.y);
        line.setAttribute('x2', toNode.x);
        line.setAttribute('y2', toNode.y);
        line.setAttribute('stroke', '#cbd5e1');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('class', `connection conn-${conn.from} conn-${conn.to}`);
        svg.appendChild(line);
    });
    
    // Draw nodes
    webData.nodes.forEach(node => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'node-group');
        group.setAttribute('data-node-id', node.id);
        group.style.cursor = 'pointer';
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', '30');
        circle.setAttribute('fill', categoryColors[node.category]);
        circle.setAttribute('stroke', '#1f2937');
        circle.setAttribute('stroke-width', '3');
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 50);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#1f2937');
        text.setAttribute('font-weight', '600');
        text.setAttribute('font-size', '14');
        
        // Handle multi-line labels
        const lines = node.label.split('\n');
        lines.forEach((line, i) => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.setAttribute('x', node.x);
            tspan.setAttribute('dy', i === 0 ? 0 : 16);
            tspan.textContent = line;
            text.appendChild(tspan);
        });
        
        group.appendChild(circle);
        group.appendChild(text);
        
        group.addEventListener('click', () => highlightNode(node.id));
        
        svg.appendChild(group);
    });
}

function highlightNode(nodeId) {
    selectedNode = nodeId;
    
    // Dim all connections
    document.querySelectorAll('.connection').forEach(conn => {
        conn.setAttribute('stroke', '#e5e7eb');
        conn.setAttribute('stroke-width', '2');
    });
    
    // Highlight connections from this node
    webData.connections.forEach(conn => {
        if (conn.from === nodeId || conn.to === nodeId) {
            const line = document.querySelector(`.conn-${conn.from}.conn-${conn.to}`);
            if (line) {
                line.setAttribute('stroke', '#3b82f6');
                line.setAttribute('stroke-width', '4');
            }
        }
    });
}

function resetWeb() {
    selectedNode = null;
    document.querySelectorAll('.connection').forEach(conn => {
        conn.setAttribute('stroke', '#cbd5e1');
        conn.setAttribute('stroke-width', '2');
    });
}

function showAllConnections() {
    document.querySelectorAll('.connection').forEach(conn => {
        conn.setAttribute('stroke', '#3b82f6');
        conn.setAttribute('stroke-width', '3');
    });
}

// Initialize web on load
document.addEventListener('DOMContentLoaded', function() {
    initializeWeb();
    
    // Reinitialize on window resize
    window.addEventListener('resize', initializeWeb);
});