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
//! Dashboard Section
//? Get Admin Length
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/dashboard/admin
async function getAdminLength(req, res) {
    try{
        var adminLength = await getDataSnapshot();        
        return res.status(200).json({
            status:200,
            data: adminLength
        })
    }

    catch (err){
        return res.status(404).json({
            status: 404,
            data: "Error, data not found"
        })
    }

    async function getDataSnapshot() {
        var dataIndex = 0
        var allData = 0
        var dataSnapshot = db.collection('admins').get()
        for (const dataDoc of (await dataSnapshot).docs) {
            dataIndex++
            allData = dataIndex         
        }    
        return allData
}
}

//? Get Group Length
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/dashboard/admin
async function getGroupLength(req, res) {
    try{
        var groupLength = await getDataSnapshot();        
        return res.status(200).json({
            status:200,
            data: groupLength
        })
    }

    catch (err){
        return res.status(404).json({
            status: 404,
            data: "Error, data not found"
        })
    }

    async function getDataSnapshot() {
        var dataIndex = 0
        var allData = 0
        var dataSnapshot = db.collection('groups').get()
        for (const dataDoc of (await dataSnapshot).docs) {
            dataIndex++
            allData = dataIndex         
        }    
        return allData
    }
}

//? Get News Length
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/dashboard/admin
async function getNewsLength(req, res) {
    try{
        var newsLength = await getDataSnapshot();        
        return res.status(200).json({
            status:200,
            data: newsLength
        })
    }

    catch (err){
        return res.status(404).json({
            status: 404,
            data: "Error, data not found"
        })
    }

    async function getDataSnapshot() {
        var dataIndex = 0
        var allData = 0
        var dataSnapshot = db.collection('news').get()
        for (const dataDoc of (await dataSnapshot).docs) {
            dataIndex++
            allData = dataIndex         
        }    
        return allData
}
}

//? Get Sec Length
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/dashboard/admin
async function getSecLength(req, res) {
    try{
        var secLength = await getDataSnapshot();        
        return res.status(200).json({
            status:200,
            data: secLength
        })
    }

    catch (err){
        return res.status(404).json({
            status: 404,
            data: "Error, data not found"
        })
    }

    async function getDataSnapshot() {
        var dataIndex = 0
        var allData = 0
        var dataSnapshot = db.collection('secs').get()
        for (const dataDoc of (await dataSnapshot).docs) {
            dataIndex++
            allData = dataIndex         
        }    
        return allData
}
}

//? Get Student Length
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/dashboard/admin
async function getStudentLength(req, res) {
    try{
        var studentLength = await getDataSnapshot();        
        return res.status(200).json({
            status:200,
            data: studentLength
        })
    }

    catch (err){
        return res.status(404).json({
            status: 404,
            data: "Error, data not found"
        })
    }

    async function getDataSnapshot() {
        var dataIndex = 0
        var allData = 0
        var dataSnapshot = db.collection('students').get()
        for (const dataDoc of (await dataSnapshot).docs) {
            dataIndex++
            allData = dataIndex         
        }    
        return allData
}
}

//? Get Subject Length
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/dashboard/admin
async function getSubjectLength(req, res) {
    try{
        var subjectLength = await getDataSnapshot();        
        return res.status(200).json({
            status:200,
            data: subjectLength
        })
    }

    catch (err){
        return res.status(404).json({
            status: 404,
            data: "Error, data not found"
        })
    }

    async function getDataSnapshot() {
        var dataIndex = 0
        var allData = 0
        var dataSnapshot = db.collection('subjects').get()
        for (const dataDoc of (await dataSnapshot).docs) {
            dataIndex++
            allData = dataIndex         
        }    
        return allData
}
}

//? Get Teacher Length
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/dashboard/admin
async function getTeacherLength(req, res) {
    try{
        var teacherLength = await getDataSnapshot();        
        return res.status(200).json({
            status:200,
            data: teacherLength
        })
    }

    catch (err){
        return res.status(404).json({
            status: 404,
            data: "Error, data not found"
        })
    }

    async function getDataSnapshot() {
        var dataIndex = 0
        var allData = 0
        var dataSnapshot = db.collection('teachers').get()
        for (const dataDoc of (await dataSnapshot).docs) {
            dataIndex++
            allData = dataIndex         
        }    
        return allData
}
}

//? Get User Length
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/dashboard/admin
async function getUserLength(req, res) {
    try{
        var userLength = await getDataSnapshot();        
        return res.status(200).json({
            status:200,
            data: userLength
        })
    }

    catch (err){
        return res.status(404).json({
            status: 404,
            data: "Error, data not found"
        })
    }

    async function getDataSnapshot() {
        var dataIndex = 0
        var allData = 0
        var dataSnapshot = db.collection('users').get()
        for (const dataDoc of (await dataSnapshot).docs) {
            dataIndex++
            allData = dataIndex         
        }    
        return allData
}
}

//? Get Work Length
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/dashboard/admin
async function getWorkLength(req, res) {
    try{
        var worksLength = await getDataSnapshot();        
        return res.status(200).json({
            status:200,
            data: worksLength
        })
    }

    catch (err){
        return res.status(404).json({
            status: 404,
            data: "Error, data not found"
        })
    }

    async function getDataSnapshot() {
        var dataIndex = 0
        var allData = 0
        var dataSnapshot = db.collection('works').get()
        for (const dataDoc of (await dataSnapshot).docs) {
            dataIndex++
            allData = dataIndex         
        }    
        return allData
    }
}

//? CSV
//# GET METHOD => http://localhost:5000/newagent-47c20/us-central1/api/dashboard/csvTojson
function csvTojson(req,res){

}
//---------------------------------------------------------------------//
module.exports = {
    getAdminLength,
    getGroupLength,
    getNewsLength,
    getSecLength,
    getStudentLength,
    getSubjectLength,
    getTeacherLength,
    getUserLength,
    getWorkLength,
    csvTojson
}