require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator')

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
    try {
        const { id } = req.user;
        const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @desc     Login user & get token
router.post(
    '/',
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required',).exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Whats going on???");
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);

        try {
            const { email, password, last_name, first_name } = req.body;

            const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

            if (user.rows.length === 0) {
                // Message creates a security risk remove in production
                return res.status(400).json({ msg: 'User doesn\'t exist' });
            }

            const isMatch = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
            console.log('isMatch length: ' + isMatch.rows.length);

            if (isMatch.rows.length === 0) {
                // Message creates a security risk remove in production
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const payload = {
                user: {
                    id: user.rows[0].id
                }
            }
            console.log("user id: " + user.rows[0].id);

            jwt.sign(
                payload,
                process.env.JWTSECRET,
                {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                },
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Eror');
        }
    }
);

module.exports = router;