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
//! Student Collection Section
//? Get All Student
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/student
//* List all user in 'student' collection 
//~ use in web app (admin) to look all of user in mobile app
function getAllStudent(req, res) {
    var studentAllData = [];
    db.collection('students').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                studentAllData.push(doc.data());
            });
            return res.send(studentAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get Once user
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/student/{studentId}
//* Detail of once document of 'student' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function getOnceStudent(req, res) {
    let stuRef = db.collection('students').doc(req.params.id)
    let getOnce = stuRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, student not found"
                })
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, student not found"
            })
        });
}
//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllStudent,
    getOnceStudent
}