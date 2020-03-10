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
    //# Body Section
    var secId = uuidV4()
    var groupId = uuidV4()
    var secData = req.body.Sec
    var subjectData = req.body.Subject
    var getDateData = req.body.Date
    var weekData = req.body.Week
    var startData = req.body.Start
    var finishData = req.body.Finish
    var teacherData1 = req.body.Teacher1
    var teacherData2 = req.body.Teacher2
    var teacherData3 = req.body.Teacher3

    //~ Generate Date
    var newDate = dlc.getDate(getDateData);
    var dateData = [newDate[2], dlc.getMonth(newDate[1]), dlc.getYear(newDate[0])]

    //~ Generate Learning Time
    var studyData = [dlc.getDay(weekData), startData, finishData];

    //! USE CASE SECTION
    getStarted()

    //# Test Section
    async function getStarted() {
        try {
            let statusA = await getSubjectStatus()
            let statusB = await getSecStatus()

            if (statusA === true && statusB === true) {
                addSec()
                addGroup()

                var teacherData = await implementTeacher()
                addTeacher(teacherData)

                return res.status(201).json({
                    status: 201,
                    data: "Data has been add success"
                })
            }

        } catch (err) {
            return res.status(404).json({
                status: 404,
                data: "Error, Endpoint not found"
            })
        }
    }

    //! SUBJECT FUNCTION DATA
    async function getSubjectStatus() {
        let sectionA = false
        try {
            const getSubject = await checkSubject()
            if (getSubject.exists) {
                sectionA = true
                return sectionA
            }
        } catch (err) {
            return sectionA
        }
    }

    //! SEC FUNCTION DATA
    async function getSecStatus() {
        let sectionB = false
        try {
            const getSec = await checkSec()
            if (getSec.exists) {
                return sectionB
            } else {
                sectionB = true
                return sectionB
            }
        } catch (err) {
            return sectionB
        }
    }

    //* SUBJECT SECTION
    function checkSubject() {
        let subjectRef = db.collection('subjects').doc(subjectData).get()
        return subjectRef
    }

    //* SEC SECTION
    //~ Check Sec UUID 
    function checkSec() {
        let secRef = db.collection('secs').doc(secId).get()
        return secRef
    }

    //~ Add Sec
    function addSec() {
        let secRef = db.collection('secs').doc(secId);

        let setAda = secRef.set({
            Id: secId,
            Sec: secData,
            Subject: subjectData,
            CreateDate: dateData,
            UpdateDate: dateData,
            StudyTime: studyData,
            Status: 1
        });
    }

    //* GROUP SECTION
    //~ Add Group
    function addGroup() {
        let groupRef = db.collection('groups').doc(groupId);

        let setAda = groupRef.set({
            Id: groupId,
            Sec: secId
        });
    }

    //* TEACHER SECTION
    //~ Check teacher data
    function checkTeacher(teacherId) {
        let teacherRef = db.collection('teachers').doc(teacherId).get()
        return teacherRef
    }

    //~ Get teacher data
    async function implementTeacher() {
        try {
            var teacherAllData = []
            if (teacherData1 != "") {
                const tchA = await checkTeacher(teacherData1)
                if (tchA.exists) {
                    teacherAllData.push(tchA.data())
                }
            } else {
                console.log('error')
            }

            if (teacherData2 != "") {
                const tchB = await checkTeacher(teacherData2)
                if (tchB.exists) {
                    teacherAllData.push(tchB.data())
                }
            }

            if (teacherData3 != "") {
                const tchC = await checkTeacher(teacherData3)
                if (tchC.exists) {
                    teacherAllData.push(tchC.data())
                }
            }

            return teacherAllData

        } catch (err) {
            return res.status(404).json({
                status: 404,
                data: "Error, Endpoint not found"
            })
        }
    }

    //~ Add Teacher
    function addTeacher(teacherData = []) {
        for (var index = 0; index < teacherData.length; index++) {
            //# Add Teacher to Sec
            let teacherSec = db.collection('secs').doc(secId).collection('teachers').doc(teacherData[index].Id)

            let setSecData = teacherSec.set({
                Id: teacherData[index].Id,
                NameTH: teacherData[index].NameTH,
                NameEN: teacherData[index].NameEN
            });

            //# Add Teacher to Group
            let teacherGroup = db.collection('groups').doc(groupId).collection('teachers').doc(teacherData[index].Id)

            let setGroupData = teacherGroup.set({
                Id: teacherData[index].Id,
                NameTH: teacherData[index].NameTH,
                NameEN: teacherData[index].NameEN
            });
        }
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