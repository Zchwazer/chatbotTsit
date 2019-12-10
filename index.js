//! Initialize on Cloud Function
const admin = require('firebase-admin');
const functions = require('firebase-functions');

//? Definition 
var serviceAccount = require('./asset/newagent-47c20-firebase-adminsdk-jg99g-7f32e79e95.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://newagent-47c20.firebaseio.com"
});

let db = admin.firestore();

//! Initialize Express
const express = require('express')
const app = express()
const port = 1111

app.listen(port, () => console.log(`App running at port ${port}!`))

//! Application Program Interface (API)
//# Add user data to firebase cloud store
app.post('/users', function (req, res) {
  res.send('Post User')

  let docRef = db.collection('users').doc('alovelace');

  let setAda = docRef.set({
    userId: '', //* _stuIdRegister 
    userEmail: '', //* _emailRegister
    userPassword: '', //* _passwordRegister
    userLevel: false
  });
})

//# Read Data
//? GET ALL
app.get('/users', function (req, res) {
  res.send('Get all')

  db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
})

//? GET SINGLE
app.get('/users/:id', function (req, res) {
  var checker = 0

  let userRef = db.collection('users').doc(req.params.id)
  let getOnce = userRef.get()

    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        checker = 0;
      } else {
        console.log('Document data:', doc.data());
        checker = 1;
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

  res.send(checker)
  // checker != false ? res.send('Data found') : res.send('Data not found');
})

//# Function for send data on Response
function responseData(checker) {
  return res.send('Document data : ', doc.data());
}