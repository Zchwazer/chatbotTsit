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
//---------------------------------------------------------------------//
//! User Collection
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

//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/{userId}
//~ Use for admin change user level in web app
router.put("/user/:id", user.updateOnceUser);
//---------------------------------------------------------------------//
//! Student Collection
//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student
//~ Use for get all student data in web app
router.get("/student" ,student.getAllStudent);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student/{studentId}
//~ Use for get single student data in web app
router.get("/student/:id" ,student.getOnceStudent);
//---------------------------------------------------------------------//
//! Subject Collection
//---------------------------------------------------------------------//
//! News Collection
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