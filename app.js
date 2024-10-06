// app.js
const express = require('express');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middleware/loggerMiddleware');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const { generalLimiter } = require('./middleware/rateLimiter');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Routes
app.use('/', authRoutes);
app.use('/', profileRoutes);

app.use(generalLimiter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});