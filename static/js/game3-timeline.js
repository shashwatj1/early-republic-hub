// ========================================
// GAME 3: TIMELINE CHALLENGE
// ========================================

const events = [
    { title: "Whiskey Tax Enacted", year: 1791 },
    { title: "Whiskey Rebellion", year: 1794 },
    { title: "Louisiana Purchase", year: 1803 },
    { title: "Embargo Act", year: 1807 },
    { title: "War of 1812 Begins", year: 1812 },
    { title: "British Burn Washington D.C.", year: 1814 },
    { title: "Hartford Convention", year: 1814 },
    { title: "Battle of New Orleans", year: 1815 },
    { title: "Treaty of Ghent", year: 1814 },
    { title: "Era of Good Feelings Begins", year: 1815 },
    { title: "American System Proposed", year: 1816 },
    { title: "Monroe Doctrine Declared", year: 1823 }
];

let placedEvents = new Array(events.length).fill(null);
let startTime = null;
let timerInterval = null;
let attempts = 0;
let hintsUsed = 0;

document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

function initGame() {
    // Sort events by year for correct order
    events.sort((a, b) => {
        if (a.year === b.year) {
            // For same year, maintain consistent order
            return a.title.localeCompare(b.title);
        }
        return a.year - b.year;
    });
    
    // Shuffle for display
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    
    // Create timeline slots
    const slotsDiv = document.getElementById('timelineSlots');
    slotsDiv.innerHTML = events.map((_, index) => `
        <div class="timeline-slot" 
             data-position="${index + 1}" 
             data-index="${index}"
             ondrop="drop(event)" 
             ondragover="allowDrop(event)"
             ondragleave="dragLeave(event)">
        </div>
    `).join('');
    
    // Create event cards
    const poolDiv = document.getElementById('eventsPool');
    poolDiv.innerHTML = shuffled.map((event, index) => `
        <div class="event-card" 
             draggable="true" 
             data-event-id="${events.indexOf(event)}"
             ondragstart="drag(event)">
            <div class="event-title">${event.title}</div>
            <div class="event-year">${event.year}</div>
        </div>
    `).join('');
    
    // Start timer
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    
    placedEvents = new Array(events.length).fill(null);
    attempts = 0;
    hintsUsed = 0;
    updateStats();
}

function drag(ev) {
    ev.dataTransfer.setData("eventId", ev.target.dataset.eventId);
    ev.target.classList.add('dragging');
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.add('drag-over');
}

function dragLeave(ev) {
    ev.currentTarget.classList.remove('drag-over');
}

function drop(ev) {
    ev.preventDefault();
    const slot = ev.currentTarget;
    slot.classList.remove('drag-over');
    
    const eventId = parseInt(ev.dataTransfer.getData("eventId"));
    const slotIndex = parseInt(slot.dataset.index);
    
    // Remove from old slot if already placed
    const oldSlotIndex = placedEvents.indexOf(eventId);
    if (oldSlotIndex !== -1) {
        placedEvents[oldSlotIndex] = null;
        const oldSlot = document.querySelector(`[data-index="${oldSlotIndex}"]`);
        oldSlot.innerHTML = '';
        oldSlot.classList.remove('filled');
    }
    
    // Remove current content from slot if any
    if (placedEvents[slotIndex] !== null) {
        const oldEventId = placedEvents[slotIndex];
        const oldCard = document.querySelector(`[data-event-id="${oldEventId}"]`);
        if (oldCard) {
            oldCard.classList.remove('placed');
        }
    }
    
    // Place in new slot
    placedEvents[slotIndex] = eventId;
    const event = events[eventId];
    slot.innerHTML = `
        <div class="placed-event-content" draggable="true" data-event-id="${eventId}" ondragstart="dragPlaced(event)">
            <div class="event-title">${event.title}</div>
            <button class="remove-btn" onclick="removeFromSlot(${slotIndex}); event.stopPropagation();" title="Remove">✕</button>
        </div>
    `;
    slot.classList.add('filled');
    
    // Hide card from pool
    const card = document.querySelector(`[data-event-id="${eventId}"]`);
    card.classList.add('placed');
    
    updateStats();
}

