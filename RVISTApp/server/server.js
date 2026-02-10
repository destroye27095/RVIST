const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files - Serve from root since index.html is there
app.use(express.static(path.join(__dirname, '../')));

// API Routes
app.use('/api/v1', apiRoutes);

// Catch-all for sub-pages or SPA handling if needed, 
// but since this is structure as multipage with .html, static serve handles it.
// Explicit route for root to be sure
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`
    🚀 RVIST Smart Management System Server Running
    -----------------------------------------------
    📡 Port: ${PORT}
    🏠 URL:  http://localhost:${PORT}
    -----------------------------------------------
    `);
});
