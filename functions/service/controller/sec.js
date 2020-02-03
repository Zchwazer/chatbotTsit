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
//! Sec Collection Section
//? Get All Sec
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/sec
//* List all user in 'secs' collection 
//~ use in web app (admin) to look all of subject in web app
function getAllSection(req, res) {
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

//? Get All subjects (Filter subject)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/sec/filterSj/{subjectId}
//* List all secs in 'secs' collection (filter subject id)
//~ use in web app (admin) to look all of subject in web app
function getFilterSubjectSection(req, res) {
    var subjectAllData = [];
    db.collection('secs').where("Subject", "==", req.params.id).get()
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

//? Get Once sec
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/secs/filterId/{secId}
//* Detail of once document of 'users' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function getOnceSection(req, res) {
    let userRef = db.collection('secs').doc(req.params.id)
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

//? Add sec
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/secs/
//* Add .json data to 'secs' collection in cloud firestore
//* .json body Example {
//*     "Sec": 1,
//*     "Subject" "04000302",
//*     "Day": "01",
//*     "Month": "12",
//*     "Year": "2562"
//* }
//~ use in web app for administrator on web app
function addOnceSection(req, res) {
    //~ Generate UUID 
    var uuid = uuidV4();

    //~ Generate Date
    var date = [req.body.Day,getMonth(req.body.Month),req.body.Year];

    //~ Check uuid is not generate same as uuid in collection (But is very hard to generate same like before)
    let secRef = db.collection('secs').doc(uuid)
    let getOnce = secRef.get()
        .then(doc => {
            if (!doc.exists) {
                let secRef = db.collection('secs').doc(uuid);

                let setAda = secRef.set({
                    Id : uuid,
                    Sec: req.body.Sec,
                    Subject: req.body.Subject,
                    CreateDate: date,
                    UpdateDate: date,
                    Status: 1
                });

                return res.status(201)
                    .json({
                        status: 201,
                        data: "Add news into collection complete"
                    })
            } else {
                addOnceSection(req, res);
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Update sec status
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/secs/updateSt/{secsId}
//* Add .json data to 'secs' collection in cloud firestore
//* .json body Example {
//*     "Status": 1,
//*     "Day": "01",
//*     "Month": "12",
//*     "Year": "2562",
//* }
//~ use in web app for administrator to change level of user from "student" to "leader"
function updateSectionStatus(req, res) {
    let secRef = db.collection('secs').doc(req.params.id)
    let getRef = secRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, user not found"
                })
            } else {            
                let setAda = secRef.update({
                    Status: req.body.Status,
                    UpdateDate: [req.body.Day, getMonth(req.body.Month), req.body.Year]
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
//---------------------------------------------------------------------//
//! WARNING STATUS
//? Secs status 0 : Close section
//? Secs status 1 : Open section
//---------------------------------------------------------------------//
//! FUNCTION
//~ Transfer month from number to text
function getMonth(mon) {
    switch (mon) {
        case "1":
            mon = "มกราคม"
            break;
        case "2":
            mon = "กุมภาพันธ์"
            break;
        case "3":
            mon = "มีนาคม"
            break;
        case "4":
            mon = "เมษายน"
            break;
        case "5":
            mon = "พฤษภาคม"
            break;
        case "6":
            mon = "มิถุนายน"
            break;
        case "7":
            mon = "กรกฎาคม"
            break;
        case "8":
            mon = "สิงหาคม"
            break;
        case "9":
            mon = "กันยายน"
            break;
        case "10":
            mon = "ตุลาคม"
            break;
        case "11":
            mon = "พฤศจิกายน"
            break;
        case "12":
            mon = "ธันวาคม"
            break;
    }
    return mon;
}

//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllSection,
    getLimitSec,
    getOnceSection,
    getFilterSubjectSection,
    addOnceSection,
    updateSectionStatus
}