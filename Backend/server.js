// ✅ RIGHT (example)
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/lead');
const JWT_SECRET = process.env.JWT_SECRET;

require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
// server.js me
app.use(express.json());

// Default route
app.get('/', (req, res) => res.send('API Running'));

// Auth routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
