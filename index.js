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
    userId: '',             //* _stuIdRegister 
    userEmail: '',          //* _emailRegister
    userPassword: '',       //* _passwordRegister
    userLevel: false
  });
})

//# Read Data
//? GET ALL
app.get('/users',function (req,res){
  res.send('Get finish')

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
app.get('/users/{userId}',function (req,res){

})