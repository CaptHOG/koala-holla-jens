const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');

// GET
koalaRouter.get('/', (req, res) => {
    console.log('in koalaRouter GET');
    let sqlQuery = `
      SELECT * FROM "koalas" 
        ORDER BY "id";
    `;
    pool.query(sqlQuery)
      .then((dbRes) => {
      // sends back array of koala objects
        res.send(dbRes.rows);
      })
      .catch((dbErr) => {
        console.log('error getting koalas', dbErr);
        res.sendStatus(500);
      });
  });

// POST


// PUT


// DELETE

module.exports = koalaRouter;