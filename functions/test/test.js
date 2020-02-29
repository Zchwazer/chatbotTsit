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
var date = "2020-12-01"
var newwer = "2020-03-01"

var updateDate = dlc.getDate(date)
var setUpdateDate = [updateDate[2], dlc.getMonth(updateDate[1]), dlc.getYear(updateDate[0])]

var newDate = dlc.getDate(newwer)
var setNewDate = [newDate[2], dlc.getMonth(newDate[1]), dlc.getYear(newDate[0])]

console.log(setUpdateDate)
console.log(setNewDate)
