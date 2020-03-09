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


//? Get All group (filterStudent)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/filterStudentId/{studentId}
//* List all group in 'group' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getAllGroupOfStudent(req, res) {
    useAsyncAwait()
    async function useAsyncAwait() {
        try {
            //~ 1st Get All Group Data [just like GET ALL]
            let groupSnapshot = await getGroupSnapshot()

            //~ 2nd Check in all group is have user in sub collection 
            let studentSnapshot = await getStudentSnapshot(groupSnapshot, req.params.id)

            //~ 3rd While get data from 2nd then change data from Sec.Id to Sec.data()
            let secSnapshot = await getSecSnapshot(studentSnapshot)

            //~ 4th Then subject in Sec.data() is code then change that into NameTH
            let subjectSnapshot = await getSubjectSnapshot(secSnapshot)

            // //~ 5th Get all teacher to display on UI
            let teacherSnapshot = await getTeacherSnapshot(subjectSnapshot)

            fetchAllData(teacherSnapshot)
        } catch (err) {
            return res.status(404).json({
                status: 404,
                data: "Error, Endpoint not found"
            })
        }
    }

    async function getGroupSnapshot() {
        var groupAllData = []
        var groupSnapshot = db.collection('groups').get()
        for (const groupDoc of (await groupSnapshot).docs) {
            groupAllData.push(groupDoc.data())
        }
        return groupAllData
    }

    async function getStudentSnapshot(groupSnapshot = []) {
        var studentAllData = []
        for (var index = 0; index < groupSnapshot.length; index++) {
            const studentSnapshot = await checkStudent(groupSnapshot[index].Id)
            if (studentSnapshot.exists) {
                studentAllData.push(groupSnapshot[index])
            }
        }
        return studentAllData
    }

    async function checkStudent(groupId) {
        var studentDoc = db.collection('groups').doc(groupId)
            .collection('students').doc(req.params.id).get();
        return studentDoc
    }

    async function getSecSnapshot(studentSnapshot = []) {
        var secAllData = []
        for (var index = 0; index < studentSnapshot.length; index++) {
            const secValue = await db.collection('secs').doc(studentSnapshot[index].Sec).get();
            if (secValue.exists) {
                studentSnapshot[index].Sec = secValue.data()
                secAllData.push(studentSnapshot[index])
            }
        }
        return secAllData
    }

    async function getSubjectSnapshot(secSnapshot = []) {
        var subjectAllData = []
        for (var index = 0; index < secSnapshot.length; index++) {
            const subjectValue = await db.collection('subjects').doc(secSnapshot[index].Sec.Subject).get();
            if (subjectValue.exists) {
                secSnapshot[index].Sec.Subject = subjectValue.data().NameTH
                subjectAllData.push(secSnapshot[index])
            }
        }
        return subjectAllData
    }

    async function getTeacherSnapshot(subjectSnapshot = []) {
        var teacherAllData = []
        for (var index = 0; index < subjectSnapshot.length; index++) {
            const teacherValue = await checkTeacher(subjectSnapshot[index].Id)
            subjectSnapshot[index].Teacher = teacherValue
            teacherAllData.push(subjectSnapshot[index])
        }
        return teacherAllData
    }

    async function checkTeacher(groupId) {
        var teacherAllData = []
        var teacherSnapshot = db.collection('groups').doc(groupId).collection('teachers').get()
        for (const teacherDoc of (await teacherSnapshot).docs) {
            teacherAllData.push(teacherDoc.data().NameTH)
        }
        return teacherAllData
    }

    function fetchAllData(fetchData = []) {
        if (fetchData.length != 0) {
            return res.send(fetchData)
        } else {
            return res.status(404).json({
                status: 404,
                data: "Error, group not found"
            })
        }
    }
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

