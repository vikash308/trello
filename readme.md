# Trello Realtime Kanban Board

A simple **Trello-like Kanban board** built with **React (frontend)** and **Node.js/Express (backend)** with optional **Trello integration** and **websocket updates**.

## Features

- Add, edit, delete cards
- Organize cards into lists: **To Do**, **Doing**, **Done**
- Real-time updates with **Socket.IO**
- Optional integration with **Trello API**
- Modern, clean design

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the **backend** folder:

```env
PORT=4000
TRELLO_KEY=<YOUR_TRELLO_KEY>
TRELLO_TOKEN=<YOUR_TRELLO_TOKEN>
VITE_BOARD_ID=<YOUR_TRELLO_BOARD_ID>  # optional, only if using Trello integration
WEBHOOK_CALLBACK_URL=<YOUR_CALLBACK_URL> # optional, only for webhook
```

### 4. Obtain Trello API Key and Token

1. Go to Trello API Keys: [https://trello.com/app-key](https://trello.com/app-key)  
   Copy your **API key**.

2. Generate a **Token** (scroll down on the same page, link under *Token* section).  
   Example URL:

```
https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&key=<YOUR_KEY>
```

### 5. Register Webhook (Optional, for real-time updates)

**Trello webhook** allows Trello to notify your backend when cards/lists change.  

Replace `<YOUR_KEY>`, `<YOUR_TOKEN>`, `<BOARD_ID>`, `<CALLBACK_URL>`:

```bash
curl -X POST "https://api.trello.com/1/webhooks/?key=<YOUR_KEY>&token=<YOUR_TOKEN>" \
  -d "description=My Board Webhook" \
  -d "callbackURL=<CALLBACK_URL>" \
  -d "idModel=<BOARD_ID>"
```

- **callbackURL** must be reachable by Trello (use ngrok for local dev):

```bash
ngrok http 4000
```

- Trello will POST updates to `/trello/webhook` endpoint.

### 6. Run Backend

```bash
cd backend
npm run dev
```

- Runs on `http://localhost:4000`
- API endpoints:
  - `POST /api/tasks` → create a card
  - `PUT /api/tasks/:cardId` → update card
  - `DELETE /api/tasks/:cardId` → delete card

### 7. Run Frontend

```bash
cd frontend
npm run dev
```

- Open browser at `http://localhost:5173` (Vite default port)
- Connects to backend for CRUD operations

### 8. Using Trello Integration

- Set `VITE_BOARD_ID` in `.env` to your board ID
- `fetchBoardData` fetches lists and cards
- Cards added in frontend are synced to Trello (if backend key/token are correct)

### 9. Notes

- If **webhook not registered**, the board will still work — only realtime updates from Trello will be missing.
- For local dev, **use ngrok** to expose your backend publicly for webhook:

```bash
ngrok http 4000
```

- Copy the generated URL to `WEBHOOK_CALLBACK_URL` in `.env`
