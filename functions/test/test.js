//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//
//# Test Section
var date = "2020-02-01"
var year = date.substr(0,4)
var month = date.substr(5,2)
var day = date.substr(8,9)
console.log("Day : ",day)
console.log("Month : ",month)
console.log("Year : ",year)