//? Get All group (filterStudent)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/filterStudentId/{studentId}
//* List all group in 'group' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getAllDataGroup(req, res) {
    getData()

    async function getData() {
        try {
            let groupAllData = await fetchGroupData()
            let secAllData = await fetchSecData(groupAllData)
            return res.send(secAllData)
        } catch (err) {
            return res.status(404).json({
                status: 404,
                data: "Error, Endpoint not found"
            })
        }
    }

    async function fetchGroupData() {
        var groupAllData = []
        var groupSnapshot = db.collection('groups').get()
        for (const groupDoc of (await groupSnapshot).docs) {
            groupAllData.push(groupDoc.data())
        }
        return groupAllData
    }

    async function fetchSecData(groupAllData = []) {
        for (var index = 0; index < groupAllData.length; index++) {
            const secSnapshot = await checkSecData(groupAllData[index].Sec)
            if (secSnapshot.exists) {
                groupAllData[index].Sec = secSnapshot.data()
            }
        }
        return groupAllData
    }

    async function checkSecData(secId) {
        let secDoc = db.collection('secs').doc(secId).get()
        return secDoc
    }
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
//*     "Teacher1": "33eb18d0-7744-4bff-b8ea-49a89b2bd02a",
//*     "Teacher2": "",
//*     "Teacher3": ""
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
                //~ Check section is open or not
                let secRef = db.collection('secs').doc(req.body.Sec).get()
                    .then(doc => {
                        if (!doc.exists) {
                            return res.status(404).json({
                                status: 404,
                                data: "Error, this section doesn't exist."
                            })
                        } else {
                            let groupRef = db.collection('groups').doc(uuid);

                            let setAda = groupRef.set({
                                Id: uuid,
                                Sec: req.body.Sec
                            });
                        }
                    })

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

//? Add Student in Group
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/student
//* Add .json data to 'secs' collection in cloud firestore
//* .json body Example {
//*    "Id": "8946dc47-2fed-430d-b7a5-bafcc313dbc8",
//*    "Student":"115910400343-2"
//* }
//~ use in web app for administrator on web app
function addStudentGroup(req, res) {
    //~ Check group is found ?
    let groupRef = db.collection('groups').doc(req.body.Id).get()
        .then(groupDoc => {
            if (!groupDoc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, group not found"
                })
            } else {
                //~ Check student is found ?
                let studentRef = db.collection('groups').doc(req.body.Id)
                    .collection('students').doc(req.body.Student).get()
                    .then(groupStudentDoc => {
                        if (groupStudentDoc.exists) {
                            return res.status(404).json({
                                status: 404,
                                data: "Error, you already register"
                            })
                        } else {
                            //~ Check student can enter this group ?
                            let studentSecRef = db.collection('secs').doc(groupDoc.data().Sec)
                                .collection('students').doc(req.body.Student).get()
                                .then(secStudentDoc => {
                                    if (!secStudentDoc.exists) {
                                        return res.status(404).json({
                                            status: 404,
                                            data: "Error, you don't have permission to register this group"
                                        })
                                    } else {
                                        let addStuRef = db.collection('groups').doc(groupDoc.data().Id)
                                            .collection('students').doc(req.body.Student)
                                            .set({
                                                Id: req.body.Student,
                                                NameTH: secStudentDoc.data().NameTH,
                                                NameEN: secStudentDoc.data().NameEN
                                            })

                                    }
                                    //~ Add Student in group complete
                                    return res.status(201).json({
                                        status: 201,
                                        data: "Enter this group complete"
                                    })

                                })
                                .catch(err => {
                                    return res.status(404).json({
                                        status: 404,
                                        data: "Error, sec id in group collection not found"
                                    })
                                });
                        }
                    })
                    .catch(err => {
                        return res.status(404).json({
                            status: 404,
                            data: "Error, some student data not found"
                        })
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

//? Delete Once group
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/{groupId}
//* Detail of once document of 'groups' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function deleteOnceGroup(req, res) {
    db.collection('groups').doc(req.params.id).delete()
        .then(function () {
            return res.status(201).json({
                status: 200,
                data: "Works data delete success"
            })
        }).catch(function (err) {
            return res.status(404).json({
                status: 404,
                data: "Error, Endpoint not found"
            })
        });
}
//---------------------------------------------------------------------//
//! WARNING
//? 
//? 
//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllGroup,
    getLimitGroup,
    getOnceGroup,
    getAllDataGroup,
    getAllStudentGroup,
    getAllGroupOfStudent,
    getOnceStudentGroup,
    getAllTeacherGroup,
    getOnceTeacherGroup,
    addOnceGroup,
    addStudentGroup,
    deleteOnceGroup
}