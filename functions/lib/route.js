const router = require('express').Router();
const controller = require('./controller');

router.get("/user" , controller.getAllUser);
router.get("/user/:id" , controller.getOnceUser);
// router.post("/user" , controller.addOnceUser);
// router.put("/user/:user", controller.updateOnceUser);

module.exports = router;