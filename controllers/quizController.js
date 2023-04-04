const QuizModel=require('../model/QuizModel')

module.exports.quiz__controller = async (req, res, next) => {
    
    try {
        console.log(req);
        const quizl = req.body;
        console.log(quizl); // should log the correct request body
        const { quizDesc, questions } = req.body;
    

        //const requestBodyString = JSON.stringify(req.body);
        //console.log(requestBodyString);
        
        if ( !quizDesc) {
          return res.status(400).json({
            error: "Please Provide All Information",
          });
        }
    
    
     // Create a new quiz document using the QuizModel
     const quiz = new QuizModel({
        quizDesc,
        questions
    });
    quiz.save()
          .then((result) => {
            //console.log(result)
            return res.status(200).json({
              result,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json({
              error: "Something went wrong",
            });
          });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
};


module.exports.getQuiz__controller = async (req, res, next) => {
    try {
      const courses = await QuizModel.find();
      return res.status(200).json({
        courses,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  };

  
module.exports.get_One_Quiz_On_Id_controller = async (req, res, next) => {
    try {
        console.log("req.params",req.params)
        const { id,type } = req.params;
        console.log(id);
        const quiz = await QuizModel.findOne({ _id: id,teacherType:type});
        return res.status(200).json({
          quiz,
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      
  };

  module.exports.get_One_Quiz_On_Type_controller = async (req, res, next) => {
    try {
        console.log("req.params",req.params)
        const { type } = req.params;
        //console.log(id);
        const quiz = await QuizModel.find({ teacherType:type});
        return res.status(200).json({
          quiz,
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      
  };

