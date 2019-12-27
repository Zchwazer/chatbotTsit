//! Initialize Library
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//---------------------------------------------------------------------//
//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
//---------------------------------------------------------------------//
//! Setting app
//? Use cors
app.use(cors({
        origin: true
    }))
    //? Use Body-parser
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: false
    }))
    //? Setting path to configuration endpoint file
    .use("/", require("../service/route"))
    //? Setting overall error when detect another endpoint not contain is route.js
    .get('*', (_, res) => res.status(404)
        .json({
            status: 404,
            data: "Error endpoint not found"
        }));

//---------------------------------------------------------------------//
module.exports = app;

//# Use "firebase serve" in cmd to test function
//~ should cd to functions before use firebase serve

//# Use "firebase deploy" in cmd to deploy function to server

