// ========================================
// EARLY REPUBLIC HUB - MAIN JAVASCRIPT
// ========================================

// Global state
const AppState = {
    currentUser: 'Student',
    progress: {
        termsCompleted: 0,
        gamesCompleted: 0,
        quizScore: 0
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadProgress();
    addSmoothScrolling();
});

// Initialize application
function initializeApp() {
    console.log('🎓 Early Republic Hub initialized');
    
    // Add active class to current nav link
    highlightActiveNavLink();
    
    // Load terms data
    if (document.getElementById('termsData')) {
        loadTermsData();
    }
}

// Highlight active navigation link
function highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.style.color = '#d4af37';
        }
    });
}

// Smooth scrolling for anchor links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Load terms data from JSON
async function loadTermsData() {
    try {
        const response = await fetch('/api/terms');
        const data = await response.json();
        return data.terms;
    } catch (error) {
        console.error('Error loading terms:', error);
        return [];
    }
}

// Progress tracking
function loadProgress() {
    const savedProgress = localStorage.getItem('earlyRepublicProgress');
    if (savedProgress) {
        AppState.progress = JSON.parse(savedProgress);
        updateProgressDisplay();
    }
}

function saveProgress() {
    localStorage.setItem('earlyRepublicProgress', JSON.stringify(AppState.progress));
}

function updateProgressDisplay() {
    // Update progress bars if they exist
    const progressBars = document.querySelectorAll('[data-progress]');
    progressBars.forEach(bar => {
        const type = bar.dataset.progress;
        if (AppState.progress[type] !== undefined) {
            bar.style.width = AppState.progress[type] + '%';
            bar.textContent = AppState.progress[type] + '%';
        }
    });
}

// Mark term as completed
function markTermCompleted(termId) {
    AppState.progress.termsCompleted++;
    saveProgress();
    updateProgressDisplay();
    showNotification('Term mastered! 🎓');
}

// Mark game as completed
function markGameCompleted(gameId, score) {
    AppState.progress.gamesCompleted++;
    saveProgress();
    updateProgressDisplay();
    showNotification(`Game completed! Score: ${score} 🎮`);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Utility: Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Utility: Get random elements
function getRandomElements(array, count) {
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, count);
}

// Export for use in other modules
window.AppState = AppState;
window.loadTermsData = loadTermsData;
window.markTermCompleted = markTermCompleted;
window.markGameCompleted = markGameCompleted;
window.showNotification = showNotification;
window.shuffleArray = shuffleArray;
window.getRandomElements = getRandomElements;

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
