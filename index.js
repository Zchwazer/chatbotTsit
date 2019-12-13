//-- About comment color definition
//! Red     : Use for explain about "Main Topic" or "Keyword" of work
//? Blue    : Use for example how to use this section
//# Yellow  : Use for explain about "Sub Topic" 
//* Green   : Use for explain how is this section going to do 
//~ Pink    : Use for comment about what this code going to do
//todo      : definition as name "todo" is mean how about this is work
//doc       : definition as name "doc" is mean this is documentation   
//---------------------------------------------------------------------//
//! Initialize on Cloud Function
const admin = require('firebase-admin');
const functions = require('firebase-functions');

//* serviceAccount is json file to identify your firebase (Chatbot Project Test)
var serviceAccount = require('./asset/newagent-47c20-firebase-adminsdk-jg99g-7f32e79e95.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://newagent-47c20.firebaseio.com"
});

let db = admin.firestore();

//! Define port
const port = 1010

//! Initialize Express
const express = require('express')
const app = express()

app.listen(port, () => console.log(`App running at port ${port}!`))

//! Middleware (Body parser)
//* bodyParser use for filter request before data run to application
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//! Application Program Interface (API)
//# Add user data to firebase cloud store
app.post('/users', function (req, res) {
  var id = req.body.userId
  var email = req.body.userEmail
  var password = req.body.userPassword

  //~ Check student id & password length is == 13 ?
  checkLength(id, password)

  //~ Check student id is CPE student ?
  checkCPE(id)

  let docRef = db.collection('users').doc(id);

  let setAda = docRef.set({
    userId : id,
    userEmail: email,
    userPassword: password,
    userLevel: 0
  });

  res.json(id[email, password, level])
})

//# Read Data 
//? Example : localhost:1010/users
app.get('/users', function (req, res) {
  var getAllResult = []

  db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        getAllResult.push(doc.data())
      });
      res.send(getAllResult)
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.status(404).end()
    });
})

//? Example : localhost:1010/users/{studentId}
app.get('/users/:id', function (req, res) {
  let userRef = db.collection('users').doc(req.params.id)
  let getOnce = userRef.get()

    .then(doc => {
      if (!doc.exists) {
        console.log('Document not found')
        res.status(404).end()       
      } else {
        console.log('Document data:', doc.data());
        res.send(doc.data())
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
})

//! Function
//# Registration Section
//* Check user and password length 
function checkLength(id, password) {
  //~ Check id length is == 13 because student id is = 13
  var idLength = false
  var psLength = false

  id.length != 13 ? idLength = false : idLength = true;
  password.length != 13 ? psLength = false : psLength = true;

  if ((id.length || psLength) == false) {
    res.status(404).end();
  }
}

//* Check user is CPE ?
function checkCPE(id) {
  let userRef = db.collection('students').doc(id)
  let getOnce = userRef.get()

    .then(doc => {
      if (!doc.exists) {
        res.status(404).end();
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
}