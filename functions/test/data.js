//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//
//! Test Section
getData()

async function getData() {
    let groupAllData = await fetchGroupData()
    let secAllData = await fetchSecData(groupAllData)
    console.log(secAllData)
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
        if (secSnapshot.exists){
            groupAllData[index].Sec = secSnapshot.data()        
        }        
    }
    return groupAllData
}

async function checkSecData(secId) {    
    let secDoc = db.collection('secs').doc(secId).get()
    return secDoc
}