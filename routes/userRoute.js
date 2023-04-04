const {
  getStudent__controller,
  getTeacher__controller,
  deleteTeacher__controller,
  getUsersToAuthorize__controller,
  updateUsersToAuthorize__controller
} = require("../controllers/userController");
const { adminAuthentication } = require("../middlewares/authentication");
const { requireLogin } = require("../middlewares/requireLogin");

const router = require("express").Router();

router.get(
  "/student",
  requireLogin,
  adminAuthentication,
  getStudent__controller
);

router.get(
  "/teacher",
  requireLogin,
  adminAuthentication,
  getTeacher__controller
);

router.get(
  "/delete-teacher",
  requireLogin,
  adminAuthentication,
  deleteTeacher__controller
);


router.get(
  "/authorizeUsers",
  requireLogin,
  adminAuthentication,
  getUsersToAuthorize__controller
);

router.patch(
  "/authorizeUsersToUpdate",
  requireLogin,
  adminAuthentication,
  updateUsersToAuthorize__controller
);

module.exports = router;
