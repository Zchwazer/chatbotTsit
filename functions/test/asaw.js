//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//
var id = "115910400343-2"
// testNo1(id)
// testNo2(id)
// testNo3(id)
// testNo4()
// testNo5(id)
// testNo6(id)
perfectValue(id)


// //! F1
// function testNo1(id) {
//     var groupAllData = []
//     let groupRef = db.collection('groups').get()
//         .then((groupSnapshot) => {
//             groupSnapshot.forEach((groupDoc) => {
//                 let sfRef = db.collection('groups').doc(groupDoc.data().Id)
//                     .collection('students').doc(id).get()
//                     .then(studentSnapshot => {
//                         if (studentSnapshot.exists) {
//                             groupAllData.push(groupDoc.data().Id)
//                         }
//                         console.log(groupAllData)
//                     })
//                     .catch((err) => {
//                         console.log(err)
//                     });
//             });
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// }
// //! F2
// function testNo2(id) {
//     var groupAllData = []
//     let groupRef = db.collection('groups').get()
//         .then((groupSnapshot) => {
//             for (const groupDoc of groupSnapshot.docs) {
//                 let sfRef = db.collection('groups').doc(groupDoc.data().Id)
//                     .collection('students').doc(id).get()
//                     .then(studentSnapshot => {
//                         if (studentSnapshot.exists) {
//                             groupAllData.push(groupDoc.data().Id)
//                         }
//                     })
//                     .catch((err) => {
//                         console.log(err)
//                     });
//             }
//             console.log(groupAllData)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// }

// //! F3
// async function testNo3(id) {
//     var groupValue = []
//     const value = await getGroupData(groupValue);
//     console.log(value)
//     // const fetch = await getFetchData(value,id)
//     // console.log(fetch)
// }

// async function getGroupData(groupValue) {
//     let groupAllData = db.collection('groups').get()
//     let groupRef = groupAllData
//         .then((groupSnapshot) => {
//             for (const groupDoc of groupSnapshot.docs) {
//                 groupValue.push(groupDoc.data().Id)
//             }
//             console.log(groupValue)
//             return groupValue
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// }

// async function getFetchData(value, id) {
//     var fetchValue = []
//     for (var index = 0; index <= value; index++) {
//         let studentAllData = db.collection('groups').doc(value[index])
//             .collection('students').doc(id).get()
//         let studentFetchData = studentAllData
//             .then((studentDoc) => {
//                 if (studentDoc.exists) {
//                     fetchValue.push(value[index])
//                 }
//                 console.log(fetchValue)
//                 return fetchValue
//             })
//             .catch((err) => {
//                 console.log(err)
//             });
//     }
// }

//! F4
// async function testNo4() {
//     var userId = "115910400338-2"
//     var groupAllData = []
//     let groupRef = db.collection('groups').get()
//         .then((groupSnapshot) => {
//             for (const groupDoc of groupSnapshot.docs) {
//                 // console.log(groupDoc.data().Id)
//                 const studentSnapshot = await db.collection('groups').doc(groupDoc.data().Id)
//                     .collection('students').doc(id).get();

//                 if (studentSnapshot.exists) {
//                     groupAllData.push(groupDoc.data().Id)
//                     console.log(groupAllData)
//                 }
//             }
//             // console.log(groupAllData)
//         })
//         .catch((err) => {
//             console.log("ERROR : ", err)
//         });
// }

// async function testAsyncFunctionB(groupId, userId) {
//     var studentDoc = db.collection('groups').doc(groupId)
//         .collection('students').doc(userId).get();
//     return studentDoc
// }

// //! F5
// async function testNo5(userId) {
//     var groupAllData = []
//     let groupSnapshot = await getGroupSnapshot()
//     for (const groupDoc of groupSnapshot.docs) {
//         const studentSnapshot = await getStudentSnapshot(groupDoc.data().Id, userId)
//         if (studentSnapshot.exists) {
//             groupAllData.push(groupDoc.data().Id)
//             console.log(groupAllData)
//         }        
//     }
// }

// async function getGroupSnapshot() {
//     var groupAllData = []
//     var groupSnapshot = db.collection('groups').get()
//     for (const groupDoc of (await groupSnapshot).docs) {
//         groupAllData.push(groupDoc.data().Id)
//     }
//     return groupAllData
// }

// async function getStudentSnapshot(groupId, userId) {
//     var studentDoc = db.collection('groups').doc(groupId)
//         .collection('students').doc(userId).get();
//     return studentDoc
// }

// //! F6
// async function testNo6(userId) {
//     let groupSnapshot = await getGroupSnapshot()
//     let studentSnapshot = await getStudent(groupSnapshot, userId)

//     // console.log(studentSnapshot)

//     let fetchSnapshot = await getGroupData(studentSnapshot)
//     let secSnapshot = await getSecData(fetchSnapshot)
// }

// async function getGroupSnapshot() {
//     var groupAllData = []
//     var groupSnapshot = db.collection('groups').get()
//     for (const groupDoc of (await groupSnapshot).docs) {
//         groupAllData.push(groupDoc.data().Id)
//     }
//     return groupAllData
// }

// async function checkStudent(groupId, userId) {
//     var studentDoc = db.collection('groups').doc(groupId)
//         .collection('students').doc(userId).get();
//     return studentDoc
// }

// async function getStudent(groupSnapshot = [], userId) {
//     var studentAllData = []
//     for (var index = 0; index < groupSnapshot.length; index++) {
//         const studentSnapshot = await checkStudent(groupSnapshot[index], userId)
//         if (studentSnapshot.exists) {
//             studentAllData.push(groupSnapshot[index])
//         }
//     }
//     return studentAllData
// }

// async function getGroupData(groupDoc = []) {
//     var groupAllValue = []
//     for (var index = 0; index < groupDoc.length; index++) {
//         const groupValue = await db.collection('groups').doc(groupDoc[index]).get();
//         if (groupValue.exists){
//             groupAllValue.push(groupValue.data())
//         }
//     }
//     return groupAllValue
// }

// async function getSecData(fetchSnapshot = []){
//     console.log(fetchSnapshot[0].Sec)
//     console.log(fetchSnapshot[1].Sec)
// }

//! F7
async function perfectValue(userId) {
    let groupSnapshot = await getGroupSnapshot()
    let studentSnapshot = await getStudentSnapshot(groupSnapshot, userId)
    let secSnapshot = await getSecSnapshot(studentSnapshot)
    let subjectSnapshot = await getSubjectSnapshot(secSnapshot)
    let teacherSnapshot = await getTeacherSnapshot(subjectSnapshot)
    console.log(teacherSnapshot)
}

async function getGroupSnapshot() {
    var groupAllData = []
    var groupSnapshot = db.collection('groups').get()
    for (const groupDoc of (await groupSnapshot).docs) {
        groupAllData.push(groupDoc.data())
    }
    return groupAllData
}

async function getStudentSnapshot(groupSnapshot = [], userId) {
    var studentAllData = []
    for (var index = 0; index < groupSnapshot.length; index++) {
        const studentSnapshot = await checkStudent(groupSnapshot[index].Id, userId)
        if (studentSnapshot.exists) {
            studentAllData.push(groupSnapshot[index])
        }
    }
    return studentAllData
}

async function checkStudent(groupId, userId) {
    var studentDoc = db.collection('groups').doc(groupId)
        .collection('students').doc(userId).get();
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
        console.log(teacherValue)
        subjectSnapshot[index].Teacher1 = teacherValue[0]
        subjectSnapshot[index].Teacher2 = teacherValue[1]
        subjectSnapshot[index].Teacher3 = teacherValue[2]
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