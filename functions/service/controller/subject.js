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
//! Subject Collection Section
//? Get All subjects
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject
//* List all user in 'subjects' collection 
//~ use in web app (admin) to look all of subject in web app
function getAllSubject(req, res) {
    var subjectAllData = [];
    db.collection('subjects').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                subjectAllData.push(doc.data());
            });
            return res.send(subjectAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get All subjects (Limit)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/limit/{limitNumber}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getLimitSubject(req, res) {    
    var subjectAllData = [];
    let subRef = db.collection('subjects').limit(parseInt(req.params.limit))
    let getRef = subRef.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                subjectAllData.push(doc.data());
            });
            return res.send(subjectAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get All subjects (Filter type)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/filterType/{type}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getFilterTypeSubject(req, res) {    
    var subjectAllData = [];
    db.collection('subjects').where("Type","==",parseInt(req.params.type)).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {                
                subjectAllData.push(doc.data());
            });            
            if (subjectAllData === 1){
                let subjectOnceData = subjectAllData[0]
                return res.send(subjectOnceData);
            }
            else{
                return res.send(subjectAllData);
            }
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get All subjects (Filter credit)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/filterCredit/{type}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getFilterCreditSubject(req, res) {    
    var subjectAllData = [];
    db.collection('subjects').where("Credit","==",parseInt(req.params.credit)).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {                
                subjectAllData.push(doc.data());
            });            
            if (subjectAllData === 1){
                let subjectOnceData = subjectAllData[0]
                return res.send(subjectOnceData);
            }
            else{
                return res.send(subjectAllData);
            }
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get All subjects (Filter credit & Limit)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/filterCredit/{type}/{number}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getLimitFilterCreditSubject(req, res) {    
    var subjectAllData = [];
    db.collection('subjects').where("Credit","==",parseInt(req.params.credit)).limit(parseInt(req.params.limit)).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {                
                subjectAllData.push(doc.data());
            });            
            if (subjectAllData === 1){
                let subjectOnceData = subjectAllData[0]
                return res.send(subjectOnceData);
            }
            else{
                return res.send(subjectAllData);
            }
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get Once subject
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/user/{subjectId}
//* Detail of once document of 'users' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function getOnceSubject(req, res) {
    let subRef = db.collection('subjects').doc(req.params.id).get()    
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, subject not found"
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

//? Add subject
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject
//* Add .json data to 'users' collection in cloud firestore
//* .json body Example {
//* 	"Id" : "04000302",
//* 	"NameTH": "????",
//*     "NameEN": "????",
//*     "Credit" 3,
//* 	"Type": 0
//* }
function addOnceSubject(req,res){

}
//---------------------------------------------------------------------//
//! WARNING
//? Subject type 0 = Compulsory subject
//? Subject type 1 = Elective subject
//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllSubject,
    getLimitSubject,
    getFilterTypeSubject,
    getFilterCreditSubject,
    getLimitFilterCreditSubject,
    getOnceSubject,
    addOnceSubject
}