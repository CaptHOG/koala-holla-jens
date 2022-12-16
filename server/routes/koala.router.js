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
    `
    let sqlValues = [newKoala.name, newKoala.age, newKoala.gender, newKoala.readyForTransfer, newKoala.notes];
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
koalaRouter.put('/:id', (req, res) => {
    console.log('req.params', req.params);
    console.log('req.body', req.body);
    let idToUpdate = req.params.id;
    let newTransferStatus = req.body.readyForTransfer;

    let sqlQuery = `
        UPDATE "koalas"
            SET "ready_for_transfer"=$1
            WHERE "id"=$2;
    `
    let sqlValues = [newTransferStatus, idToUpdate];

    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('something went wrong in PUT /koalas/:id', dbErr);
            res.sendStatus(500);
        })
})

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    console.log(req.params);
    let idToDelete = req.params.id;

    let sqlQuery = `
        DELETE FROM "koalas"
            WHERE "id"=$1;
    `
    let sqlValues = [idToDelete];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('something went wrong in DELETE /koalas/:id', dbErr);
            res.sendStatus(500);
        })
})


module.exports = koalaRouter;