import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import courseReducer from "./course/courseReducer";
import enrolledCoursesReducer from "./course/enrolledCoursesReducer";

const rootReducer=combineReducers({
    auth: authReducer,
    course: courseReducer,
    enrollCourse: enrolledCoursesReducer,
})

export default rootReducer