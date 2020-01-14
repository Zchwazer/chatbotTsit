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
            if (getUserByEmail.length === 1){
                let getOnce = getUserByEmail[0];
                return res.send(getOnce);
            }
            else{
                return res.send(getUserByEmail);
            }            
        })
        .catch((err) => {                        
            return res.status(404).json({
                status: 404,
                data: "Error, News type not found"
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
                            var deg = doc.data().Degree
                            var studentId = doc.data().Id

                            //~ Add data to users collection
                            let docRef = db.collection('users').doc(studentId);

                            let setAda = docRef.set({
                                Id: studentId,
                                NameTH: thName,
                                NameEN: enName,
                                Email: email,
                                Password: password,
                                Major:major,
                                Faculty:fac,
                                Status:stat,
                                Degree:deg,                                
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
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/level/{userId}
//~ use in web app for administrator to change level of user from "student" to "leader"
function updateOnceUser(req, res) {    
    var id = req.params.id
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

//? Update user password
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/password/{userId}
//~ use in web app for administrator to change level of user from "student" to "leader"
function updateUserPassword(req, res) {
    var id = req.params.id
    var password = req.body.Password

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
                    Password: password
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
    var id = req.params.id
    var email = req.body.Email

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
                    Email: email
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
    getOnceEmail,
    addOnceUser,
    updateOnceUser,
    updateUserPassword,
    updateUserEmail
}