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

//! Initialize Feature Function
const dlc = require('../dlc');

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

//? Get All List of work (Number)
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/work/filterGr/{groupId}
//* List all work in 'works' collection filter by group
//~ use for usr to look all of work in mobile app
function getAllNumberWorks(req, res) {
    var id = req.params.id    
    
    useAsyncAwait()
    
    async function useAsyncAwait() {
        try {
            let groupFetchData = await getGroupFetchData()
            let groupFetchStudent = await getGroupFetchStudent(groupFetchData, id)
            let groupFetchWork = await getGroupFetchWork(groupFetchStudent)            

            return res.status(200).json({
                status: 200,
                data: groupFetchWork.length
            })            

        } catch (err) {            
            return res.status(404).json({
                status: 404,
                data: "Error, data not found"
            })
        }
    }

    async function getGroupFetchData() {
        groupAllData = []

        let groupSnapshot = db.collection('groups').get()

        for (const groupDoc of (await groupSnapshot).docs) {
            groupAllData.push(groupDoc.data().Id)
        }

        return groupAllData
    }

    async function getGroupFetchStudent(groupFetchData = [], id) {
        const groupStudentAllData = []

        for (var index = 0; index < groupAllData.length; index++) {
            let groupStudentSnapshot = await db.collection('groups').doc(groupFetchData[index])
                .collection('students').doc(id).get()

            if (groupStudentSnapshot.exists) {
                groupStudentAllData.push(groupAllData[index])
            }
        }

        return groupStudentAllData
    }

    async function getGroupFetchWork(groupFetchStudent = []) {
        const workAllData = []

        for (var index = 0; index < groupFetchStudent.length; index++) {
            let groupWorkSnapshot = await db.collection('works').where("Group", "==", groupFetchStudent[index]).get()

            for (const workDoc of (await groupWorkSnapshot).docs) {
                workAllData.push(workDoc.data().Id)
            }
        }

        return workAllData
    }
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

    //~ Generate Works Date
    var createDate = dlc.getDate(req.body.CreateDate)
    var setCreateDate = [createDate[2], dlc.getMonth(createDate[1]), dlc.getYear(createDate[2])]

    var sendDate = dlc.getDate(req.body.CreateDate)
    var setSendDate = [sendDate[2], dlc.getMonth(sendDate[1]), dlc.getYear(sendDate[2])]


    let workRef = db.collection('works').doc(uuid)
        .set({
            Id: uuid,
            Group: req.body.Group,
            Topic: req.body.Topic,
            Description: req.body.Description,
            CreateDate: setCreateDate,
            UpdateDate: setCreateDate,
            SendDate: setSendDate
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
    //~ Initialize Date
    var updateDate = dlc.getDate(req.body.UpdateDate)
    var setUpdateDate = [updateDate[2], dlc.getMonth(updateDate[1]), dlc.getYear(updateDate[0])]

    var newDate = dlc.getDate(req.body.SendDate)
    var setNewDate = [newDate[2], dlc.getMonth(newDate[1]), dlc.getYear(newDate[0])]

    updateMain()

    async function updateMain() {
        try {
            let workRef = await db.collection('works').doc(req.params.id).get();
            if (workRef.exists) {
                updateData(workRef)
            } else {
                return res.status(404).json({
                    status: 404,
                    data: "Error , Work not found"
                })
            }
        } catch (err) {
            return res.status(404).json({
                status: 404,
                data: "Error , Endpoint not found"
            })
        }
    }

    function updateData(workRef) {
        let workUpdate = db.collection('works').doc(req.params.id)
            .update({
                Topic: req.body.Topic,
                Description: req.body.Description,
                SendDate: setNewDate,
                UpdateDate: setUpdateDate
            })

        return res.status(201).json({
            status: 201,
            data: "Your data update success"
        })
    }
}

//---------------------------------------------------------------------//
//! WARNING

//---------------------------------------------------------------------//
//! Export function to root
module.exports = {
    getAllWork,
    getLimitWork,
    getAllWorkGroup,
    getAllNumberWorks,
    getOnceWork,
    addOnceWork,
    updateOnceWork
}