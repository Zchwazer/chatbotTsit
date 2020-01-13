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
//! Teacher Collection Section
//? Get All teacher
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/teacher
//* List all user in 'teacher' collection 
//~ use in web app to look all of news 
function getAllTeacher(req,res){
    var teacherAllData = [];
    db.collection('teachers').orderBy("NameTH" , "asc").get()
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
function getAllLimitTeacher(req,res){
    var teacherAllData = [];
    db.collection('teachers').limit(parseInt(req.params.limit)).orderBy("NameTH" , "asc").get()
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
//---------------------------------------------------------------------//
module.exports = {
    getAllTeacher,
    getAllLimitTeacher
}