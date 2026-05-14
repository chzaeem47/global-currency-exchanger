# Currency Exchanger — Backend + History

This project is a simple frontend currency converter and a small Node.js backend to store exchange history in MySQL.

Setup

1. Install dependencies:

```bash
npm install
```

2. Create a MySQL database (example name `currency_app`).

3. Copy `.env.example` to `.env` and set your DB credentials.

4. Start the server:

```bash
# development with auto-reload (requires nodemon)
npm run dev

# or start normally
npm start
```

5. Open `index.html` in your browser (frontend is static). The app will POST exchanges to `http://localhost:3000/save` and fetch history from `http://localhost:3000/history`.

Database table

The server will create the `history` table automatically on first run. Manual SQL (optional):

```sql
CREATE TABLE history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  from_currency VARCHAR(10),
  to_currency VARCHAR(10),
  amount DECIMAL(18,6),
  result DECIMAL(18,6),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Notes

- Ensure the backend `PORT` and DB settings are correct in `.env`.
- Frontend expects the backend on `http://localhost:3000`.
