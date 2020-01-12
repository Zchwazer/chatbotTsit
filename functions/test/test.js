//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//
//# Test Section
var allData = [];
db.collection('users').limit(2).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            allData.push(doc.data());
        });
        console.log(allData)
    })
    .catch((err) => {
        console.log(err)
    });