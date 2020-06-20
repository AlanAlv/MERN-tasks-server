const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')

// Create server
const app = express();

// Connect Database
connectDB();

// Enable cors
app.use(cors());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" )
    next();
});

// Express.json
app.use(express.json({extended: true}));

// App port
const port = process.env.port || 4000;

// Import Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Start app
app.listen(port,  () =>  {
    console.log(`Server running on port ${port}`);
});