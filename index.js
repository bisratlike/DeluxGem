const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const databaseUrl = process.env.DATABASE_URL;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(databaseUrl, { })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);

// Start the server

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
 
  });
  
  module.exports = server;


