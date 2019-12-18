//-- About comment color definition
  //! Red     : Use for explain about "Main Topic" or "Keyword" of work
  //? Blue    : Use for example how to use this section
  //# Yellow  : Use for explain about "Sub Topic" 
  //* Green   : Use for explain how is this section going to do 
  //~ Pink    : Use for comment about what this code going to do
  //todo      : definition as name "todo" is mean how about this is work
  //doc       : definition as name "important" is mean this is documentation 
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
//---------------------------------------------------------------------//
//! Initialize Express 
import express from 'express';
import cors from 'cors';
import postsRoute from './posts.routes';

const app = express();
app.use(cors());
app.use(postsRoute);

export const api = functions.https.onRequest(app);
//---------------------------------------------------------------------//
router.route('/users').get((req,res) => {
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
