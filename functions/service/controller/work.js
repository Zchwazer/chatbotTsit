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
//! Work Collection
//? Get All Work
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work
//* List all user in 'works' collection 
//~ use for usr to look all of work in mobile app
function getAllWork(req, res) {
    var workAllData = [];
    db.collection('works').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                workAllData.push(doc.data());
            });
            return res.send(workAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error,  not found"
            })
        });
}

//? Get Limit Work
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work/workId
//* List all user in 'works' collection 
//~ use for user to look all of work in mobile app
function getLimitWork(req, res) {
    var workAllData = [];
    let subRef = db.collection('secs').limit(parseInt(req.params.limit))
    let getRef = subRef.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                workAllData.push(doc.data());
            });
            return res.send(workAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get All Work in once group
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work/filterGr/{groupId}
//* List all work in 'works' collection filter by group
//~ use for usr to look all of work in mobile app
function getAllWorkGroup(req, res) {
    var workAllData = [];
    db.collection('works').where("Group", "==", req.params.group).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                workAllData.push(doc.data());
            });
            return res.send(workAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error,  not found"
            })
        });
}

//? Get Once Work
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work/workId
//* List once user in 'works' collection 
//~ use for user to look once of work in mobile app
function getOnceWork(req, res) {
    let workRef = db.collection('works').doc(req.params.id).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, work not found"
                })
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, work not found"
            })
        });
}

//? Add Once Work
//# POST METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work
//* Example .JSON Body
//~ use for user to look once of work in mobile app
function addOnceWork(req, res) {
    //~ Initialize UUID
    var uuid = uuidV4();

    //~ Generate Works
    var createDate = [req.body.CreateDay, getMonth(req.body.CreateMonth), req.body.CreateYear];
    var sendDate = [req.body.SendDay, getMonth(req.body.SendMonth), req.body.SendYear];

    let workRef = db.collection('works').doc(uuid)
        .set({
            Id: uuid,
            Group: req.body.Group,
            Topic: req.body.Topic,
            Description: req.body.Description,
            CreateDate: createDate,
            UpdateDate: createDate,
            SendDate: sendDate
        })

        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error , Some input was missing"
            })
        })

    return res.status(201).json({
        status: 201,
        data: "Work add success"
    })
}

//? Update Once Work
//# PUT METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work/workId
//* List once user in 'works' collection 
//~ use for user to look once of work in mobile app
function updateOnceWork(req, res) {

    function getWorkData() {
        //~ Initialize Date
        var updateDate = [req.body.Day, getMonth(req.body.Month), req.body.Year];
        var newDate = [req.body.NewDay, getMonth(req.body.NewMonth), req.body.NewYear]

        // let workRef = db.collection('works').doc(req.params.id).get()
        //     .then(doc => {
        //         if (!doc.exists) {
        //             return res.status(404).json({
        //                 status: 404,
        //                 data: "Error, work not found"
        //             })
        //         } else {
        //             let workUpdate = db.collection('works').doc(req.params.id).get()
        //             .update({
        //                 Topic : req.body.Topic,
        //                 Description : req.body.Description,
        //                 SendDate : newDate,
        //                 UpdateDate : updateDate
        //             })                
        //         }
        //     })
        //     .catch(err => {
        //         return res.status(404).json({
        //             status: 404,
        //             data: "Error, some input was found"
        //         })
        //     });

        let workRef = await
    }
}

//---------------------------------------------------------------------//
//! WARNING


//---------------------------------------------------------------------//
//! FUNCTION
function getMonth(mon) {
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
    return mon;
}
//---------------------------------------------------------------------//
//! Export function to root
module.exports = {
    getAllWork,
    getLimitWork,
    getAllWorkGroup,
    getOnceWork,
    addOnceWork,
    updateOnceWork
}