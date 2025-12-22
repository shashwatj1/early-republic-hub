// ========================================
// QUIZ SYSTEM - JAVASCRIPT
// ========================================

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Load questions from JSON
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/static/data/quiz-questions.json');
        const data = await response.json();
        questions = shuffleArray(data.questions);
        
        document.getElementById('totalQuestions').textContent = questions.length;
    } catch (error) {
        console.error('Error loading quiz questions:', error);
        showNotification('Error loading quiz questions. Please refresh the page.', 'error');
    }
});

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizQuestions').style.display = 'block';
    
    document.getElementById('totalQ').textContent = questions.length;
    
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    
    // Update progress
    document.getElementById('currentQ').textContent = currentQuestionIndex + 1;
    document.getElementById('currentScore').textContent = score;
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('quizProgress').style.width = progress + '%';
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <button class="option-btn" onclick="selectAnswer(${index})">
            <span class="option-label">${String.fromCharCode(65 + index)}.</span>
            ${option}
        </button>
    `).join('');
    
    // Hide feedback and next button
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    // Disable all options
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, index) => {
        btn.classList.add('disabled');
        
        if (index === question.correct) {
            btn.classList.add('correct');
        }
        
        if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Update score
    if (isCorrect) {
        score++;
        document.getElementById('currentScore').textContent = score;
    }
    
    // Save user answer
    userAnswers.push({
        question: question.question,
        selectedIndex: selectedIndex,
        correctIndex: question.correct,
        isCorrect: isCorrect,
        explanation: question.explanation,
        options: question.options
    });
    
    // Show feedback
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackDiv.innerHTML = `
        <h5>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h5>
        ${!isCorrect ? `<p><strong>You selected:</strong> ${question.options[selectedIndex]}</p>` : ''}
        <p><strong>Correct answer:</strong> ${question.options[question.correct]}</p>
    `;
    feedbackDiv.style.display = 'block';
    
    // Show next button
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').textContent = 
        currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'See Results →';
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quizQuestions').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    const percentage = Math.round((score / questions.length) * 100);
    const correct = score;
    const incorrect = questions.length - score;
    
    // Display scores
    document.getElementById('finalScore').textContent = percentage + '%';
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('incorrectCount').textContent = incorrect;
    document.getElementById('accuracyRate').textContent = percentage + '%';
    
    // Score message
    let message = '';
    if (percentage === 100) {
        message = '🏆 Perfect score! You\'re an Early Republic expert!';
    } else if (percentage >= 90) {
        message = '🌟 Excellent work! You really know your history!';
    } else if (percentage >= 80) {
        message = '👍 Great job! You have a solid understanding!';
    } else if (percentage >= 70) {
        message = '✅ Good effort! Review the topics you missed.';
    } else if (percentage >= 60) {
        message = '📚 Not bad! Keep studying to improve your score.';
    } else {
        message = '💪 Keep learning! Review the material and try again.';
    }
    document.getElementById('scoreMessage').textContent = message;
    
    // Show review
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = userAnswers.map((answer, index) => `
        <div class="review-item ${answer.isCorrect ? 'correct' : 'incorrect'}">
            <h5>Question ${index + 1}: ${answer.isCorrect ? '✅' : '❌'}</h5>
            <p><strong>Q:</strong> ${answer.question}</p>
            <p><strong>Your answer:</strong> ${answer.options[answer.selectedIndex]}</p>
            ${!answer.isCorrect ? `<p><strong>Correct answer:</strong> ${answer.options[answer.correctIndex]}</p>` : ''}
        </div>
    `).join('');
}

function restartQuiz() {
    // Reshuffle questions
    questions = shuffleArray(questions);
    
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizStart').style.display = 'block';
}