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
//! Initialize Function
//~ uuid/V4 = random uuid
const uuidV4 = require('uuid/v4');

//~ import another function
const dlc = require('../dlc');

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
//*     "Date": "2020-05-01",
//*     "Week": "2"
//*     "Start": "09.00"
//*     "Finish": "12.00"
//* }
//~ use in web app for administrator on web app
function addOnceSection(req, res) {
    //~ Set Status
    var secId
    var groupId
    //~ Generate UUID 
    var secUUID = uuidV4();
    var groupUUID = uuidV4();

    //! SEC SECTION
    //~ Generate Date
    var date = dlc.getDate(req.body.Date);
    var setDate = [date[2], dlc.getMonth(date[1]), dlc.getYear(date[0])]

    //~ Generate Learning Time
    var learn = [dlc.getDay(req.body.Week), req.body.Start, req.body.Finish];

    //~ Check uuid is not generate same as uuid in collection (But is very hard to generate same like before)
    let secRef = db.collection('secs').doc(secUUID)
    let getOnce = secRef.get()
        .then(doc => {
            if (!doc.exists) {
                let secRef = db.collection('secs').doc(secUUID);

                let setAda = secRef.set({
                    Id: secUUID,
                    Sec: req.body.Sec,
                    Subject: req.body.Subject,
                    CreateDate: setDate,
                    UpdateDate: setDate,
                    StudyTime: learn,
                    Status: 1
                });

                secId = secUUID

                // return res.status(201)
                //     .json({
                //         status: 201,
                //         data: "Add sec complete"
                //     })

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

    //! GROUP SECTION
    //~ Check uuid is not generate same as uuid in collection (But is very hard to generate same like before)
    let groupRef = db.collection('groups').doc(groupUUID)
    let groupGetOnce = groupRef.get()
        .then(doc => {
            if (!doc.exists) {
                //~ Check section is open or not
                let secRef = db.collection('secs').doc(secId).get()
                    .then(doc => {
                        if (!doc.exists) {
                            return res.status(404).json({
                                status: 404,
                                data: "Error, this section doesn't exist."
                            })
                        } else {
                            let groupRef = db.collection('groups').doc(groupUUID);

                            let setAda = groupRef.set({
                                Id: groupUUID,
                                Sec: secId
                            });

                            groupId = groupUUID                            

                            //~ Check Teacher each section
                            //~ 1st Teacher of group must have !!! 
                            if (req.body.Teacher1 == "") {
                                return res.status(404).json({
                                    status: 404,
                                    data: "Error, some input was missing"
                                })
                            } else {
                                let teachRef = db.collection('teachers').doc(req.body.Teacher1);
                                let teachOnce = teachRef.get()
                                    .then(docTeach => {
                                        if (!docTeach.exists) {
                                            return res.status(404).json({
                                                status: 404,
                                                data: "Error, Teacher not found"
                                            })
                                        } else {
                                            //~ Add data to users collection
                                            let teacherDocRef = db.collection('groups').doc(groupId)
                                                .collection('teachers').doc(req.body.Teacher1);

                                            let setAda = teacherDocRef.set({
                                                Id: req.body.Teacher1,
                                                NameTH: docTeach.data().NameTH,
                                                NameEN: docTeach.data().NameEN
                                            });

                                            let teacherSecRef = db.collection('secs').doc(secId)
                                                .collection('teachers').doc(req.body.Teacher1);

                                            let setXta = teacherSecRef.set({
                                                Id: req.body.Teacher1,
                                                NameTH: docTeach.data().NameTH,
                                                NameEN: docTeach.data().NameEN
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

                            //~ If Have 2nd Teacher
                            if (req.body.Teacher2 != "") {
                                let teachRef = db.collection('teachers').doc(req.body.Teacher2);
                                let teachOnce = teachRef.get()
                                    .then(docTeach => {
                                        if (!docTeach.exists) {
                                            return res.status(404).json({
                                                status: 404,
                                                data: "Error, Teacher not found"
                                            })
                                        } else {
                                            //~ Add data to users collection
                                            let teacherDocRef = db.collection('groups').doc(groupId)
                                                .collection('teachers').doc(req.body.Teacher2);

                                            let setAda = teacherDocRef.set({
                                                Id: req.body.Teacher2,
                                                NameTH: docTeach.data().NameTH,
                                                NameEN: docTeach.data().NameEN
                                            });

                                            let teacherSecRef = db.collection('secs').doc(secId)
                                                .collection('teachers').doc(req.body.Teacher2);

                                            let setXta = teacherSecRef.set({
                                                Id: req.body.Teacher2,
                                                NameTH: docTeach.data().NameTH,
                                                NameEN: docTeach.data().NameEN
                                            });

                                        }
                                    })
                                    .catch(err => {
                                        return res.status(404).json({
                                            status: 404,
                                            data: "Error, some input was missing"
                                        })
                                    });
                            }

                            //~ If Have 3rd Teacher -> 3rd can be add if 2nd have teacher
                            if (req.body.Teacher2 != "" && req.body.Teacher3 != "") {
                                let teachRef = db.collection('teachers').doc(req.body.Teacher3);
                                let teachOnce = teachRef.get()
                                    .then(docTeach => {
                                        if (!docTeach.exists) {
                                            return res.status(404).json({
                                                status: 404,
                                                data: "Error, Teacher not found"
                                            })
                                        } else {
                                            //~ Add data to users collection
                                            let teacherDocRef = db.collection('groups').doc(groupId)
                                                .collection('teachers').doc(req.body.Teacher3);

                                            let setAda = teacherDocRef.set({
                                                Id: req.body.Teacher3,
                                                NameTH: docTeach.data().NameTH,
                                                NameEN: docTeach.data().NameEN
                                            });

                                            let teacherSecRef = db.collection('secs').doc(secId)
                                                .collection('teachers').doc(req.body.Teacher3);

                                            let setXta = teacherSecRef.set({
                                                Id: req.body.Teacher3,
                                                NameTH: docTeach.data().NameTH,
                                                NameEN: docTeach.data().NameEN
                                            });

                                        }
                                    })
                                    .catch(err => {
                                        return res.status(404).json({
                                            status: 404,
                                            data: "Error, some input was missing"
                                        })
                                    });
                            }

                            // return res.status(201).json({
                            //     status: 201,
                            //     data: "Data has been add success"
                            // })
                        }
                    })

                return res.status(201)
                        .json({
                            status: 201,
                            data: "Data has been add complete"
                        })

            } else {
                return res.status(404).json({
                    status: 404,
                    data: "Error, some input was missing"
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });

    //! TEACHER SECTION    
    function sendTeacher(groupId) {

    }


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
//! Export function to route
module.exports = {
    getAllSection,
    getLimitSec,
    getOnceSection,
    getFilterSubjectSection,
    addOnceSection,
    updateSectionStatus
}