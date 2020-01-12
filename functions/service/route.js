//-- About comment color definition
//! Red     : Main Topic each section
//? Blue    : Sub Topic each section
//# Yellow  : Example endpoint 
//* Green   : Work of this section
//~ Pink    : Explain function
//---------------------------------------------------------------------//
//! Initialize configuration
const router = require('express').Router();
const user = require('./controller/user');
const student = require('./controller/student');
const news = require('./controller/news');
const subject = require('./controller/subject');
//---------------------------------------------------------------------//
//! Application Programming Interface
//? User Collection
//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
//~ Use for get all user data in web app
router.get("/user" ,user.getAllUser);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/{userId}
//~ Use for get single user data in user mobile app or web app
router.get("/user/:id" ,user.getOnceUser);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/filterEm/{userEmail}
//~ Use for get single user data in user mobile app or web app (filter by email)
router.get("/user/filterEm/:email", user.getOnceEmail)

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
//~ Use for registration section in user mobile application
router.post("/user" ,user.addOnceUser);

//# PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updateLv/{userId}
//~ Use for admin change user level in web app
router.put("/user/updateLv/:id", user.updateOnceUser);

//# PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updatePs/{userId}
//~ Use for user change user password in web app
router.put("/user/updatePs/:id", user.updateUserPassword);

//# PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updateEm/{userId}
//~ Use for user change user email in web app
router.put("/user/updateEm/:id", user.updateUserEmail);

//---------------------------------------------------------------------//
//? Student Collection
//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student
//~ Use for get all student data in web app
router.get("/student" ,student.getAllStudent);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student/{studentId}
//~ Use for get single student data in web app
router.get("/student/:id" ,student.getOnceStudent);

//---------------------------------------------------------------------//
//? News Collection
//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news
//~ Use for get all news data in mobile app and web app
router.get("/news", news.getAllNews);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/{newsId}
//~ Use for get single news data in mobile app and web app
router.get("/news/:id", news.getOnceNews);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/filterTp/{type}
//~ Use for get all news data with filter in mobile app and web app
router.get("/news/filterTp/:type", news.getFilterTypeNews);

//---------------------------------------------------------------------//
//? Subject Collection
//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject
//~ Use for admin to get all subject in web app
router.get("/subject", subject.getAllSubject);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/limit/{limitNumber}
//~ Use for admin to get all subject in web app
router.get("/subject/limit/:limit", subject.getLimitSubject);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterTp/{type}
//~ Use for admin to get all subject in web app
router.get("/subject/filterTp/:type", subject.getFilterTypeSubject);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterCr/{credit}
//~ Use for admin to get all subject in web app
router.get("/subject/filterCr/:credit", subject.getFilterCreditSubject);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterCr/{credit}/{limitNumber}
//~ Use for admin to get all subject in web app
router.get("/subject/filterCr/:credit/:limit", subject.getFilterCreditSubject);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects{subjectId}
//~ Use for user or admin to get once subject in mobile app or web app
router.get("/subject/:id", subject.getOnceSubject);

//---------------------------------------------------------------------//
//? Sec Collection


//---------------------------------------------------------------------//
//? Group Collection


//---------------------------------------------------------------------//
//? Work Collection


//---------------------------------------------------------------------//
module.exports = router;