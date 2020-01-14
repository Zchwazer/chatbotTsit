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
//! Group Collection Section
//? Get All group
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group
//* List all group in 'groups' collection 
//~ use in web app (admin) to look all of group in mobile app
function getAllGroup(req, res) {
    var groupAllData = [];
    db.collection('groups').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                groupAllData.push(doc.data());
            });
            return res.send(groupAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get All group (Limit)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/{limitNumber}
//* List all group in 'group' collection (with limiter)
//~ use in web app (admin) to look all of subject in web app
function getLimitGroup(req, res) {
    var groupAllData = [];
    let groupRef = db.collection('groups').limit(parseInt(req.params.limit))
    let getRef = groupRef.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                groupAllData.push(doc.data());
            });
            return res.send(groupAllData);
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                data: "Error, endpoint not found"
            })
        });
}

//? Get Once group
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/group/{groupId}
//* Detail of once document of 'groups' collection (find by id)
//~ use in mobile app to get data for display to mobile app
function getOnceGroup(req, res) {
    let groupRef = db.collection('groups').doc(req.params.id)
    let getOnce = groupRef.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    status: 404,
                    data: "Error, group not found"
                })
            } else {
                return res.send(doc.data())
            }
        })
        .catch(err => {
            return res.status(404).json({
                status: 404,
                data: "Error, group not found"
            })
        });
}


//---------------------------------------------------------------------//
//! WARNING

//---------------------------------------------------------------------//
//! Export function to route
module.exports = {
    getAllGroup,
    getLimitGroup,
    getOnceGroup
}