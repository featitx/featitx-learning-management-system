const CourseEnrollModel=require('../model/CourseEnrollModel')
const EnrolledCourseModel = require('../model/EnrolledCourseModel')

module.exports.enroll__course__controller = async (req, res, next) => {
  try {
    const {courseId} = req.body;
    const enroll = await CourseEnrollModel.findOne({
      enrolledCourses: courseId,
    });
    if (enroll) {
      console.log(enroll)
        
    } else {
      const enroll_course=new CourseEnrollModel({
        userId: req.user._id,
        enrolledCourses: courseId
      })
    enroll_course.save()
    .then(result=>{
      return res.status(200).json({
        text:"Course enrolled",
        result
      })
    })
    .catch(err=>{
      console.log(err)
    })
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.getEnrolledCourses__controller = async (req, res, next) => {
  try {
    const courses = await EnrolledCourseModel.find();
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
