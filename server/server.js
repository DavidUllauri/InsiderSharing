require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const db = require("./db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/following', require('./routes/following'));
app.use('/api/search', require('./routes/search'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));