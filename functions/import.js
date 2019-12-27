//! Imports
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./src/config');
const serviceAccount = require('./asset/serviceAccountKey.json');

//! JSON To Firestore
const jsonToFirestore = async () => {
    try {
        console.log('Initialzing Firebase');
        await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
        console.log('Firebase Initialized');

        await firestoreService.restore('./lib/test.json');
        console.log('Upload Success');
    } catch (error) {
        console.log(error);
    }
};

jsonToFirestore();