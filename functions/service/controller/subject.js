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
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/filterTp/{type}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getFilterTypeSubject(req, res) {
    var subjectAllData = [];
    db.collection('subjects').where("Type", "==", parseInt(req.params.type)).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                subjectAllData.push(doc.data());
            });
            if (subjectAllData === 1) {
                let subjectOnceData = subjectAllData[0]
                return res.send(subjectOnceData);
            } else {
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

//? Get All subjects (Filter type & Limit)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/filterTp/{type}/{number}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getLimitFilterTypeSubject(req, res) {
    var subjectAllData = [];
    db.collection('subjects').where("Type", "==", parseInt(req.params.type)).limit(parseInt(req.params.limit)).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                subjectAllData.push(doc.data());
            });
            if (subjectAllData === 1) {
                let subjectOnceData = subjectAllData[0]
                return res.send(subjectOnceData);
            } else {
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
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/filterCr/{type}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getFilterCreditSubject(req, res) {
    var subjectAllData = [];
    db.collection('subjects').where("Credit", "==", parseInt(req.params.credit)).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                subjectAllData.push(doc.data());
            });
            if (subjectAllData === 1) {
                let subjectOnceData = subjectAllData[0]
                return res.send(subjectOnceData);
            } else {
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
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/filterCr/{type}/{number}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getLimitFilterCreditSubject(req, res) {
    var subjectAllData = [];
    db.collection('subjects').where("Credit", "==", parseInt(req.params.credit)).limit(parseInt(req.params.limit)).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                subjectAllData.push(doc.data());
            });
            if (subjectAllData === 1) {
                let subjectOnceData = subjectAllData[0]
                return res.send(subjectOnceData);
            } else {
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

//? Get All subjects (Filter status)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/filterSt/{status}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getFilterStatusSubject(req, res) {
    var subjectAllData = [];
    db.collection('subjects').where("Status", "==", parseInt(req.params.status)).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                subjectAllData.push(doc.data());
            });
            if (subjectAllData === 1) {
                let subjectOnceData = subjectAllData[0]
                return res.send(subjectOnceData);
            } else {
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

//? Get All subjects (Filter status & Limit)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/filterAv/{status}/{limitNumber}
//* List all user in 'subjects' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getLimitFilterStatusSubject(req, res) {
    var subjectAllData = [];
    db.collection('subjects').where("Status", "==", parseInt(req.params.status)).limit(parseInt(req.params.limit)).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                subjectAllData.push(doc.data());
            });
            if (subjectAllData === 1) {
                let subjectOnceData = subjectAllData[0]
                return res.send(subjectOnceData);
            } else {
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
//* 	"Type": 0,
//*     "Status": 0
//* }
function addOnceSubject(req, res) {
    //~ Get Data from Body
    var id = req.body.Id
    var thName = req.body.NameTH
    var enName = req.body.NameEN
    var credit = req.body.Credit
    var type = req.body.Type
    var stat = req.body.Status

    //~ Check subject already add ?
    let subjectRef = db.collection('subjects').doc(id);
    let checkSubject = subjectRef.get()
        .then(doc => {
            if (doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, this subject has been already add"
                })
            } else {
                //~ Add data to users collection
                let docRef = db.collection('subjects').doc(id);

                let setAda = docRef.set({
                    Id: id,
                    NameTH: thName,
                    NameEN: enName,
                    Credit: credit,
                    Type: type,
                    Status: stat
                });

                return res.status(201)
                    .json({
                        status: 201,
                        data: "Add subject into collection complete"
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

//? Update subject Name (Thai)
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/updateTh/{subjectId}
//~ use in web app for administrator to change data in subjects collection
function updateNameThSubject(req, res) {    
    var id = req.params.id
    var thName = req.body.NameTH    
    
    let subjectRef = db.collection('subjects').doc(id)
    let getRef = subjectRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, subject not found"
                })
            } else {
                let setAda = subjectRef.update({
                    NameTH: thName
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

//? Update subject Name (English)
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/updateEn/{subjectId}
//~ use in web app for administrator to change data in subjects collection
function updateNameEnSubject(req, res) {    
    var id = req.params.id
    var enName = req.body.NameEN    
    
    let subjectRef = db.collection('subjects').doc(id)
    let getRef = subjectRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, subject not found"
                })
            } else {
                let setAda = subjectRef.update({
                    NameEN: enName
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

//? Update subject Credit
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/updateCr/{subjectId}
//~ use in web app for administrator to change data in subjects collection
function updateCreditSubject(req, res) {   
    //~ Credit is integer 
    var id = req.params.id
    var credit = req.body.Credit    
    
    let subjectRef = db.collection('subjects').doc(id)
    let getRef = subjectRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, subject not found"
                })
            } else {
                let setAda = subjectRef.update({
                    Credit: credit
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

//? Update subject Type
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/updateTp/{subjectId}
//~ use in web app for administrator to change data in subjects collection
function updateTypeSubject(req, res) {    
    //~ Type is integer 
    var id = req.params.id
    var type = req.body.Type    
    
    let subjectRef = db.collection('subjects').doc(id)
    let getRef = subjectRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, subject not found"
                })
            } else {
                let setAda = subjectRef.update({
                    Type: type
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

//? Update subject Status
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/subject/updateSt/{subjectId}
//~ use in web app for administrator to change data in subjects collection
function updateStatusSubject(req, res) {    
    //~ Status is integer 
    var id = req.params.id
    var stat = req.body.Status    
    
    let subjectRef = db.collection('subjects').doc(id)
    let getRef = subjectRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, subject not found"
                })
            } else {
                let setAda = subjectRef.update({
                    Status: stat
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
//! WARNING TYPE
//? Subject type 0 = Compulsory subject
//? Subject type 1 = Elective subject
//---------------------------------------------------------------------//
//! WARNING STATUS
//? Subject status 0 = Close subject
//? Subject status 1 = Open subject
//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllSubject,
    getLimitSubject,
    getFilterTypeSubject,
    getLimitFilterTypeSubject,
    getFilterCreditSubject,
    getLimitFilterCreditSubject,
    getFilterStatusSubject,
    getLimitFilterStatusSubject,
    getOnceSubject,
    addOnceSubject,
    updateNameThSubject,
    updateNameEnSubject,
    updateCreditSubject,
    updateTypeSubject,
    updateStatusSubject
}