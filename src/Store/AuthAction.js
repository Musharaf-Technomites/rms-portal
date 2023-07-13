import { BaseUrl } from "../Constants/BaseUrl";
import { LoginActionConst, LogOutActionConst, CurrentSideBaseStateActionConst } from "./AuthActionConst"
export const UserLoginAction = info => {
    return async dispatch => {
        dispatch({
            type: LoginActionConst.USER_LOGIN_REQUEST,

        })
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": info?.email,
            "password": info?.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}admin/auth/api/signIn`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    dispatch({
                        type: LoginActionConst.USER_LOGIN_SUCC,
                        userSuccessData: result
                    })
                    localStorage.setItem('userSuccData', JSON.stringify(result));
                } else {
                    dispatch({
                        type: LoginActionConst.USER_LOGIN_FAIL,
                        userErrotData: result
                    })
                    alert(result?.message)
                }
            })
            .catch(error => console.log('error', error));
    };
};


export const UserLogoutAction = info => {
    return async dispatch => {
        dispatch({
            type: LogOutActionConst.LOGOUT_ACTION_CONST,

        })
    };
};


export const CurrentSideBaseStateAction = state => {
    return async dispatch => {
        dispatch({
            type: CurrentSideBaseStateActionConst.CURRENT_SIDE_BAR_STATUS,
            state: state

        })
    };
};
