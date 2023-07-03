import { GetALlStudentsConst } from "./DataActionConst";
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
