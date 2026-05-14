// server.js - Complete Working Backend (SIMPLE VERSION)
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// In-memory storage (works immediately without MySQL setup)
let conversationHistory = [];
let nextId = 1;

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method.padEnd(6)} ${req.path}`);
  next();
});

// ===== HEALTH CHECK =====
app.get('/health', (req, res) => {
  console.log('  ✓ Health check passed');
  res.json({ status: 'ok', mode: 'in-memory' });
});

// ===== POST /save-history =====
app.post('/save-history', (req, res) => {
  try {
    const { from_currency, to_currency, amount, rate, total } = req.body;

    // Validate
    if (!from_currency || !to_currency || amount == null || rate == null || total == null) {
      console.log('  ✗ Missing fields in request body');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create record
    const record = {
      id: nextId++,
      from_currency,
      to_currency,
      amount: parseFloat(amount),
      rate: parseFloat(rate),
      total: parseFloat(total),
      created_at: new Date().toISOString()
    };

    conversationHistory.push(record);
    
    console.log(`  ✓ Saved: ${from_currency} → ${to_currency} (ID: ${record.id})`);
    res.json({ ok: true, id: record.id });

  } catch (error) {
    console.error('  ✗ POST error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===== GET /history =====
app.get('/history', (req, res) => {
  try {
    // Return in reverse order (newest first)
    const sorted = [...conversationHistory].reverse();
    console.log(`  ✓ Returning ${sorted.length} records`);
    res.json(sorted);

  } catch (error) {
    console.error('  ✗ GET error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log('\n═══════════════════════════════════════════');
  console.log('   CURRENCY CONVERTER - BACKEND SERVER');
  console.log('═══════════════════════════════════════════\n');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`\n📍 API Endpoints:`);
  console.log(`   POST  /save-history  (save a conversion)`);
  console.log(`   GET   /history       (get all conversions)`);
  console.log(`   GET   /health        (health check)`);
  console.log(`\n💾 Storage: In-Memory`);
  console.log(`⚠️  Data persists until server restarts\n`);
  console.log('Waiting for requests...\n');
});

// Error handling
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
