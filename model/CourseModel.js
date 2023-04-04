const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },

    courseThumbnail: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    teacherType:{
      type: String,
      required: true,
    },
    isPublished:{
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;
