const express = require('express');
const connectDB = require('./config/db');

// Create server
const app = express();

// Connect Database
connectDB();

// App port
const PORT = process.env.PORT || 4000;

// Import Routes
app.use('/api/users', require('./routes/users'))

// Start app
app.listen(PORT, () =>  {
    console.log(`Server running on port ${PORT}`);
});