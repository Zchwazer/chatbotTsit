//-- About comment color definition
//! Red     : Main Topic each section
//? Blue    : Sub Topic each section
//# Yellow  : Example endpoint 
//* Green   : Work of this section
//~ Pink    : Explain function
//---------------------------------------------------------------------//
const router = require('express').Router();
const userController = require('./userController');
const stuController = require('./stuController');

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
//~ Use for get all user data in web app
router.get("/user" ,userController.getAllUser);

//# GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/{userId}
//~ Use for get single user data in user mobile app or web app
router.get("/user/:id" ,userController.getOnceUser);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
//~ Use for registration section in user mobile application
router.use("/user" ,userController.addOnceUser);

//# Use => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/{userId}
//~ Use for admin change user level in web app
// router.put("/user/:user", controller.updateOnceUser);

module.exports = router;