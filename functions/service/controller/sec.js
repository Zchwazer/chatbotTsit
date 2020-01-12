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
//! Sec Collection Section
//? Get All Sec
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/sec
//* List all user in 'secs' collection 
//~ use in web app (admin) to look all of subject in web app
function getAllSec(req, res) {
    var secAllData = [];
    db.collection('secs').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                secAllData.push(doc.data());
            });
            return res.send(secAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get All subjects (Limit)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/sec/limit/{limitNumber}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getLimitSec(req, res) {
    var secAllData = [];
    let subRef = db.collection('secs').limit(parseInt(req.params.limit))
    let getRef = subRef.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                secAllData.push(doc.data());
            });
            return res.send(secAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}
//! Export function to route
module.exports = {
    getAllSec,
    getLimitSec
}