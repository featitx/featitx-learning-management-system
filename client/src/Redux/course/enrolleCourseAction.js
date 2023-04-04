import { GET__COURSES,GET_ENROLLED_COURSES_LIST } from "./courseTypes";
import Axios from "axios";



export const getEnrolledCourses = (enrolledCourseInfo) => {
  return {
    type: GET_ENROLLED_COURSES_LIST,
    payload: enrolledCourseInfo,
  };
};



export const fetchEnrolledCourseInfo = () => {
  return (dispatch) => {
    Axios.get("/enroll-course/enrolled", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((result) => {
        //console.log(result.data)
        dispatch(getEnrolledCourses(result.data.courses));
        //console.log(result.data.courses)
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(courseData)
  };
};
