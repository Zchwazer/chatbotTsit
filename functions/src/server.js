const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//---------------------------------------------------------------------//
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
//---------------------------------------------------------------------//
app.use(cors({
        origin: true
    }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .use("/", require("../service/route"))
    .get('*', (_, res) => res.status(404)
        .json({
            status: 404,
            data: "Error endpoint not found"
        }));

module.exports = app;