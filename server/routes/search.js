require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const { check, validationResult } = require('express-validator');

// Return companies
router.post('/', async (req, res) => {
    try {
        const { ticker } = req.body;

        const company = await db.query('SELECT * FROM companies WHERE ticker = $1', [ticker]);

        if (company.rows.length === 0) {
            return res.status(400).json({ msg: 'Company does not exist' });
        }

        res.status(201).json({
            status: 'success',
            results: company.rows.length,
            data: {
                companies: company.rows,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Eror');
    }
});

// Return owners
router.get('/:ticker', async (req, res) => {
    try {
        const { ticker } = req.params;

        const company = await db.query('SELECT * FROM companies WHERE ticker = $1', [ticker]);

        if (company.rows.length === 0) {
            return res.status(400).json({ msg: 'Company does not exist' });
        }

        const { cik } = company.rows[0];

        console.log(cik);

        const owners = await db.query(
            'SELECT cik, owner_corps.filings, owner_name FROM owner_corps join owner_names on owner_corps.filings = owner_names.filings WHERE cik = $1',
            [cik]
        );

        // ---- With titles (but the titles are from owners_raw)
        // const owners = await db.query(
        //     'SELECT owner_corps.cik, owner_corps.filings, owner_names.owner_name, title FROM owner_corps ' +
        //     'join owner_names on owner_corps.filings = owner_names.filings join owners_raw on owner_corps.filings = owners_raw.filings ' +
        //     'WHERE owner_corps.cik = $1',
        //     [cik]
        // );

        // console.log(owners.rows);

        res.status(201).json({
            status: 'success',
            results: owners.rows.length,
            data: {
                companies: owners.rows,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Eror');
    }
});

// Return owner transactions
router.get('/:ticker/:filing_id', async (req, res) => {
    try {
        const { ticker, filing_id } = req.params;

        const transactions = await db.query('SELECT * FROM transactions WHERE filing_id = $1', [filing_id]);

        res.status(201).json({
            status: 'success',
            results: transactions.rows.length,
            data: {
                transactions: transactions.rows,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Eror');
    }
});

module.exports = router;