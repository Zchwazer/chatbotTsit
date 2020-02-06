//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

let serviceAccount = require('../asset/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
//---------------------------------------------------------------------//
//# Test Section

//* Variable
var workId = "0db30ea7-e90e-4ed8-bb82-bfdd48d482ce"
var updateDate = ["1", "2", "3"];
var newDate = ["4", "5", "6"];
var newTopic = ""
var newDes = ""
// main()
updateMain()


//* Function
// async function main() {    
//     let workRef = await db.collection('works').doc(workId).get();
//     if (workRef.exists) {
//         const topicCounter = updateTopicOrNot()
//         const descriptionCounter = updateDescriptionOrNot()
//         const dateCounter = updateDateOrNot()
//         updateDateData(topicCounter,descriptionCounter)
//     }
//     else{
//         console.log("work not found")
//     }
// }

// function updateTopicOrNot() {
//     var topicCounter = false 
//     if (newTopic != "") {
//         let topicUpdate = db.collection('works').doc(workId).get()
//         .update({
//             Topic: newTopic
//         })
//         topicCounter = true    
//     } 
//     return topicCounter
// }

// function updateDescriptionOrNot() {
//     var descriptionCounter = false
//     if (newDes != "") {
//         let descriptionUpdate = db.collection('works').doc(workId).get()
//         .update({
//             Description: newDes
//         })        
//         descriptionCounter = true
//     } 
//     return descriptionCounter
// }

// function updateDescriptionOrNot() {
//     var datecounter = false
//     if (newTopic != "") {
//         let descriptionUpdate = db.collection('works').doc(workId).get()
//         .update({
//             SendDate: newDate
//         })        
//         datecounter = true
//     } 
//     return descriptionCounter
// }

// function updateDateData(topicCounter,descriptionCounter,dateCounter) {
//     if (topicCounter === true || descriptionCounter === true || dateCounter === true){
//         let workUpdate = db.collection('works').doc(workId).get()
//         .update({
            
//             UpdateDate: updateDate
//         })        
//     }
// }


async function updateMain() {
    var s=1
    let workRef = await db.collection('works').doc(workId).get();
    // s == 0 ? console.log("a"): console.log("b")
    workRef.exists ? updateData() : console.log("Not Found Work")
}

function updateData(workRef){
    let workUpdate = db.collection('works').doc(workId)
        .update({
            Topic : newTopic,
            Description : newDes,
            SendDay : newDate,
            UpdateDate : updateDate
        })
}