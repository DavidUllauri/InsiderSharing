require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../db');

// @desc     Add a user
router.post('/', async (req, res) => {
  console.log(req.body);

  try {
    const { email, password, last_name, first_name } = req.body;
    const results = await db.query(
      'INSERT INTO users (email, password, last_name, first_name) values ($1,$2,$3,$4) returning *',
      [email, password, last_name, first_name]
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

// USER COMPANIES STUFF
// @desc     Add a company
router.post('/company', async (req, res) => {
  console.log(req.body);

  try {
    const { email, password, last_name, first_name } = req.body;
    const results = await db.query(
      'INSERT INTO users (email, password, last_name, first_name) values ($1,$2,$3,$4) returning *',
      [email, password, last_name, first_name]
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

module.exports = router;
