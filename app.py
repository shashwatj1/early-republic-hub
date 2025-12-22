from flask import Flask, render_template, jsonify, request
import json
import os

app = Flask(__name__)

# Configure for production
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'early-republic-2024-history')
# Home route
@app.route('/')
def index():
    return render_template('index.html')

# Learning routes
@app.route('/learn')
def learn():
    return render_template('learn/index.html')

@app.route('/learn/historical-thinking')
def historical_thinking():
    return render_template('learn/historical-thinking.html')

@app.route('/learn/economic')
def learn_economic():
    return render_template('learn/economic-room.html')

@app.route('/learn/federal')
def learn_federal():
    return render_template('learn/federal-room.html')

@app.route('/learn/european')
def learn_european():
    return render_template('learn/european-room.html')

# Game routes
@app.route('/games')
def games():
    return render_template('games/index.html')

@app.route('/games/sorter')
def game_sorter():
    return render_template('games/game1-sorter.html')

@app.route('/games/debate')
def game_debate():
    return render_template('games/game2-debate.html')

@app.route('/games/timeline')
def game_timeline():
    return render_template('games/game3-timeline.html')

@app.route('/games/match')
def game_match():
    return render_template('games/game4-match.html')

@app.route('/games/policy')
def game_policy():
    return render_template('games/game5-policy.html')

@app.route('/games/category')
def game_category():
    return render_template('games/game6-category.html')

@app.route('/games/lawyer')
def game_lawyer():
    return render_template('games/game7-lawyer.html')

@app.route('/games/memory')
def game_memory():
    return render_template('games/game8-memory.html')

# Visualization routes
@app.route('/visualizations')
def visualizations():
    return render_template('visualizations/index.html')

@app.route('/visualizations/pillars')
def viz_pillars():
    return render_template('visualizations/pillars.html')

@app.route('/visualizations/timeline')
def viz_timeline():
    return render_template('visualizations/timeline.html')

@app.route('/visualizations/comparison')
def viz_comparison():
    return render_template('visualizations/comparison.html')

# Quiz routes
@app.route('/quiz')
def quiz():
    return render_template('quiz/index.html')

@app.route('/quiz/results')
def quiz_results():
    return render_template('quiz/results.html')

# API endpoints for data
@app.route('/api/terms')
def api_terms():
    with open('static/data/terms.json', 'r') as f:
        return jsonify(json.load(f))

@app.route('/api/quiz-questions')
def api_quiz():
    with open('static/data/quiz-questions.json', 'r') as f:
        return jsonify(json.load(f))

# Progress saving endpoint
@app.route('/api/save-progress', methods=['POST'])
def save_progress():
    # For now, just acknowledge - we'll implement localStorage on frontend
    data = request.json
    return jsonify({"success": True, "message": "Progress saved"})

if __name__ == '__main__':
    # For local development
    app.run(debug=True, host='0.0.0.0', port=5001)