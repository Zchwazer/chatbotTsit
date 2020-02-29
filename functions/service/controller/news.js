//-- About comment color definition
//! Red     : Main Topic each section
//? Blue    : Sub Topic each section
//# Yellow  : Example endpoint
//* Green   : Work of this section
//~ Pink    : Explain function
//---------------------------------------------------------------------//
//! Initialize Cloud Firestore
const admin = require("firebase-admin");

let db = admin.firestore();
//---------------------------------------------------------------------//
//! Initialize UUID
//~ uuid/V4 = random uuid
const uuidV4 = require("uuid/v4");

//~ import another function
const dlc = require("../dlc");
//---------------------------------------------------------------------//
//! User Collection Section
//? Get All news
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news
//* List all user in 'news' collection
//~ use in mobile app to look all of news
function getAllNews(req, res) {
    var newsAllData = [];
    db.collection("news")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                newsAllData.push(doc.data());
            });
            return res.send(newsAllData);
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            });
        });
}

//? Get Once news
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news/{newsId}
//* Detail of once document of 'news' collection (find by id)
//~ use in mobile app to look once of news
function getOnceNews(req, res) {
    let newsRef = db.collection("news").doc(req.params.id);
    let getOnce = newsRef
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, News not found"
                });
            } else {
                return res.send(doc.data());
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            });
        });
}

//? Get Type news
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news/filterTp/{newsType}
//* Detail of all document of 'news' collection with filter by type
//~ use in mobile app to look once of news
function getFilterTypeNews(req, res) {
    var newsAllFilter = [];
    db.collection("news")
        .where("Type", "==", req.params.type)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                newsAllFilter.push(doc.data());
            });
            return res.send(newsAllFilter);
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, News type not found"
            });
        });
}

//? Add news
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news/
//* Add .json data to 'news' collection in cloud firestore
//* .json body Example {
//*     "Topic" : "Hello World"
//* 	"Description": "How to train your programming",
//* 	"Date" : "2020-02-07",
//*     "Time" : "05:00",
//*     "Type" : "A"
//* }
//~ use in web app for administrator on web app
function addOnceNews(req, res) {
    //~ Generate UUID
    var uuid = uuidV4();

    //~ Generate Date
    var getDate = dlc.getDate(req.body.Date)
    var setDate = [getDate[2],dlc.getMonth(getDate[1]),dlc.getYear(getDate[0])]

    //~ Check uuid is not generate same as uuid in collection (But is very hard to generate same like before)
    let newsRef = db.collection("news").doc(uuid);
    let getOnce = newsRef
        .get()
        .then(doc => {
            if (!doc.exists) {
                //~ Define Another Variable
                let newsRef = db.collection("news").doc(uuid);

                let setAda = newsRef.set({
                    Id: uuid,
                    Topic: req.body.Topic,
                    Description: req.body.Description,
                    Date: setDate,
                    Time: req.body.Time,
                    Type: req.body.Type,
                    Status: 1
                });

                return res.status(201).json({
                    status: 201,
                    data: "Add news into collection complete"   
                });
            } else {
                addOnceNews(req, res);
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            });
        });
}

//? Update news data
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news/updateDt/{newsId}
//~ use in web app for administrator to change news description
function updateNewsData(req, res) {
    let newsRef = db.collection("news").doc(req.params.id);
    let getRef = newsRef
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, user not found"
                });
            } else {
                let setAda = newsRef.update({
                    Topic: req.body.Topic,
                    Description: req.body.Description,
                    Day: req.body.Day,
                    Month: req.body.Month,
                    Year: req.body.Year,
                    Type: req.body.Type
                });

                return res.status(201).json({
                    status: 201,
                    data: "User has been update success"
                });
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, some input was missing"
            });
        });
}
//---------------------------------------------------------------------//
//! WARNING
//? News status 0 = Hidden
//? News status 1 = Show
//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllNews,
    getFilterTypeNews,
    getOnceNews,
    addOnceNews,
    updateNewsData
};