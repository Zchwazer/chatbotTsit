//-- About comment color definition
//! Red     : DELETE
//? Blue    : PUT
//# Yellow  : POST 
//* Green   : GET
//~ Pink    : TOPIC
//---------------------------------------------------------------------//
//~ Initialize configuration
const router = require('express').Router();

//---------------------------------------------------------------------//
//~ Initialize controller
const user = require('./controller/user');
const student = require('./controller/student');
const news = require('./controller/news');
const subject = require('./controller/subject');
const sec = require('./controller/sec');
const teacher = require('./controller/teacher');
const group = require('./controller/group');
const work = require('./controller/work');

//---------------------------------------------------------------------//
//~ User Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
router.get("/user" ,user.getAllUser);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/{limitNumber}
router.get("/user/:limit" ,user.getLimitUser);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/filterId/{userId}
router.get("/user/filterId/:id" ,user.getOnceUser);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/filterEm/{userEmail}
router.get("/user/filterEm/:email", user.getOnceEmail)

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
router.post("/user" ,user.addOnceUser);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updateLv/{userId}
router.put("/user/updateLv/:id", user.updateOnceUser);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updatePs/{userId}
router.put("/user/updatePs/:id", user.updateUserPassword);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updateEm/{userId}
router.put("/user/updateEm/:id", user.updateUserEmail);

//---------------------------------------------------------------------//
//~ Student Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student
router.get("/student" ,student.getAllStudent);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student/filterId/{studentId}
router.get("/student/filterId/:id" ,student.getOnceStudent);

//---------------------------------------------------------------------//
//~ News Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news
router.get("/news", news.getAllNews);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/filterId/{newsId}
router.get("/news/filterId/:id", news.getOnceNews);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/filterTp/{type}
router.get("/news/filterTp/:type", news.getFilterTypeNews);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/
router.post("/news", news.addOnceNews);

//? PUT =>  https://us-central1-newagent-47c20.cloudfunctions.net/api/news/updateDt/{newsId}
router.put("/news/updateDt", news.updateNewsData);

//---------------------------------------------------------------------//
//~ Subject Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject
router.get("/subject", subject.getAllSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/{limitNumber}
router.get("/subject/:limit", subject.getLimitSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterTp/{type}
router.get("/subject/filterTp/:type", subject.getFilterTypeSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterTp/{type}/{limitNumber}
router.get("/subject/filterTp/:type/:limit", subject.getLimitFilterTypeSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterCr/{credit}
router.get("/subject/filterCr/:credit", subject.getFilterCreditSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterCr/{credit}/{limitNumber}
router.get("/subject/filterCr/:credit/:limit", subject.getLimitFilterCreditSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterSt/{status}
router.get("/subject/filterSt/:status", subject.getFilterStatusSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterSt/{status}/{limitNumber}
router.get("/subject/filterSt/:status/:limit", subject.getLimitFilterStatusSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects/filterId/{subjectId}
router.get("/subject/filterId/:id", subject.getOnceSubject);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject
router.post("/subject" ,subject.addOnceSubject);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/updateTh/{subjectId}
router.put("/subject/updateTh/:id", subject.updateNameThSubject);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/updateEn/{subjectId}
router.put("/subject/updateEn/:id", subject.updateNameEnSubject);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/updateCr/{subjectId}
router.put("/subject/updateCr/:id", subject.updateCreditSubject);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/updateTp/{subjectId}
router.put("/subject/updateTp/:id", subject.updateTypeSubject);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/updateSt/{subjectId}
router.put("/subject/updateSt/:id", subject.updateStatusSubject);

//---------------------------------------------------------------------//
//~ Teacher Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/teacher
router.get("/teacher", teacher.getAllTeacher);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/teacher/{limitNumber}
router.get("/teacher/:limit", teacher.getAllLimitTeacher);

//---------------------------------------------------------------------//
//~ Sec Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec
router.get("/sec", sec.getAllSection);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/{limitNumber}
router.get("/sec/:limit", sec.getLimitSec);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects/filterId/{secId}
router.get("/sec/filterId/:id", sec.getOnceSection);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects/filterSj/{subjectId}
router.get("/sec/filterSj/:id", sec.getFilterSubjectSection);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects/filterId/{secId}
router.post("/sec" , sec.addOnceSection);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects/updateSt/{secId} 
router.put("/sec/updateSt/:id" , sec.updateSectionStatus);

//---------------------------------------------------------------------//
//~ Group Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec
router.get("/group", group.getAllGroup);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/{limitNumber}
router.get("/group/:limit", group.getLimitGroup);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects/filterSj/{subjectId}
router.get("/group/filterId/:id", group.getOnceGroup);

//# POST => 

//? PUT => 

//---------------------------------------------------------------------//
//~ Work Collection


//---------------------------------------------------------------------//
module.exports = router;