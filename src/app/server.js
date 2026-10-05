const express = require('express');
const app = express();

// Kết nối CSDL backend
app.get('/api/products', (req, res) => {
    // Queries PostgreSQL / MySQL Database
    res.json([]);
});

app.listen(3000);