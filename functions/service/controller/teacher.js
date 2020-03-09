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
//! Initialize UUID
//~ uuid/V4 = random uuid
const uuidV4 = require("uuid/v4");

//~ import another function
const dlc = require("../dlc");
//---------------------------------------------------------------------//
//! Teacher Collection Section
//? Get All teacher
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/teacher
//* List all user in 'teacher' collection 
//~ use in web app to look all of news 
function getAllTeacher(req, res) {
    var teacherAllData = [];
    db.collection('teachers').orderBy("NameTH", "asc").get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                teacherAllData.push(doc.data())
            })
            return res.send(teacherAllData)
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get All teacher
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/teacher
//* List all user in 'teacher' collection 
//~ use in web app to look all of news 
function getAllLimitTeacher(req, res) {
    var teacherAllData = [];
    db.collection('teachers').limit(parseInt(req.params.limit)).orderBy("NameTH", "asc").get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                teacherAllData.push(doc.data())
            })
            return res.send(teacherAllData)
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Add once user
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/teacher/
//* add of once teacher
//~ use in mobile app to get data for display to mobile app
function addOnceTeacher(req, res) {
    //~ Generate UUID
    var uuid = uuidV4();

    let teacherRef = db.collection('teachers').doc(uuid)
        .set({
            Id: uuid,
            NameTH: req.body.NameTH,
            NameEN: req.body.NameEN,
            Email: req.body.Email
        })

        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, Some input was missing"
            })
        })

    return res.status(201).json({
        status: 201,
        data: "Teacher add success"
    })
}

//? Update student data
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/teacher/updateDt/{teacherId}
//~ use in web app for administrator to change news description
function updateOnceTeacher(req, res) {
    let teacherRef = db.collection("teachers").doc(req.params.id);
    let getRef = teacherRef
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, Teacher not found"
                });
            } else {
                let setAda = teacherRef.update({                    
                    NameTH: req.body.NameTH,
                    NameEN: req.body.NameEN,
                    Email: req.body.Email
                });

                return res.status(201).json({
                    status: 201,
                    data: "Teacher has been update success"
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
module.exports = {
    getAllTeacher,
    getAllLimitTeacher,
    addOnceTeacher,
    updateOnceTeacher
}