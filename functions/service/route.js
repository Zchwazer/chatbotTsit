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
//---------------------------------------------------------------------//
//! User Collection
//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
//~ Use for get all user data in web app
router.get("/user" ,user.getAllUser);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/{userId}
//~ Use for get single user data in user mobile app or web app
router.get("/user/:id" ,user.getOnceUser);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
//~ Use for registration section in user mobile application
router.use("/user" ,user.addOnceUser);

//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/{userId}
//~ Use for admin change user level in web app
// router.put("/user/:user", user.updateOnceUser);
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
//---------------------------------------------------------------------//
module.exports = router;