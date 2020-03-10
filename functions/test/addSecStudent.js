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
