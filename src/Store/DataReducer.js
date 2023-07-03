import { GetALlStudentsConst } from "./DataActionConst"

const initialState = {
    loader: false,
    allStudent: []
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



    }
    return state

}