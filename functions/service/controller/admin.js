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
//! Admin Collection Section
//? Get All admin
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/admin
//* List all admin in 'admins' collection 
//~ use in web app (admin) to look all of admin in mobile app
function getAllAdmin(req, res) {
    var adminAllData = [];
    db.collection('admins').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                adminAllData.push(doc.data());
            });
            return res.send(adminAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get All admin (Limit)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/admin/{limitNumber}
//* List all admin in 'admin' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getLimitAdmin(req, res) {
    var adminAllData = [];
    let adminRef = db.collection('admins').limit(parseInt(req.params.limit))
    let getRef = adminRef.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                adminAllData.push(doc.data());
            });
            return res.send(adminAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get Once admin
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/admin/{adminId}
//* Detail of once document of 'admins' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function getOnceAdmin(req, res) {
    let adminRef = db.collection('admins').doc(req.params.id)
    let getOnce = adminRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, admin not found"
                })
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, admin not found"
            })
        });
}

//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/admin/filter/{email}
//* Detail of once document of 'admins' collection (find by email)
//~ use in mobile app to get data for display to mobile app
function getOnceAdminEmail(req, res) {
    var getAdminByEmail = [];
    db.collection('admins').where("Email", "==", req.params.email).get()
        .then((snapshot) => {            
            snapshot.forEach((doc) => {
                getAdminByEmail.push(doc.data());            
            });
            if (getAdminByEmail.length === 1){
                let getOnce = getAdminByEmail[0];
                return res.send(getOnce);
            }
            else{
                return res.send(getAdminByEmail);
            }            
        })
        .catch((err) => {                        
            return res.status(404).json({
                status: 404,
                data: "Error, News type not found"
            })
        });
}

//? Add admin
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/admin/
//* Add .json data to 'admins' collection in cloud firestore
//* .json body Example {
//* 	"Email": "testament@example.com",
//* 	"Password": "123456"
//*     "NameTH" : "สุด ยอด",
//*     "NameEN" : "Sud Yod",
//*     "Tel" : "0x xxxx xxxx",
//* }
//~ use in registration page on mobile app
function addOnceAdmin(req, res) {
    
}

//? Update admin password
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/admin/password/{adminId}
//~ use in web app for administrator to change level of admin from "student" to "leader"
function updateAdminPassword(req, res) {
    let adminRef = db.collection('admins').doc(req.params.id)
    let getRef = adminRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, admin not found"
                })
            } else {
                let setAda = adminRef.update({
                    Password: req.body.Password
                });

                return res.status(201).json({
                    status: 201,
                    data: "admin has been update success"
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

//? Update admin email
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/admin/email/{adminId}
//~ use in web app for administrator to change level of another admin
function updateAdminEmail(req, res) {
    let adminRef = db.collection('admins').doc(req.params.id)
    let getRef = adminRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, admin not found"
                })
            } else {
                let setAda = adminRef.update({
                    Email: req.body.Email
                });

                return res.status(201).json({
                    status: 201,
                    data: "admin email has been update success"
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

//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllAdmin,
    getLimitAdmin,
    getOnceAdmin,
    getOnceAdminEmail,
    addOnceAdmin,
    updateAdminPassword,
    updateAdminEmail    
}