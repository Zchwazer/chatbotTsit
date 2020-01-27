//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//
//# Test Section
//~ Check uuid is not generate same as uuid in collection (But is very hard to generate same like before)

let groupRef = db.collection('groups').doc("111")
let getOnce = groupRef.get()
    .then(doc => {
        if (!doc.exists) {
            let groupRef = db.collection('groups').doc("111");

            let setAda = groupRef.set({
                Id: 111,
                Sec: "sec"
            });

            let teachRef = db.collection('groups').doc("111").collection('teachers').doc("222");

            let setTeach = teachRef.set({
                Id: 222,
                Name:"AAA"
            })

            return console.log("success")

        } else {
            throw err            
        }
    })
    .catch(err => {
        console.log(err)
    });