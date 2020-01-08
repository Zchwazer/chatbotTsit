//-- About comment color definition
//! Red     : Main Topic each section
//? Blue    : Sub Topic each section
//# Yellow  : Example endpoint 
//* Green   : Work of this section
//~ Pink    : Explain function
//---------------------------------------------------------------------//
//! Initialize Cloud Firestore
const admin = require('firebase-admin');

let db = admin.firestore();
//---------------------------------------------------------------------//
//! User Collection Section
//? Get All news
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news
//* List all user in 'news' collection 
//~ use in mobile app to look all of news 
function getAllNews(req, res) {
    var newsAllData = [];
    db.collection('news').orderBy("Time", "desc").get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                newsAllData.push(doc.data());
            });
            return res.send(newsAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get Once news
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news/{newsId}
//* Detail of once document of 'news' collection (find by id)
//~ use in mobile app to look once of news 
function getOnceNews(req, res) {
    let newsRef = db.collection('news').doc(req.params.id)
    let getOnce = newsRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, News not found"
                })
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get Group news
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news/filter/{newsType}
//* Detail of all document of 'news' collection with filter by type 
//~ use in mobile app to look once of news 
function getTypeNews(req, res) {
    var newsAllFilter = [];
    db.collection('news').where("Type", "==", req.params.type).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {                
                newsAllFilter.push(doc.data());
            });
            return res.send(newsAllFilter);
        })
        .catch((err) => {                        
            return res.status(404).json({
                status: 404,
                data: "Error, News type not found"
            })
        });
}

//! BREAK [Wait for Front End Design]
//? Add news
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news/
//* Add .json data to 'news' collection in cloud firestore
//* .json body Example {
//*     "Topic" : "Hello World" 	
//* 	"Description": "How to train your programming",
//* 	"Time" : ""
//*     "Type" : "A"
//* }
//~ use in web app for administrator on 
function addOnceNews(req, res) {
    var topic = req.body.Topic
    var description = req.body.Description
    var dateTime = req.body.Time
    var type = req.body.Type

    //~ Add data to news collection
    let docRef = db.collection('news').doc(id);

    let setAda = docRef.set({
        Id: doc(id),
        Topic: topic,
        Description: description,
        Time: dateTime,
        Type: type
    });
}

//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllNews,
    getOnceNews,
    getTypeNews
}