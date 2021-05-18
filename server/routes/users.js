require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const { check, validationResult } = require('express-validator');

// @desc     Add a user
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters',
  ).isLength({ min: 6 }),
  check('last_name', 'Please add last name').notEmpty(),
  check('first_name', 'Please add first name').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);

    try {
      const { email, password, last_name, first_name } = req.body;

      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

      if (user.rows.length > 0) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const results = await db.query(
        'INSERT INTO users (email, password, last_name, first_name) values ($1,$2,$3,$4) returning *',
        [email, password, last_name, first_name]
      );

      // console.log(results);

      const payload = {
        user: {
          id: results.rows[0].id
        }
      }

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

// @desc     Update a user
router.put('/:id', async (req, res) => {
  console.log(req.body);

  try {
    const { email, password, last_name, first_name } = req.body;
    const { id } = req.params;
    const results = await db.query(
      'UPDATE users SET email = $1, password = $2, last_name = $3, first_name = $4 where id = $5 returning *',
      [email, password, last_name, first_name, id]
    );
    console.log(results);
    res.status(201).json({
      status: 'success',
      results: results.rows.length,
      data: {
        users: results.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Eror');
  }
});

// @desc     Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const users = await db.query('DELETE FROM users where id = $1', [id]);

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Eror');
  }
});

// @desc     Get all users
router.get('/', async (req, res) => {
  try {
    const users = await db.query(
      'SELECT email, last_name, first_name FROM users'
    );

    res.status(200).json({
      status: 'success',
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
