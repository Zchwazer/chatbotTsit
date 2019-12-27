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
//* 	"userId" : 1234567890123,
//* 	"userEmail": testament@example.com,
//* 	"userPassword": 123456
//* }
//~ use in registration page on mobile app
function addOnceUser(req, res) {
    var id = req.body.userId
    var email = req.body.userEmail
    var password = req.body.userPassword

    //~ Check student id & password length is == 13 ?
    

    //~ Check user already register ?
    

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
                var fName = doc.data().stuFname
                var lName = doc.data().stuLname

                //~ Add data to users collection
                let docRef = db.collection('users').doc(id);

                let setAda = docRef.set({
                    userId: id,
                    userFname: fName,
                    userLname: lName,
                    userEmail: email,
                    userPassword: password,
                    userLevel: 0
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

//? Update user data
//# PUT METHOD => {test url}
//~ use in web app for administrator to change level of user from "student" to "leader"
function updateOnceUser(req, res) {
    var id = req.body.userId
    var level = req.body.userLevel

    let userRef = db.collection()
    return res.status(201).json({
        status: 201,
        data: "Student level change success"
    })
}
//---------------------------------------------------------------------//
//! Additional Function
//? Registration Section
//* Check user and password length 
function checkLength(id, password) {
    //~ Check id length is == 13 because student id is = 13
    var length = false

    id.length != 13 ? length = false : length = true;
    password.length != 6 ? length = false : length = true;

    if (length == false) {
        res.status(404)
            .json({
                status: 404,
                data: "id or password length was incorrect"
            });
    }
}

//* Check account already register
function checkRegister(){

}
//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllUser,
    getOnceUser,
    addOnceUser
    // updateOnceUser
}