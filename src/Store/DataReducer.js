import { GetALlStudentsConst, GetALlStudentsByIdConst, SelectQuizStudentActionConst } from "./DataActionConst"

const initialState = {
    loader: false,
    allStudent: [],
    allStudentByClassId: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case GetALlStudentsConst.GET_ALL_STUDENT:
            state = {
                ...state,
                loader: true,
                allStudent: action.students
            }
            break


        case GetALlStudentsByIdConst.GET_ALL_STUDENT_BY_ID:
            state = {
                ...state,
                loader: true,
                allStudentByClassId: action.students
            }
            break

        case SelectQuizStudentActionConst.SELECT_UNSELECT_QUIZ_STUDENT:

            let studentLIst = state?.allStudentByClassId
            let studentId = action?.studentId
            if (studentLIst) {
                for (let i = 0; i < studentLIst.length; i++) {
                    if (studentLIst[i]._id === studentId) {
                        studentLIst[i].isSelected = !studentLIst[i].isSelected

                    }
                    return
                }

            }


            state = {
                ...state,

                allStudentByClassId: studentLIst
            }
            break



    }
    return state

}