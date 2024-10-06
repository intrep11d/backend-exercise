// app.js
const express = require('express');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middleware/loggerMiddleware');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Routes
app.use('/', authRoutes);
app.use('/', profileRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});