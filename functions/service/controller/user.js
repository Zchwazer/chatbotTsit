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

//? Get All user (Limit)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/{limitNumber}
//* List all user in 'user' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getLimitUser(req, res) {
    var userAllData = [];
    let userRef = db.collection('users').limit(parseInt(req.params.limit))
    let getRef = userRef.get()
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

//? Get Once user (with sign)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/userSign/{userId}
//* Detail of once document of 'users' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function getOnceUserHaveSign(req, res) {
    var getId = req.params.id
    var firstId = getId.substr(0, 12)
    var lastId = getId.substr(12)
    
    var id = firstId + "-" + lastId
    
    let userRef = db.collection('users').doc(id)
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

//? Get once user filter by email
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/filter/{email}
//* Detail of once document of 'users' collection (find by email)
//~ use in mobile app to get data for display to mobile app
function getOnceEmail(req, res) {
    var getUserByEmail = [];
    db.collection('users').where("Email", "==", req.params.email).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                getUserByEmail.push(doc.data());
            });

            //~ While not found that email
            if (getUserByEmail.length == 0) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, User not found"
                })
            }

            //~ While found email then send only 1 data
            if (getUserByEmail.length === 1) {
                let getOnce = getUserByEmail[0];
                return res.send(getOnce);
            }

            //~ While bug have same email
            else {
                return res.status(404).json({
                    status: 404,
                    data: "Error, Found multiple user"
                })
            }
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, Endpoint not found"
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
    //~ Generate student Id 
    var getId = req.body.Id
    var firstId = getId.substr(0, 12)
    var lastId = getId.substr(12)
    
    var id = firstId + "-" + lastId
    
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
                    .then(studentDoc => {
                        if (!studentDoc.exists) {
                            return res.status(404).json({
                                status: 404,
                                data: "Error, this id is not computer engineering student"
                            })
                        } else {
                            //~ Get first name & last name
                            var thName = studentDoc.data().NameTH
                            var enName = studentDoc.data().NameEN
                            var major = studentDoc.data().Major
                            var fac = studentDoc.data().Faculty
                            var stat = studentDoc.data().Status
                            var deg = studentDoc.data().Degree
                            var studentId = studentDoc.data().Id

                            //~ Add data to users collection
                            let docRef = db.collection('users').doc(studentId);

                            let setAda = docRef.set({
                                Id: studentId,
                                NameTH: thName,
                                NameEN: enName,
                                Email: req.body.Email,
                                Password: req.body.Password,
                                Major: major,
                                Faculty: fac,
                                Status: stat,
                                Degree: deg,
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
                data: "Error, Endpoint not Found"
            })
        });
}

//? Update user data
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/updateLv/{userId}
//~ use in web app for administrator to change level of user from "student" to "leader"
function updateOnceUser(req, res) {
    let userRef = db.collection('users').doc(req.params.id)
    let getRef = userRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, user not found"
                })
            } else {
                let setAda = userRef.update({
                    Level: req.body.Level
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

//? Update user password
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/password/{userId}
//~ use in web app for administrator to change level of user from "student" to "leader"
function updateUserPassword(req, res) {
    let userRef = db.collection('users').doc(req.params.id)
    let getRef = userRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, user not found"
                })
            } else {
                let setAda = userRef.update({
                    Password: req.body.Password
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

//? Update user email
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/email/{userId}
//~ use in web app for administrator to change level of user from "student" to "leader"
function updateUserEmail(req, res) {
    let userRef = db.collection('users').doc(req.params.id)
    let getRef = userRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, user not found"
                })
            } else {
                let setAda = userRef.update({
                    Email: req.body.Email
                });

                return res.status(201).json({
                    status: 201,
                    data: "User email has been update success"
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
//! WARNING
//? User level 0 = Normal student
//? User level 1 = Leader student (have priority to post new work in group)
//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllUser,
    getLimitUser,
    getOnceUser,
    getOnceUserHaveSign,
    getOnceEmail,
    addOnceUser,
    updateOnceUser,
    updateUserPassword,
    updateUserEmail
}