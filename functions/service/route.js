//-- About comment color definition
//! Red     : DELETE
//? Blue    : PUT
//# Yellow  : POST
//* Green   : GET
//~ Pink    : TOPIC
//---------------------------------------------------------------------//
//~ Initialize configuration
const router = require("express").Router();

//---------------------------------------------------------------------//
//~ Initialize controller
const user = require("./controller/user");
const student = require("./controller/student");
const news = require("./controller/news");
const subject = require("./controller/subject");
const sec = require("./controller/sec");
const teacher = require("./controller/teacher");
const group = require("./controller/group");
const work = require("./controller/work");
const admin = require("./controller/admin");

//---------------------------------------------------------------------//
//~ User Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
router.get("/user", user.getAllUser);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/{limitNumber}
router.get("/user/:limit", user.getLimitUser);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/filterId/{userId}
router.get("/user/filterId/:id", user.getOnceUser);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/filterEm/{userEmail}
router.get("/user/filterEm/:email", user.getOnceEmail);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/user
router.post("/user", user.addOnceUser);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updateLv/{userId}
router.put("/user/updateLv/:id", user.updateOnceUser);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updatePs/{userId}
router.put("/user/updatePs/:id", user.updateUserPassword);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updateEm/{userId}
router.put("/user/updateEm/:id", user.updateUserEmail);

//---------------------------------------------------------------------//
//~ Student Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student
router.get("/student", student.getAllStudent);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/student/filterId/{studentId}
router.get("/student/filterId/:id", student.getOnceStudent);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/student/
router.post("/student", student.addOnceStudent);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/student/updateDt/{studentId}
router.put("/student/updateDt/:id", student.updateStudentData);

//---------------------------------------------------------------------//
//~ News Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news
router.get("/news", news.getAllNews);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/filterId/{newsId}
router.get("/news/filterId/:id", news.getOnceNews);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/filterTp/{type}
router.get("/news/filterTp/:type", news.getFilterTypeNews);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/filterSt/{status}
router.get("/news/filterSt/:status", news.getAllNewsShow);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/
router.post("/news", news.addOnceNews);

//? PUT =>  https://us-central1-newagent-47c20.cloudfunctions.net/api/news/updateDt/{newsId}
router.put("/news/updateDt", news.updateOnceNews);

//! PUT =>  https://us-central1-newagent-47c20.cloudfunctions.net/api/news/updateSt/{newsId} (SOFT DELETE)
router.put("/news/updateSt", news.updateNewsStatus);

