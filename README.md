# trip

Trip Guide App - Expanded Ideas
Additional Feature Ideas
Smart Personalization



- (modes)Mood-based trip suggestions: “Relaxing day,” “Adventure mode,” “Romantic getaway,” “Family-friendly.”
- Budget-aware planning: AI suggests trips based on how much users want to spend (fuel, food, tickets). 
Safety & Local Insights
- Safety alerts: Real-time notifications about animal activity, theft-prone areas, or road closures. ( bit unpractical just added to discuss )
- Verified local guides: Partner with locals who can provide authentic experiences and insider tips. ( we can find them later )
- Emergency support: Quick access to nearest hospital, police station, or helpline.
Social 
- Trip journals: Users can log their trips with photos, notes, and ratings.
- Badges & rewards: Earn badges for visiting hidden gems, eco-friendly travel, or group trips.
- Community recommendations: Upvote/downvote places, share itineraries, and discover trending spots.
AI-Powered Enhancements
- Smart itinerary optimizer: Adjusts trip plan dynamically if weather changes or a place is overcrowded.
Practical Add-ons
- Offline mode: Download maps, itineraries, and guides for areas with poor connectivity.
- Expense splitter: Built-in group expense manager to avoid awkward money talks. ( check this )
- Food & stay recommendations: AI suggests nearby restaurants, street food, or homestays based on preferences.
Marketing Strategies
- Targeted campaigns:
  - Focus on 360° views, hidden gems, gamification.
  - Families: Safety features, expense management, verified guides.
  - Tourists: Local insights, offline mode.
- Social media:
  - Instagram reels & TikTok showcasing hidden gems.
- Partnerships:
  - Collaborate with travel bloggers, YouTubers, and local influencers.
  - Tie-ups with airlines, bus services, and hotels.
- Community building:
  - In-app forums for trip stories.
  - Seasonal campaigns (e.g., “Best monsoon trips in Sri Lanka”).


GUIDE

# Trip Guide App

A full‑stack project with **Django REST API (backend)** and **React Native app (frontend)**.

---

## 🚀 Project Structure
trip/
├── backend/      # Django REST API
├── frontend/     # React Native app
├── README.md
├── .gitignore

---

## ⚙️ Backend (Django)
1. Go into the backend folder:
   cd backend

2. Install dependencies:
   pip install -r requirements.txt

3. Run migrations:
   python manage.py migrate

4. Start server:
   python manage.py runserver

5. API will be live at:
   http://127.0.0.1:8000/

---

## 📱 Frontend (React Native)
1. Go into the frontend folder:
   cd frontend

2. Install dependencies:
   npm install
   # or
   yarn install

3. Start the app:
   npx expo start

4. Scan the QR code with Expo Go app (Android/iOS) or run on emulator.

---

## 🔑 API Endpoints
# Register a new user
POST /api/auth/register/
Body:
{
  "username": "nejan",   # the username
  "password": "1234"     # the password
}

# Login to get JWT tokens
POST /api/auth/login/
Body:
{
  "username": "nejan",
  "password": "1234"
}
Response:
{
  "access": "JWT_ACCESS_TOKEN",   # short-lived token
  "refresh": "JWT_REFRESH_TOKEN"  # long-lived token
}

# Refresh token
POST /api/auth/refresh/
Body:
{
  "refresh": "JWT_REFRESH_TOKEN"
}

# Get profile info (must be logged in)
GET /api/auth/profile/
Headers:
Authorization: Bearer JWT_ACCESS_TOKEN

# Update profile info (must be logged in)
PUT /api/auth/profile/
Headers:
Authorization: Bearer JWT_ACCESS_TOKEN
Body:
{
  "phone": "0771234567",
  "bio": "Traveler and coder",
  "profile_picture": "https://..."
}

# Get all destinations (protected)
GET /api/destinations/
Headers:
Authorization: Bearer JWT_ACCESS_TOKEN

---

## 📝 Notes
- Backend runs on port 8000 by default.
- Frontend must call API using your local IP or ngrok tunnel (not localhost).
- Keep `.env` files separate for backend and frontend.