import { GET_ENROLLED_COURSES_LIST } from "./courseTypes"

const init={
    courseInfo:[],
    enrolledCourseInfo: false,
    
}


const enrolledCourseReducer=(state=init,action)=>{
    
    switch(action.type){
        case GET_ENROLLED_COURSES_LIST: return{
            ...state,
            enrolledCourseInfo: action.payload
        }

        default : return state
    }
}

export default enrolledCourseReducer