//! DELETE => https://us-central1-newagent-47c20.cloudfunctions.net/api/news/delete/{newsId}
router.delete("/news/delete/:id", news.deleteOnceNews);

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
router.get("/subject/filterCr/:credit/:limit",subject.getLimitFilterCreditSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterSt/{status}
router.get("/subject/filterSt/:status", subject.getFilterStatusSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterSt/{status}/{limitNumber}
router.get("/subject/filterSt/:status/:limit",subject.getLimitFilterStatusSubject);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/subjects/filterId/{subjectId}
router.get("/subject/filterId/:id", subject.getOnceSubject);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject
router.post("/subject", subject.addOnceSubject);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/updateDt/{subjectId}
router.put("/subject/updateDt/:id", subject.updateDataSubject);

//! PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/updateSt/{subjectId} (SOFT DELETE)
router.put("/subject/updateSt/:id", subject.updateStatusSubject);

//! DELETE => https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/delete/{subjectId}
router.delete("/subject/delete/:id", subject.deleteOnceSubject);

//---------------------------------------------------------------------//
//~ Teacher Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/teacher
router.get("/teacher", teacher.getAllTeacher);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/teacher/{limitNumber}
router.get("/teacher/:limit", teacher.getAllLimitTeacher);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/teacher
router.post("/teacher", teacher.addOnceTeacher);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/teacher/updateDt/{teacherId}
router.put("/teacher/updateDt/:id", teacher.updateOnceTeacher)

//---------------------------------------------------------------------//
//~ Sec Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec
router.get("/sec", sec.getAllSection);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/{limitNumber}
router.get("/sec/:limit", sec.getLimitSec);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/filterId/{secId}
router.get("/sec/filterId/:id", sec.getOnceSection);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/filterSj/{subjectId}
router.get("/sec/filterSj/:id", sec.getFilterSubjectSection);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/student/{secId}
router.get("/sec/student/:id", sec.getAllStudentSection);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/
router.post("/sec", sec.addOnceSection);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/student/{secId}
router.post("/sec/student/:id", sec.addStudentSec);

//! PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/updateSt/{secId} (SOFT DELETE)
router.put("/sec/updateSt/:id", sec.updateSectionStatus);

//---------------------------------------------------------------------//
//~ Group Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/group
router.get("/group", group.getAllDataGroup);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/group/{limitNumber}
router.get("/group/:limit", group.getLimitGroup);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/group/filterId/{groupId}
router.get("/group/filterId/:id", group.getOnceGroup);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/group/filterId/{groupId}/student
router.get("/group/filterId/:id/student", group.getAllStudentGroup);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/group/filterId/{groupId}/student/{studentId}
router.get("/group/filterId/:id/student/:student", group.getOnceStudentGroup);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/group/filterId/{groupId}/teacher
router.get("/group/filterId/:id/teacher", group.getAllTeacherGroup);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/group/filterId/{groupId}/teacher/{studentId}
router.get("/group/filterId/:id/teacher/:teacher", group.getOnceTeacherGroup);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/group/filterStudentId/{studentId}
router.get("/group/filterStudentId/:id", group.getAllGroupOfStudent);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/group
router.post("/group", group.addOnceGroup);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/group/student
router.post("/group/student", group.addStudentGroup);

//! DELETE => https://us-central1-newagent-47c20.cloudfunctions.net/api/group/delete/{groupId}
router.delete("/group/delete/:id", group.deleteOnceGroup)

//---------------------------------------------------------------------//
//~ Work Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/work
router.get("/work", work.getAllWork);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/work/{limitNumber}
router.get("/work/:limit", work.getLimitWork);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/work/filterGr/{groupId}
router.get("/work/filterGr/:group", work.getAllWorkGroup);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/work/filterId/{workId}
router.get("/work/filterId/:id", work.getOnceWork);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/work/filterNm/{userId}
router.get("/work/filterNm/:id", work.getAllNumberWorks);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/work
router.post("/work", work.addOnceWork);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/work/updateDt/{workId}
router.put("/work/updateDt/:id", work.updateOnceWork);

//! DELETE => https://us-central1-newagent-47c20.cloudfunctions.net/api/work/delete/{workId}
router.delete("/work/delete/:id", work.deleteOnceWorks);

//---------------------------------------------------------------------//
//~ Administrator Collection
//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/admin
router.get("/admin", admin.getAllAdmin);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/admin/{limitNumber}
router.get("/admin/:limit", admin.getLimitAdmin);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/admin/filterId/{adminId}
router.get("/admin/filterId/:id", admin.getOnceAdmin);

//* GET => https://us-central1-newagent-47c20.cloudfunctions.net/api/admin/filterEm/{adminEmail}
router.get("/admin/filterEm/:email", admin.getOnceAdminEmail);

//# POST => https://us-central1-newagent-47c20.cloudfunctions.net/api/admin
router.post("/admin", admin.addOnceAdmin);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/admin/updatePs/{adminId}
router.put("/admin/updatePs/:id", admin.updateAdminPassword);

//? PUT => https://us-central1-newagent-47c20.cloudfunctions.net/api/admin/updateEm/{adminId}
router.put("/admin/updateEm/:id", admin.updateAdminPassword);

//---------------------------------------------------------------------//
module.exports = router;
