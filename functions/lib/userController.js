//-- About comment color definition
//! Red     : Main Topic each section
//? Blue    : Sub Topic each section
//# Yellow  : Example endpoint 
//* Green   : Work of this section
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
//! Initialize Additional Function
const additional = require('./additional');
//---------------------------------------------------------------------//
//! User Collection Section
//? Get All user
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user
//* List all user in 'users' collection 
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
            return additional.error404();
        });
}

//? Get Once user
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/{userId}
//* Detail of once document of 'users' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function getOnceUser(req, res) {
    let userRef = db.collection('users').doc(req.params.id)
    let getOnce = userRef.get()
        .then(doc => {
            if (!doc.exists) {
                return additional.error404();
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return additional.error404();
        });
}

//? Add user
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/
//* Add .json data to 'users' collection in cloud firestore
//* .json body Example {
//* 	"userId" : {Number},
//* 	"userEmail": {Email},
//* 	"userPassword": {String}
//* }
//~ use in registration page on mobile app
function addOnceUser(req, res) {
    var userName = []
    var id = req.body.userId
    var email = req.body.userEmail
    var password = req.body.userPassword

    //~ Add data to users collection
    let docRef = db.collection('users').doc(id);

    let setAda = docRef.set({
        userId: id,
        userEmail: email,
        userPassword: password,
        userLevel: 0
    });

    return res.status(201)
                    .json({
                        status: 201,
                        data: "Add data into collection complete"
                    })

    // //~ Check student id & password length is == 13 ?
    // // additional.checkLength(id, password)

    // //~ Check student id is CPE student ?
    // let stuRef = db.collection('students').doc(id);
    // let checkOnce = stuRef.get()

    //     .then(doc => {
    //         if (!doc.exists) {
    //             additional.error404();
    //         } else {
    //             //~ Get first name & last name
    //             userName.push(doc.data().stuFname)
    //             userName.push(doc.data().stuLname)
    //             var fName = doc.data().stuFname
    //             var lName = doc.data().stuLname

    //             //~ Add data to users collection
    //             let docRef = db.collection('users').doc(id);

    //             let setAda = docRef.set({
    //                 userId: id,
    //                 userFname: fName,
    //                 userLname: lName,
    //                 userEmail: email,
    //                 userPassword: password,
    //                 userLevel: 0
    //             });

    //             return res.status(201)
    //                 .json({
    //                     status: 201,
    //                     data: "Add data into collection complete"
    //                 })
    //         }
    //     })
    //     .catch(err => {
    //         additional.error404();
    //     });
}

//? Update user data
//# PUT METHOD => {test url}
//~ use in web app for administrator to change level of user from "student" to "leader"
function updateOnceUser(req, res) {
    return
}

//! Export function to route
module.exports = {
    getAllUser,
    getOnceUser,
    addOnceUser,
    updateOnceUser
}