const router=require('express').Router()

const { enroll__course__controller,getEnrolledCourses__controller } = require('../controllers/enrollController')
const {requireLogin}=require('../middlewares/requireLogin')


  const { adminAuthentication } = require("../middlewares/authentication");
  

router.get("/enrolled", requireLogin, getEnrolledCourses__controller);


router.put('/',requireLogin,enroll__course__controller)

module.exports=router

