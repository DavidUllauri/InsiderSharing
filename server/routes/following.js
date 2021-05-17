require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @rout    /api/following/companies
// @desc    Add a company
router.post('/companies',
    auth,
    check('ticker', 'Ticker is required').notEmpty(),
    async (req, res) => {

        console.log(req.body);

        try {
            const { ticker } = req.body;
            const { id } = req.user;

            const company = await db.query('SELECT * FROM companies WHERE ticker = $1', [ticker]);

            if (company.rows.length === 0) {
                return res.status(400).json({ msg: 'Company does not exist' });
            }

            const isFollowing = await db.query('SELECT * FROM user_companies WHERE user_id = $1 AND ticker = $2', [id, ticker]);

            if (isFollowing.rows.length > 0) {
                // TODO maybe this should be the unfollow???
                return res.status(400).json({ msg: 'You are already following that company.' });
            }

            const userCompany = await db.query(
                'INSERT INTO user_companies (user_id, ticker) values ($1,$2) returning *',
                [id, ticker]
            );

            res.status(201).json({
                status: 'success',
                results: userCompany.rows.length,
                data: {
                    companies: userCompany.rows,
                },
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Eror');
        }
    }
);

// @desc     Add a owner
router.post('/owners',
    auth,
    check('filing_id', 'filing_id is required').notEmpty(),
    async (req, res) => {

        console.log(req.body);

        try {
            const { filing_id } = req.body;
            const { id } = req.user;

            const owner = await db.query('SELECT * FROM owner_names WHERE filings = $1', [filing_id]);

            if (owner.rows.length === 0) {
                return res.status(400).json({ msg: 'Owner does not exist' });
            }

            const isFollowing = await db.query('SELECT * FROM user_owners WHERE user_id = $1 AND filing_id = $2', [id, filing_id]);

            if (isFollowing.rows.length > 0) {
                // TODO maybe this should be the unfollow???
                return res.status(400).json({ msg: 'You are already following that owner.' });
            }

            const userOwner = await db.query(
                'INSERT INTO user_owners (user_id, filing_id) values ($1,$2) returning *',
                [id, filing_id]
            );

            res.status(201).json({
                status: 'success',
                results: userOwner.rows.length,
                data: {
                    owners: userOwner.rows,
                },
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Eror');
        }
    }
);

// @desc     Get all companies and owners the user is following
router.get('/', auth, async (req, res) => {
    try {
        const { id } = req.user;
        const companies = await db.query('SELECT * FROM user_companies WHERE user_id = $1', [id]);
        const owners = await db.query('SELECT * FROM user_owners WHERE user_id = $1', [id]);

        res.status(200).json({
            status: 'success',
            data: {
                companies: companies.rows,
                owners: owners.rows,
            },
        });
    } catch (err) {
        res.status(500).send('Server Eror');
    }
});

// @desc     Get all companies the user is following
router.get('/companies', auth, async (req, res) => {
    try {
        const { id } = req.user;
        const companies = await db.query('SELECT * FROM user_companies WHERE user_id = $1', [id]);

        res.status(200).json({
            status: 'success',
            data: {
                companies: companies.rows,
            },
        });
    } catch (err) {
        res.status(500).send('Server Eror');
    }
});

// @desc     Get all owners the user is following
router.get('/owners', auth, async (req, res) => {
    try {
        const { id } = req.user;
        const companies = await db.query('SELECT * FROM user_companies WHERE user_id = $1', [id]);
        const owners = await db.query('SELECT * FROM user_owners WHERE user_id = $1', [id]);

        res.status(200).json({
            status: 'success',
            data: {
                companies: companies.rows,
                owners: owners.rows,
            },
        });
    } catch (err) {
        res.status(500).send('Server Eror');
    }
});

// @desc     Unfollow a company
router.delete('/companies/:ticker', auth, async (req, res) => {
    try {
        const { id } = req.user;
        const { ticker } = req.params;

        const company = await db.query('DELETE FROM user_companies where user_id = $1 AND ticker = $2', [id, ticker]);

        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Eror');
    }
});

// @desc     Unfollow a owner
router.delete('/owners/:filing_id', auth, async (req, res) => {
    try {
        const { id } = req.user;
        const { filing_id } = req.params;

        const owner = await db.query('DELETE FROM user_owners where user_id = $1 AND filing_id = $2', [id, filing_id]);

        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Eror');
    }
});

module.exports = router;