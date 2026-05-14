# 🌍 Global Currency Converter - Complete Setup Guide

## Project Structure
```
Tailwindcss/
├── index.html                 # Frontend (do not modify)
├── script.js                  # Frontend logic (handles conversion & history)
├── server.js                  # Backend (Node.js + Express)
├── db_init.sql               # Database schema
├── .env                       # Environment variables (create from .env.example)
├── .env.example              # Example environment file
├── package.json              # Dependencies
├── currencies.js             # Currency codes
├── names.js                  # Currency names
├── signs.js                  # Currency symbols
├── output.css                # Tailwind CSS
└── style.css                 # Additional styles
```

## ✅ Prerequisites
1. **MySQL Server** - Must be running on `localhost:3306`
2. **Node.js** - Version 14+ installed
3. **npm** - Package manager

## 🚀 Step-by-Step Setup

### Step 1: Install Dependencies
```powershell
cd C:\Users\ChZaeem47\Desktop\Tailwindcss
npm install
```

Expected output:
- `express` ✓
- `mysql2` ✓
- `cors` ✓
- `dotenv` ✓
- `nodemon` ✓

### Step 2: Create Database & Table

**Option A: Using MySQL Command Line (Recommended)**
```powershell
# Open MySQL command line
mysql -u root -p

# Paste and run all contents of db_init.sql
SOURCE db_init.sql;

# Verify
SELECT * FROM currency_app.conversion_history;
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Click File → Open SQL Script → select `db_init.sql`
3. Click the Execute button (⚡)
4. Verify table was created

### Step 3: Start Backend Server

**Terminal 1** (Keep running in background):
```powershell
cd C:\Users\ChZaeem47\Desktop\Tailwindcss
npm run dev
```

**Expected output:**
```
═══════════════════════════════════════
CURRENCY CONVERTER - BACKEND SERVER
═══════════════════════════════════════
[timestamp] Starting initialization...

[1/3] Creating database if not exists...
✓ Database 'currency_app' ready

[2/3] Creating connection pool...
✓ Pool created (host: localhost, user: root, db: currency_app)

[3/3] Creating table if not exists...
✓ Table 'conversion_history' ready

✓ Database is operational. Current records: 0

═══════════════════════════════════════
Initialization complete!
═══════════════════════════════════════

🚀 SERVER LISTENING ON http://localhost:3000

Ready to handle requests:
  POST   http://localhost:3000/save-history
  GET    http://localhost:3000/history
  GET    http://localhost:3000/health
```

✅ **Server is running successfully!**

### Step 4: Open Frontend

**Terminal 2** (new window):
```powershell
# Option A: Direct file (simple)
# Just open index.html in your browser:
# - Chrome: Drag index.html into Chrome
# - Or: http://127.0.0.1:5500/index.html (if using Live Server extension)

# Option B: Using Python (if installed)
python -m http.server 8000
# Then open: http://localhost:8000/index.html

# Option C: Using Node.js static server
npx http-server
# Then open: http://localhost:8080/index.html
```

## 📋 Testing the App

### Test 1: Make a Conversion
1. Open your frontend in browser
2. Select two currencies (e.g., PKR to USD)
3. Enter an amount
4. Click **Convert** button
5. Check server logs for:
   ```
   → Saving: PKR → USD (10 @ 0.003564)
   ✓ Saved with ID: 1
   ```

### Test 2: View History
1. Click the **History** button/div (top right)
2. Modal should open and show:
   - All previous conversions
   - Exchange rates
   - Timestamps
3. Check server logs for:
   ```
   [timestamp] GET    /history
   ✓ Returning 1 records
   ```

### Test 3: Test Backend Health
```powershell
# In any terminal, run:
curl http://localhost:3000/health

# Should return:
# {"status":"ok","timestamp":"2025-12-18T..."}
```

## 🔧 Troubleshooting

### Problem: "Could not load history" error in modal
**Solution:**
1. Ensure server is running (check Terminal 1)
2. Check server logs for errors
3. Verify MySQL is accessible
4. Test: `curl http://localhost:3000/health`

### Problem: "ERR_CONNECTION_REFUSED" in browser console
**Solution:**
- Server is NOT running
- Start server: `npm run dev` in new terminal

### Problem: MySQL connection error
**Solution:**
1. Ensure MySQL is running:
   ```powershell
   mysql -u root -p
   # If fails, start MySQL service:
   # Services → MySQL → Right-click → Start
   ```
2. Verify database exists:
   ```sql
   SHOW DATABASES;
   SELECT * FROM currency_app.conversion_history;
   ```

### Problem: Conversions not saving
**Solution:**
1. Check browser console for POST errors
2. Check server logs for "Saving:" messages
3. Verify .env file has correct DB credentials

## 📊 Database Schema

```sql
Table: conversion_history
├── id (INT, Primary Key, Auto Increment)
├── from_currency (VARCHAR 10)
├── to_currency (VARCHAR 10)
├── amount (DECIMAL 18,6)
├── rate (DECIMAL 30,12)
├── total (DECIMAL 30,12)
└── created_at (TIMESTAMP, Default: CURRENT_TIMESTAMP)
```

## 🔄 API Endpoints

### POST /save-history
**Request:**
```json
{
  "from_currency": "PKR",
  "to_currency": "USD",
  "amount": 10,
  "rate": 0.003564,
  "total": 0.03564
}
```

**Response:**
```json
{
  "ok": true,
  "id": 1
}
```

### GET /history
**Response:**
```json
[
  {
    "id": 1,
    "from_currency": "PKR",
    "to_currency": "USD",
    "amount": "10.000000",
    "rate": "0.003564000000",
    "total": "0.035640000000",
    "created_at": "2025-12-18T12:00:00.000Z"
  }
]
```

## 🛑 Stopping the Server
Press `CTRL + C` in Terminal 1

## 📝 Next Steps
- Customize exchange rate API if needed
- Add user authentication
- Deploy to cloud (Heroku, AWS, etc.)
- Add delete/update history features

## ✨ Features Included
✅ Real-time currency conversion  
✅ History storage in MySQL  
✅ View all previous conversions  
✅ Timestamps for each conversion  
✅ CORS enabled for frontend  
✅ Error handling & logging  
✅ Responsive UI (Tailwind CSS)  

---

**Support:** Check browser console (F12) and server terminal for error messages.
