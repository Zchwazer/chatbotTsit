//-- About comment color definition
//! Red     : Main Topic each section
//? Blue    : Sub Topic each section
//# Yellow  : Work of this section
//* Green   : Example endpoint
//~ Pink    : Explain function
//---------------------------------------------------------------------//
//! Initialize Cloud Firestore
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//
//! User Collection Section
//? Get All user
//# List all user in 'users' collection 
//* http://localhost:5000/newagent-47c20/us-central1/api/user
//~ use in web app (admin) to look all of user in mobile app
function getAllUser(req, res) {
    var userAllData = [];
    db.collection('users').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                userAllData.push(doc.data());
            });
            return res.send(userAllData);
        })
        .catch((err) => {
            return res.status(404)
                .json({
                    status: 404,
                    data: "Error endpoint not found"
                });
        });
}

//? Get Once user
//# Detail of once document of 'users' collection (find by id)
//* http://localhost:5000/newagent-47c20/us-central1/api/user/{userId}
//~ use in mobile app to get data for display to mobile app
function getOnceUser(req, res) {
    let userRef = db.collection('users').doc(req.params.id)
    let getOnce = userRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404)
                    .json({
                        status: 404,
                        data: "User not found"
                    });
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404)
                .json({
                    status: 404,
                    data: "Error endpoint not found"
                });
        });
}

//? Add user
//# Add .json data to 'users' collection
//* 
//~ use in registration page on mobile app
function addOnceUser(req, res) {
    return
}

//? Update user data
//#  
//* 
//~ use in web app for administrator to change level of user from "student" to "leader"
function updateOnceUser(req, res) {
    return
}

//! Export function to route
module.exports = {
    getAllUser,
    getOnceUser
}