import { GetALlStudentsConst, GetALlStudentsByIdConst, SelectQuizStudentActionConst } from "./DataActionConst";
import { BaseUrl } from "../Constants/BaseUrl"
export const GetALlStudents = () => {
    return async dispatch => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BaseUrl}student/api/allStudents`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    dispatch({
                        type: GetALlStudentsConst.GET_ALL_STUDENT,
                        students: result.data
                    })
                } else {
                    alert(result?.message)
                }
            })
            .catch(error => console.log('error', error));
    };
};


export const GetALlStudentsByIdAction = (list) => {
    return async dispatch => {
        dispatch({
            type: GetALlStudentsByIdConst.GET_ALL_STUDENT_BY_ID,
            students: list
        })
    };
};



export const SelectQuizStudentAction = (id) => {
    console.log(id,"studentIdstudentIdstudentId")
    return async dispatch => {
        dispatch({
            type: SelectQuizStudentActionConst.SELECT_UNSELECT_QUIZ_STUDENT,
            studentId: id
        })
    };
};
