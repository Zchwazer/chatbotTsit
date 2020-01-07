//-- About comment color definition
//! Red     : Main Topic each section
//? Blue    : Sub Topic each section
//# Yellow  : Example endpoint 
//* Green   : Work of this section
//~ Pink    : Explain function
//---------------------------------------------------------------------//
//! Initialize Cloud Firestore
const admin = require('firebase-admin');

let db = admin.firestore();
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
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
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
                return res.status(404).json({
                    status: 404,
                    data: "Error, user not found"
                })
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, user not found"
            })
        });
}

//? Add user
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/
//* Add .json data to 'users' collection in cloud firestore
//* .json body Example {
//* 	"Id" : "1234567890123",
//* 	"Email": "testament@example.com",
//* 	"Password": "123456"
//* }
//~ use in registration page on mobile app
function addOnceUser(req, res) {
    var id = req.body.Id
    var email = req.body.Email
    var password = req.body.Password

    //~ Check user already register ?
    let userRef = db.collection('users').doc(id);
    let checkUser = userRef.get()
        .then(doc => {
            if (doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, this student has been already register"
                })
            } else {
                //~ Check student id is CPE student ?
                let stuRef = db.collection('students').doc(id);
                let checkOnce = stuRef.get()
                    .then(doc => {
                        if (!doc.exists) {
                            return res.status(404).json({
                                status: 404,
                                data: "Error, this id is not computer engineering student"
                            })
                        } else {
                            //~ Get first name & last name
                            var thName = doc.data().NameTH
                            var enName = doc.data().NameEN
                            var major = doc.data().Major
                            var fac = doc.data().Faculty
                            var stat = doc.data().Status

                            //~ Add data to users collection
                            let docRef = db.collection('users').doc(id);

                            let setAda = docRef.set({
                                Id: id,
                                NameTH: thName,
                                NameEN: enName,
                                Email: email,
                                Password: password,
                                Major:major,
                                Faculty:fac,
                                Status:stat,                                
                                Level: 0
                            });

                            return res.status(201)
                                .json({
                                    status: 201,
                                    data: "Add data into collection complete"
                                })
                        }
                    })
                    .catch(err => {
                        return res.status(404).json({
                            status: 404,
                            data: "Error, some input was missing"
                        })
                    });
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, some input was missing"
            })
        });
}

//? Update user data
//# PUT METHOD => {test url}
//~ use in web app for administrator to change level of user from "student" to "leader"
function updateOnceUser(req, res) {
    var id = req.params.Id
    var level = req.body.Level

    let userRef = db.collection('users').doc(id)
    let getRef = userRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, user not found"
                })
            } else {
                let setAda = userRef.update({
                    Level: level
                });

                return res.status(201).json({
                    status: 201,
                    data: "User has been update success"
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, some input was missing"
            })
        });
}
//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllUser,
    getOnceUser,
    addOnceUser,
    updateOnceUser
}