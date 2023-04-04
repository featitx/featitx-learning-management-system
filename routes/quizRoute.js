const router=require('express').Router()

const { quiz__controller,getQuiz__controller,get_One_Quiz_On_Id_controller,get_One_Quiz_On_Type_controller } = require('../controllers/quizController')
const {requireLogin}=require('../middlewares/requireLogin')

  

router.get("/quiz", getQuiz__controller);
//router.get("/quiz/:id", requireLogin, get_One_Quiz_On_Id_controller)
router.get("/quiz/:id/:type", requireLogin, get_One_Quiz_On_Id_controller)
router.get("/quiz/:type", requireLogin, get_One_Quiz_On_Type_controller)
router.post("/add-quiz", requireLogin, quiz__controller);


module.exports=router

