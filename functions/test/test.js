//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//
//# Test Section

var id = "115910400343-2"
var level = 1

let userRef = db.collection('users').doc(id)
let getRef = userRef.get()
    .then(doc => {
        if (!doc.exists) {
            console.log(err);
        } else {
            let setAda = userRef.update({
                Level: level
            });
            console.log(doc.data())
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json({
            status: 404,
            data: "Error, some input was missing"
        })
    });