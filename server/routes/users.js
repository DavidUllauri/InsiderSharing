require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../db");

// @desc     Get all users
router.get('/', async (req, res) => {
    try {
        const users = await db.query("SELECT email, last_name, first_name FROM users");

        res.status(200).json({
            status: "success",
            results: users.rows.length,
            data: {
                users: users.rows,
            },
        });
    } catch (err) {
        res.status(500).send('Server Eror');
    }
});

module.exports = router;