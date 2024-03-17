const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
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
app.use("/", authRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);

// Start the server

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
 
  });
  
  module.exports = server;


