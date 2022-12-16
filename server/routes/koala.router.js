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
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;
    console.log('adding koala', newKoala);

    let sqlQuery = `
        INSERT INTO "koalas" ("name", "age", "gender", "ready_for_transfer", "notes")
            VALUES ($1, $2, $3, $4, $5);
    `;
    let sqlValues = [newKoala.name, newKoala.age, newKoala.gender, newKoala.ready_for_transfer, newKoala.notes];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.log('Error adding new koala', dbErr);
        res.sendStatus(500);
    })
})

// PUT


// DELETE

module.exports = koalaRouter;