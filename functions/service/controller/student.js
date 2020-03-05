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

//? Add once user
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/student/
//* add of once student
//~ use in mobile app to get data for display to mobile app
function addOnceStudent(req, res) {
    let stuId = req.body.Id
    var setId = stuId.substr(0, 12) + "-" + stuId.substr(12)

    let studentRef = db.collection('students').doc(setId)
        .set({
            Id: setId,
            NameTH: req.body.NameTH,
            NameEN: req.body.NameEN,
            Faculty: req.body.Faculty,
            Major: req.body.Major,
            Degree: req.body.Degree,
            Status: req.body.Status
        })

        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, Some input was missing"
            })
        })

    return res.status(201).json({
        status: 201,
        data: "Student add success"
    })
}

//? Update student data
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/student/updateDt/{studentId}
//~ use in web app for administrator to change news description
function updateStudentData(req, res) {        
    let studentRef = db.collection("students").doc(req.params.id);
    let getRef = studentRef
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, student not found"
                });
            } else {
                let setAda = studentRef.update({
                    Id: req.body.Id,
                    NameTH: req.body.NameTH,
                    NameEN: req.body.NameEN,
                    Faculty: req.body.Faculty,
                    Major: req.body.Major,
                    Degree: req.body.Degree,
                    Status: req.body.Status
                });

                return res.status(201).json({
                    status: 201,
                    data: "Student has been update success"
                });
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, some input was missing"
            });
        });
}
//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllStudent,
    getOnceStudent,
    addOnceStudent,
    updateStudentData
}