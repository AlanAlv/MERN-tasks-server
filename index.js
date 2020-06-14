const express = require('express');
const connectDB = require('./config/db');

// Create server
const app = express();

// Connect Database
connectDB();

// Express.json
app.use(express.json({extended: true}));

// App port
const PORT = process.env.PORT || 4000;

// Import Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));


// Start app
app.listen(PORT, () =>  {
    console.log(`Server running on port ${PORT}`);
});