//! Initialize Firebase Admin to App
const admin = require("firebase-admin");

let serviceAccount = require("../asset/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const dlc = require("../service/dlc");

let db = admin.firestore();
//---------------------------------------------------------------------//
//# Test Section
var id = "115910400338-2"

    useAsyncAwait()
    async function useAsyncAwait() {
        try {
            let groupFetchData = await getGroupFetchData()
            let groupFetchStudent = await getGroupFetchStudent(groupFetchData, id)
            let groupFetchWork = await getGroupFetchWork(groupFetchStudent)

            console.log(groupFetchWork)
            
        } catch (err) {
            console.log(err)
        }
    }

    async function getGroupFetchData() {
        groupAllData = []

        let groupSnapshot = db.collection('groups').get()

        for (const groupDoc of (await groupSnapshot).docs) {
            groupAllData.push(groupDoc.data().Id)
        }

        return groupAllData
    }

    async function getGroupFetchStudent(groupFetchData = [], id) {
        const groupStudentAllData = []

        for (var index = 0; index < groupAllData.length; index++) {
            let groupStudentSnapshot = await db.collection('groups').doc(groupFetchData[index])
                .collection('students').doc(id).get()

            if (groupStudentSnapshot.exists) {
                groupStudentAllData.push(groupAllData[index])
            }
        }

        return groupStudentAllData
    }

    async function getGroupFetchWork(groupFetchStudent = []) {
        const workAllData = []

        for (var index = 0; index < groupFetchStudent.length; index++) {
            let groupWorkSnapshot = await db.collection('works').where("Group", "==", groupFetchStudent[index]).get()

            for (const workDoc of (await groupWorkSnapshot).docs) {
                workAllData.push(workDoc.data().Id)
            }
        }

        return workAllData.length
    }