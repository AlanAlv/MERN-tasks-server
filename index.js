const express = require('express');
const connectDB = require('./config/db');

// Create server
const app = express();

// Connect Database
connectDB();

// App port
const PORT = process.env.PORT || 4000;

// Start app
app.listen(PORT, () =>  {
    console.log(`Server running on port ${PORT}`);
});