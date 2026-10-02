AIWRITE / NOAH AI WRITER

========================
SETUP
========================

1. Install dependencies

npm install


========================
BACKEND (API)
========================

Start backend (port 3004)

cd backend
node server.js

OR with PM2:

pm2 start server.js --name backend-aiwrite


========================
FRONTEND (PRODUCTION)
========================

Build frontend

npm run build

Serve frontend

npx serve -s dist -l 4175

OR with PM2:

pm2 start "npx serve -s dist -l 4175" --name aiwrite


========================
DEV MODE (OPTIONAL)
========================

npm run dev

(default: http://localhost:5173)


========================
PM2 COMMANDS
========================

Start:
pm2 start server.js --name backend-aiwrite
pm2 start "npx serve -s dist -l 4175" --name aiwrite

Restart:
pm2 restart all

Stop:
pm2 delete backend-aiwrite
pm2 delete aiwrite

List:
pm2 list


========================
API ENDPOINTS
========================

Health:
GET /api/health

AI Process:
POST /api/process

Stripe Checkout:
POST /api/pay

Contact:
POST /api/contact

Auth:
POST /api/signup
POST /api/login


========================
PORTS
========================

Backend: 3004
Frontend: 4175


========================
NOTES
========================

- Uses Ollama (local AI) + OpenAI fallback
- Make sure OPENAI_API_KEY is set in .env
- Stripe keys required for payments
- Backend must run before frontend
- Use localhost:3004 for API calls
- Only ONE PM2 process per app

========================
DONE
========================