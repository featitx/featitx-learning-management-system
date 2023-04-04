const mongoose = require("mongoose");

const EnrolledCourseSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const EnrolledCourseModel = mongoose.model("EnrolledCourse", EnrolledCourseSchema);

module.exports = EnrolledCourseModel;
