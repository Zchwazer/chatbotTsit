//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//
//# Test Section
var x = 6;
switch (x) {
    case 0:
        console.log("My Name is A")
        break;
    case 1:
        console.log("My Name Is B")
        break;
    default:
        console.log("My Name Is C")
        break;
}