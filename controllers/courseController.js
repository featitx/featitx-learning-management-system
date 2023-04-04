const CourseModel = require("../model/CourseModel");
const EnrolledCourseModel = require("../model/EnrolledCourseModel");
const cloudinary=require('../middlewares/cloudinary')

const { Types } = require('mongoose');


module.exports.updateCourseToPublish__controller=async (req,res,next)=>{
  try {
  
    console.log(req);
    CourseModel.findByIdAndUpdate(req.body.courseId, { isPublished: 1 }).then(updatedDoc => {
      console.log(updatedDoc);
      return res.status(200).json({
        updatedDoc
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error occurred"
    });
  }
};

module.exports.postCourse__controller = async (req, res, next) => {
  try {
    const { courseDescription, courseName,teacherType } = req.body;

    if (!courseDescription || !courseName || !req.file) {
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }

    const pic=await cloudinary.uploader.upload(req.file.path)
    //console.log(pic.secure_url)

    //const url = req.protocol + "://" + req.get("host");
    console.log(req)

    const course = new CourseModel({
      courseDescription,
      courseName,
      courseThumbnail: pic.secure_url,
      //createdAt: req.user._id,
      teacherType,
    });
    course
      .save()
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

module.exports.postMyEnrollCourse__controller = async (req, res, next) => {
  try {
    console.log(req);
    const { courseId,courseDescription, courseName,UserId } = req.body;

    if (!UserId || !courseId) {
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }

    const course = new EnrolledCourseModel({
      courseId,
      courseDescription,
      courseName,
      //createdAt: req.user._id,
      userId:UserId,
    });
    course
      .save()
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

module.exports.getCourses__controller = async (req, res, next) => {
  try {
    const courses = await CourseModel.find();
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



module.exports.getOneCourse__controller = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    console.log(courseId);
    const course = await CourseModel.findOne({ _id: courseId });
    return res.status(200).json({
      course,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.deleteCourse__Controller = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    console.log(courseId)
    const course = await CourseModel.findOneAndDelete({ _id: courseId });
    return res.status(200).json({
      course,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