function dragPlaced(ev) {
    const eventId = ev.target.closest('[data-event-id]').dataset.eventId;
    ev.dataTransfer.setData("eventId", eventId);
    ev.target.closest('.placed-event-content').style.opacity = '0.5';
    
    // Remove from current slot
    const oldSlotIndex = placedEvents.indexOf(parseInt(eventId));
    if (oldSlotIndex !== -1) {
        placedEvents[oldSlotIndex] = null;
        setTimeout(() => {
            const oldSlot = document.querySelector(`[data-index="${oldSlotIndex}"]`);
            if (oldSlot && !oldSlot.classList.contains('drag-over')) {
                oldSlot.innerHTML = '';
                oldSlot.classList.remove('filled');
            }
        }, 50);
    }
}

function removeFromSlot(slotIndex) {
    const eventId = placedEvents[slotIndex];
    if (eventId === null) return;
    
    // Clear slot
    placedEvents[slotIndex] = null;
    const slot = document.querySelector(`[data-index="${slotIndex}"]`);
    slot.innerHTML = '';
    slot.classList.remove('filled', 'correct', 'incorrect');
    
    // Show card back in pool
    const card = document.querySelector(`[data-event-id="${eventId}"]`);
    if (card) {
        card.classList.remove('placed');
    }
    
    updateStats();
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateStats() {
    const placed = placedEvents.filter(e => e !== null).length;
    document.getElementById('correctCount').textContent = `${placed}/${events.length}`;
    document.getElementById('attempts').textContent = attempts;
}

function checkOrder() {
    attempts++;
    updateStats();
    
    let correct = 0;
    const slots = document.querySelectorAll('.timeline-slot');
    
    slots.forEach((slot, index) => {
        const eventId = placedEvents[index];
        slot.classList.remove('correct', 'incorrect');
        
        if (eventId === null) {
            return;
        }
        
        if (eventId === index) {
            slot.classList.add('correct');
            correct++;
        } else {
            slot.classList.add('incorrect');
        }
    });
    
    const resultsDiv = document.getElementById('results');
    
    if (correct === events.length) {
        clearInterval(timerInterval);
        const timeText = document.getElementById('timer').textContent;
        
        resultsDiv.innerHTML = `
            <div class="alert alert-success">
                <h3>🏆 Perfect! All events in correct order!</h3>
                <p><strong>Time:</strong> ${timeText}</p>
                <p><strong>Attempts:</strong> ${attempts}</p>
                <p><strong>Hints Used:</strong> ${hintsUsed}</p>
                ${attempts === 1 ? '<p class="mb-0">⭐ FIRST TRY BONUS! You really know your history!</p>' : ''}
            </div>
        `;
        
        // Reveal all years
        document.querySelectorAll('.event-year').forEach(el => el.classList.add('revealed'));
    } else {
        resultsDiv.innerHTML = `
            <div class="alert alert-warning">
                <h5>Not quite right! ${correct}/${events.length} correct</h5>
                <p>Red boxes are in the wrong position. Keep trying!</p>
            </div>
        `;
    }
    
    resultsDiv.style.display = 'block';
}

function showHint() {
    hintsUsed++;
    
    // Find first incorrect placement
    let hintGiven = false;
    for (let i = 0; i < placedEvents.length; i++) {
        if (placedEvents[i] !== null && placedEvents[i] !== i) {
            const event = events[placedEvents[i]];
            showNotification(`💡 Hint: "${event.title}" is in the wrong spot. It happened in ${event.year}.`, 'info');
            hintGiven = true;
            break;
        }
    }
    
    if (!hintGiven) {
        // Show a year range hint for unplaced events
        const unplaced = events.filter((_, index) => !placedEvents.includes(index));
        if (unplaced.length > 0) {
            const event = unplaced[0];
            showNotification(`💡 Hint: Try placing "${event.title}" - it happened in the ${event.year < 1800 ? 'early 1790s' : event.year < 1810 ? '1800s' : event.year < 1820 ? '1810s' : '1820s'}.`, 'info');
        } else {
            showNotification(`💡 All events are placed! Click "Check Order" to see if they're correct.`, 'info');
        }
    }
}

function resetGame() {
    clearInterval(timerInterval);
    
    // Clear all slots
    document.querySelectorAll('.timeline-slot').forEach(slot => {
        slot.innerHTML = '';
        slot.classList.remove('filled', 'correct', 'incorrect');
    });
    
    // Show all cards
    document.querySelectorAll('.event-card').forEach(card => {
        card.classList.remove('placed');
    });
    
    // Hide years again
    document.querySelectorAll('.event-year').forEach(el => el.classList.remove('revealed'));
    
    document.getElementById('results').style.display = 'none';
    
    placedEvents = new Array(events.length).fill(null);
    attempts = 0;
    hintsUsed = 0;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    
    updateStats();
}