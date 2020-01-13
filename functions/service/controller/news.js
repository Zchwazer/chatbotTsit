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
//! Initialize UUID
//~ uuid/V4 = random uuid
const uuidV4 = require('uuid/v4');

//---------------------------------------------------------------------//
//! User Collection Section
//? Get All news
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news
//* List all user in 'news' collection 
//~ use in mobile app to look all of news 
function getAllNews(req, res) {
    var newsAllData = [];
    db.collection('news').get()
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
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news/filterTp/{newsType}
//* Detail of all document of 'news' collection with filter by type 
//~ use in mobile app to look once of news 
function getFilterTypeNews(req, res) {
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

//? Add news
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/news/
//* Add .json data to 'news' collection in cloud firestore
//* .json body Example {
//*     "Topic" : "Hello World" 	
//* 	"Description": "How to train your programming",
//* 	"Day" : "01",
//*     "Month": "12",
//*     "Year": "2562",
//*     "Type" : "A"
//* }
//~ use in web app for administrator on web app
function addOnceNews(req, res) {
    //~ Generate UUID 
    var uuid = uuidV4()

    //~ Check uuid is not generate same as uuid in collection (But is very hard to generate same like before)
    let newsRef = db.collection('news').doc(uuid)
    let getOnce = newsRef.get()
        .then(doc => {
            if (!doc.exists) {
                //~ Define Another Variable
                var topic = req.body.Topic
                var des = req.body.Description
                var day = req.body.Day
                var mon = req.body.Month
                var year = req.body.Year
                var type = req.body.Type

                //~ Change Month to text
                switch (mon) {
                    case "1":
                        mon = "มกราคม"
                        break;
                    case "2":
                        mon = "กุมภาพันธ์"
                        break;
                    case "3":
                        mon = "มีนาคม"
                        break;
                    case "4":
                        mon = "เมษายน"
                        break;
                    case "5":
                        mon = "พฤษภาคม"
                        break;
                    case "6":
                        mon = "มิถุนายน"
                        break;
                    case "7":
                        mon = "กรกฎาคม"
                        break;
                    case "8":
                        mon = "สิงหาคม"
                        break;
                    case "9":
                        mon = "กันยายน"
                        break;
                    case "10":
                        mon = "ตุลาคม"
                        break;
                    case "11":
                        mon = "พฤศจิกายน"
                        break;
                    case "12":
                        mon = "ธันวาคม"
                        break;
                }

                let newsRef = db.collection('news').doc(uuid);

                let setAda = newsRef.set({
                    Id: uuid,
                    Topic: topic,
                    Description: des,
                    Day: day,
                    Month: mon,
                    Year: year,
                    Type: type,
                    Status: 1
                });

                return res.status(201)
                    .json({
                        status: 201,
                        data: "Add news into collection complete"
                    })
            } else {
                addOnceNews(req, res);
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
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
    addOnceNews
}