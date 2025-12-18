# 🎓 The Early Republic Hub

An interactive educational website exploring American history from 1800-1825, focusing on party politics, federal power debates, and foreign relations.

## 📚 Project Overview

This website was created for **APUSH Chapter 7: The Early Republic** alternate assessment. It covers 14 key historical terms through:

- **Interactive Learning**: 3 thematic "rooms" (Economic Policy, Federal Power, European Relations)
- **8 Games**: Political Sorter, Great Debate, Timeline Challenge, Triple Match, Policy Maker, Category Blitz, Constitutional Lawyer, Memory Match
- **Visualizations**: Interactive timelines, cause-effect webs, party comparison matrices
- **Quizzes**: Multiple formats including APUSH-style questions

## 🚀 Local Development

### Prerequisites
- Python 3.9+
- pip

### Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd early-republic-hub

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

Visit `http://localhost:5000` in your browser.

## 🌐 Deployment to Render.com

### Quick Deploy

1. **Create a Render account** at [render.com](https://render.com)

2. **Connect your GitHub repository**
   - Push this project to GitHub
   - In Render dashboard, click "New +" → "Web Service"
   - Connect your GitHub account and select this repository

3. **Configure the service**
   - **Name**: `early-republic-hub` (or your choice)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: `Free`

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your app
   - You'll get a URL like: `https://early-republic-hub.onrender.com`

### Important Notes
- First load may take 50 seconds (free tier cold start)
- After initial load, everything runs at full speed
- Your app URL will be: `https://[your-service-name].onrender.com`

## 📁 Project Structure

```
early-republic-hub/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css     # Custom historical styling
│   ├── js/
│   │   ├── main.js       # Core JavaScript
│   │   └── games/        # Game logic files
│   └── data/
│       └── terms.json    # 14 historical terms
└── templates/
    ├── base.html         # Base template
    ├── index.html        # Homepage
    ├── games/            # Game pages
    ├── learn/            # Learning pages
    ├── visualizations/   # Visualization pages
    └── quiz/             # Quiz pages
```

## 🎨 Features

### 14 Key Terms Covered
1. Elastic Clause
2. Tariff
3. Democratic-Republicans
4. Federalists
5. Internal Taxes (Whiskey Tax)
6. Louisiana Purchase
7. Hartford Convention
8. War of 1812
9. Embargo Act of 1807
10. Play-off System
11. Impressment
12. Treaty of Ghent
13. Monroe Doctrine
14. American System

### Historical Thinking Skills
- Change & Continuity
- Compare & Contrast
- Cause & Effect
- Contextualization

## 🎯 Key Concept

> "In the early 1800s, national political parties continued to debate issues such as the tariff, powers of the federal government, and relations with European powers"

## 🛠 Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: Bootstrap 5, Custom CSS
- **Fonts**: Google Fonts (Playfair Display, Libre Baskerville)
- **Deployment**: Render.com
- **Version Control**: Git/GitHub

## 📝 Assignment Requirements Met

✅ Accurate description of at least 10 terms (we have 14!)
✅ Illustrates key concept about party politics
✅ Applies historical thinking skills
✅ Unique and creative delivery
✅ Interactive and engaging format

## 👥 Credits

Created by Shashwat Jaipuriar, William Durfee, and Revanth Soma for Mr. Spiegal's APUSH class
Hopkinton High School
Due: December 2025

## 📄 License

This project is for educational purposes.

---

**Need help?** Check the Flask documentation at [flask.palletsprojects.com](https://flask.palletsprojects.com/)
**Render help?** Visit [render.com/docs](https://render.com/docs)
