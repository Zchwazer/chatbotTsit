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
//! Group Collection Section
//? Get All group
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group
//* List all group in 'groups' collection 
//~ use in web app (admin) to look all of group in mobile app
function getAllGroup(req, res) {
    var groupAllData = [];
    db.collection('groups').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                groupAllData.push(doc.data());
            });
            return res.send(groupAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get All group (Limit)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/{limitNumber}
//* List all group in 'group' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getLimitGroup(req, res) {
    var groupAllData = [];
    let groupRef = db.collection('groups').limit(parseInt(req.params.limit))
    let getRef = groupRef.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                groupAllData.push(doc.data());
            });
            return res.send(groupAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get Once group
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/filterId/{groupId}
//* Detail of once document of 'groups' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function getOnceGroup(req, res) {
    let groupRef = db.collection('groups').doc(req.params.id)
    let getOnce = groupRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, group not found"
                })
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, group not found"
            })
        });
}

//? Get All student in Group
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/filterId/{groupId}/student
//* List all group in 'groups' collection 
//~ use in web app (admin) to look all of group in mobile app
function getAllStudentGroup(req, res) {
    var groupStudentAllData = [];
    db.collection('groups').doc(req.params.id).collection('students').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                groupStudentAllData.push(doc.data());
            });
            return res.send(groupStudentAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get Once student in Group 
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/filterId/{groupId}/student/{studentId}
//* Detail of once document of 'groups' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function getOnceStudentGroup(req, res) {
    let groupStudent = db.collection('groups').doc(req.params.id).collection('students').doc(req.params.student)
    let getOnce = groupStudent.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, group not found"
                })
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, group not found"
            })
        });
}

//? Get All teacher in Group
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/filterId/{groupId}/teacher
//* List all group in 'groups' collection 
//~ use in web app (admin) to look all of group in mobile app
function getAllTeacherGroup(req, res) {
    var groupTeacherAllData = [];
    db.collection('groups').doc(req.params.id).collection('teachers').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                groupTeacherAllData.push(doc.data());
            });
            return res.send(groupTeacherAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get Once teacher in Group 
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/filterId/{groupId}/teacher/{teacherId}
//* Detail of once document of 'groups' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function getOnceTeacherGroup(req, res) {
    let groupTeacher = db.collection('groups').doc(req.params.id).collection('teachers').doc(req.params.teacher)
    let getOnce = groupTeacher.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, group not found"
                })
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, group not found"
            })
        });
}

//? Add group
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/
//* Add .json data to 'secs' collection in cloud firestore
//* .json body Example {
//*     "Sec": "0a9a8b49-4568-4cb5-a963-0643162e5f76",
//*     "Teacher": "33eb18d0-7744-4bff-b8ea-49a89b2bd02a"
//* }
//~ use in web app for administrator on web app
function addOnceGroup(req, res) {
    //~ Generate UUID 
    var uuid = uuidV4();

    //~ Check uuid is not generate same as uuid in collection (But is very hard to generate same like before)
    let groupRef = db.collection('groups').doc(uuid)
    let getOnce = groupRef.get()
        .then(doc => {
            if (!doc.exists) {
                let groupRef = db.collection('groups').doc(uuid);

                let setAda = groupRef.set({
                    Id: uuid,
                    Sec: req.body.Sec
                });

                //~ Check teacher is cpe teacher ?

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
                                let teacherDocRef = db.collection('groups').doc(uuid)
                                    .collection('teachers').doc(req.body.Teacher1);

                                let setAda = teacherDocRef.set({
                                    Id: req.body.Teacher1,
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

                //~ If Have 2nd Teacher
                if(req.body.Teacher2 != ""){
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
                                let teacherDocRef = db.collection('groups').doc(uuid)
                                    .collection('teachers').doc(req.body.Teacher2);

                                let setAda = teacherDocRef.set({
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
                if(req.body.Teacher2 != "" && req.body.Teacher3 != ""){
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
                                let teacherDocRef = db.collection('groups').doc(uuid)
                                    .collection('teachers').doc(req.body.Teacher3);

                                let setAda = teacherDocRef.set({
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

                return res.status(201)
                .json({
                    status: 201,
                    data: "Add news into collection complete"
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
}
//---------------------------------------------------------------------//
//! WARNING

//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllGroup,
    getLimitGroup,
    getOnceGroup,
    getAllStudentGroup,
    getOnceStudentGroup,
    getAllTeacherGroup,
    getOnceTeacherGroup,
    addOnceGroup
}