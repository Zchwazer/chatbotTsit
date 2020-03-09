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
var stuId = "1159104003382"
// var firstId = id.substr(0,12)
// var lastId = id.substr(12) 
// var setId =  stuId.substr(0, 12) + "-" + stuId.substr(12)    
// console.log(setId)
console.log(typeof(parseInt(stuId)))
