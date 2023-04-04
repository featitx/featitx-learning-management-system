const {
  postCourse__controller,
  getCourses__controller,
  getOneCourse__controller,
  deleteCourse__Controller,
  updateCourseToPublish__controller,
  postMyEnrollCourse__controller
} = require("../controllers/courseController");
const { adminAuthentication } = require("../middlewares/authentication");
const { requireLogin } = require("../middlewares/requireLogin");

const router = require("express").Router();
const upload = require("../middlewares/multer");

router.post(
  "/post-course",
  requireLogin,
  adminAuthentication,
  upload.single("img"),
  postCourse__controller
);

router.post(
  "/myEnroll-course",
  requireLogin,
  //adminAuthentication,
  //upload.single("img"),
  postMyEnrollCourse__controller
);

router.patch(
  "/patch-course",
  requireLogin,
  //adminAuthentication,
  //upload.single("img"),
  updateCourseToPublish__controller
);

router.get("/get-courses", requireLogin, getCourses__controller);

router.get("/get-course/:courseId", requireLogin, getOneCourse__controller)

router.delete('/delete',requireLogin,adminAuthentication,deleteCourse__Controller)

module.exports = router;
