//! Initialize Firebase Admin to App
const admin = require('firebase-admin');

//---------------------------------------------------------------------//
const functions = require('firebase-functions');
const server = require('./src/server');
const api = functions
    .runWith({
        memory: "2GB",
        timeoutSeconds: 120
    })
    .https
    .onRequest(server);

//---------------------------------------------------------------------//
//! Cloud Trigger (Notification)
//? News create Notification
const sendNewsNotification = 
    functions.firestore
        .document("/news/{newsId}")
        .onCreate((event) => {             
            console.log("Hello World");
            const news = event.data()

            //! Notification Setting
            const payload = {
                //# Data display to app
                notification:{
                    title: 'ข่าวใหม่มาแล้วค่า',
                    body: String(news.Topic),
                },
                
                //# Data store in payload but not display
                data:{
                    Description: String(news.Description),
                }
            }
            
            return admin.messaging().sendToTopic("News",payload);
        });   

//---------------------------------------------------------------------//
//! Send to Device

//---------------------------------------------------------------------//
module.exports = {
    api,
    sendNewsNotification
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });