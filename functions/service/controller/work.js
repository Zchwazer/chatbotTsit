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
const uuidV4 = require('uuid/v4');

//---------------------------------------------------------------------//
//! Work Collection
//? Get All Work
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work
//* List all user in 'works' collection 
//~ use for usr to look all of work in mobile app
function getAllWork(req,res){
    var workAllData = [];
    db.collection('works').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                workAllData.push(doc.data());
            });
            return res.send(workAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error,  not found"
            })
        });
}

//? Get Limit Work
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work/workId
//* List all user in 'works' collection 
//~ use for user to look all of work in mobile app
function getLimitWork(req,res){
    var workAllData = [];
    let subRef = db.collection('secs').limit(parseInt(req.params.limit))
    let getRef = subRef.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                workAllData.push(doc.data());
            });
            return res.send(workAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get Once Work
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work/workId
//* List once user in 'works' collection 
//~ use for user to look once of work in mobile app
function getOnceWork(req,res){
    let workRef = db.collection('works').doc(req.params.id).get()    
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, work not found"
                })
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404).json({   
                status: 404,
                data: "Error, work not found"
            })
        });
}

//? Add Once Work
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work/workId
//* List once user in 'works' collection 
//~ use for user to look once of work in mobile app
function addOnceWork(req,res){

}

//? Update Once Work
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work/workId
//* List once user in 'works' collection 
//~ use for user to look once of work in mobile app
function updateOnceWork(req,res){

}

//---------------------------------------------------------------------//
//! WARNING

//---------------------------------------------------------------------//
//! Export function to root
module.exports = {
    getAllWork,
    getLimitWork,
    getOnceWork,
    addOnceWork,
    updateOnceWork
}