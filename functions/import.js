//! Initialize Firebase import - export
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./src/config');
const serviceAccount = require('./asset/serviceAccountKey.json');

//! JSON To Firestore
const jsonToFirestore = async () => {
    try {
        console.log('Initialzing Firebase');
        await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
        console.log('Firebase Initialized');

        //~ {...} is json file in lib that you want to import
        //~ await firestoreService.restore('./lib/{...}.json');
        await firestoreService.restore('./lib/example.json');
        console.log('Upload Success');
    } catch (error) {
        console.log(error);
    }
};

jsonToFirestore();

//! if can't import should be check your node_modules is already have 'firestore-export-import' 

//# Use "npm install firestore-export-import" to install node_modules

//# Use "node import.js" in cmd to import .json file to cloud firestore

//~ should cd to functions before use firebase serve