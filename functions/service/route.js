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

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/limit/{limitNumber}
router.get("/user/limit/:limit" ,user.getLimitUser);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/{userId}
router.get("/user/:id" ,user.getOnceUser);

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

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student/{studentId}
router.get("/student/:id" ,student.getOnceStudent);

//---------------------------------------------------------------------//
//~ News Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news
router.get("/news", news.getAllNews);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/{newsId}
router.get("/news/:id", news.getOnceNews);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/filterTp/{type}
router.get("/news/filterTp/:type", news.getFilterTypeNews);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/
router.post("/news", news.addOnceNews);

//---------------------------------------------------------------------//
//~ Subject Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject
router.get("/subject", subject.getAllSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/limit/{limitNumber}
router.get("/subject/limit/:limit", subject.getLimitSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterTp/{type}
router.get("/subject/filterTp/:type", subject.getFilterTypeSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterTp/{type}/{limitNumber}
router.get("/subject/filterTp/:type/:limit", subject.getLimitFilterTypeSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterCr/{credit}
router.get("/subject/filterCr/:credit", subject.getFilterCreditSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterCr/{credit}/{limitNumber}
router.get("/subject/filterCr/:credit/:limit", subject.getLimitFilterCreditSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterAv/{available}
router.get("/subject/filterAv/:available", subject.getFilterAvailableSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterAv/{available}/{limitNumber}
router.get("/subject/filterAv/:available/:limit", subject.getLimitFilterAvailableSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects{subjectId}
router.get("/subject/:id", subject.getOnceSubject);

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

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/updateAv/{subjectId}
router.put("/subject/updateAv/:id", subject.updateAvailableSubject);

//---------------------------------------------------------------------//
//~ Sec Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects{subjectId}
router.get("/subject/:id", subject.getOnceSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects{subjectId}
router.get("/subject/:id", subject.getOnceSubject);

//---------------------------------------------------------------------//
//~ Group Collection


//---------------------------------------------------------------------//
//~ Work Collection


//---------------------------------------------------------------------//
module.exports = router;