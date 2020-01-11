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

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/filter/{userEmail}
//~ Use for get single user data in user mobile app or web app (filter by email)
router.get("/user/filter/:email", user.getOnceEmail)

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
//~ Use for registration section in user mobile application
router.post("/user" ,user.addOnceUser);

//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/level/{userId}
//~ Use for admin change user level in web app
router.put("/user/level/:id", user.updateOnceUser);

//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/changePassword/{userId}
//~ Use for user change user password in web app
router.put("/user/password/:id", user.updateUserPassword);

//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/changeEmail/{userId}
//~ Use for user change user email in web app
router.put("/user/email/:id", user.updateUserEmail);

//---------------------------------------------------------------------//
//? Student Collection
//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student
//~ Use for get all student data in web app
router.get("/student" ,student.getAllStudent);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student/{studentId}
//~ Use for get single student data in web app
router.get("/student/:id" ,student.getOnceStudent);

//---------------------------------------------------------------------//
//? Subject Collection
//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/
//~ Use for admin to get all subject in web app
router.get("/subject/", subject.getAllSubject);

//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/limit/{limitNumber}
//~ Use for admin to get all subject in web app
router.get("/subject/limit/:limit", subject.getLimitSubject);

//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterType/{type}
//~ Use for admin to get all subject in web app
router.get("/subject/filterType/:type", subject.getFilterTypeSubject);

//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterCredit/{credit}
//~ Use for admin to get all subject in web app
router.get("/subject/filterCredit/:credit", subject.getFilterCreditSubject);

//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects{subjectId}
//~ Use for user or admin to get once subject in mobile app or web app
router.get("/subject/:id", subject.getOnceSubject);
//---------------------------------------------------------------------//
//? Sec Collection


//---------------------------------------------------------------------//
//? Group Collection


//---------------------------------------------------------------------//
//? Work Collection


//---------------------------------------------------------------------//
//? News Collection
//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/
//~ Use for get all news data in mobile app and web app
router.get("/news/", news.getAllNews);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/{newsId}
//~ Use for get single news data in mobile app and web app
router.get("/news/:id", news.getOnceNews);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/{newsId}
//~ Use for get all news data with filter in mobile app and web app
router.get("/news/filter/:type", news.getTypeNews);

//---------------------------------------------------------------------//
module.exports = router;