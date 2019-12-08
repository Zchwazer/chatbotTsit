//! Initialize on Cloud Function
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

//# Add Data
let docRef = db.collection('users').doc('');

let setAda = docRef.set({
  userId:'',            //* _stuIdRegister
  userEmail: '',        //* _emailRegister
  userPassword:'',      //* _passwordRegister
  userLevel:false   
});

//# Read Data
db.collection('users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });