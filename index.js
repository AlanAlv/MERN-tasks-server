const express = require('express');

// Create server
const app = express();

// App port
const PORT = process.env.PORT || 4000;

// Start app
app.listen(PORT, () =>  {
    console.log(`Server running on port ${PORT}`);
});