//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//


// var getId = '1159104003382'
// var firstId = getId.substr(0, 12)
// var lastId = getId.substr(12)

// var id = firstId + "-" + lastId

// let userRef = db.collection('users').doc(id)
// let getOnce = userRef.get()
//     .then(doc => {
//         if (!doc.exists) {
//             console.log('user not found')
//         } else {
//             // console.log('hello World')
//             console.log(doc.data())
//         }
//     })
//     .catch(err => {        
//         console.log(err)
//     });
getLevel = 0

getLevel == 1 ? userLevel = "หัวหน้าห้อง" : userLevel = "นักศึกษาทั่วไป"
console.log(userLevel)