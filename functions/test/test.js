//! Initialize Firebase Admin to App
const admin = require("firebase-admin");

let serviceAccount = require("../asset/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const dlc = require("../service/dlc");
const uuidV4 = require('uuid/v4');

let db = admin.firestore();
//---------------------------------------------------------------------//
//# Body Section
var secId = uuidV4()
var groupId = uuidV4()
var secData = 1
var subjectData = "04622202"
var getDateData = "2019-11-1"
var weekData = "2"
var startData = "13:00"
var finishData = "16:00"
var teacherData1 = "2a2258fe-ccfb-4a1b-ab10-ccb6c2ba3dc4" //# T.Nachirat
var teacherData2 = "" //# T.Wattana
var teacherData3 = "" //# T.Jessada


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
        }

        var teacherData = await implementTeacher()
        addTeacher(teacherData)

    } catch (err) {
        console.log(err)
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
        console.log(err)
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