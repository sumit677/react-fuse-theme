import axios from 'axios';

export const SEND_CODE_SUCCESS = 'SEND_CODE_SUCCESS';
export const SEND_CODE_ERROR = 'SEND_CODE_ERROR';

export const VERIFY_CODE_SUCCESS = 'VERIFY_CODE_SUCCESS';
export const VERIFY_CODE_ERROR = 'VERIFY_CODE_ERROR';

export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const SUBMIT_ERROR = 'SUBMIT_ERROR';

export const RESET = 'RESET';



export const sendCodeEvent=(userName, values)=>{
    return (dispatch) =>
    axios.get('http://192.168.5.119:8010/EDM/forgetuser/sendCode', {
                params: {
                    userName:userName
                }
            })
            .then(response => {
                    return dispatch({
                        type: SEND_CODE_SUCCESS,
                        payload: response,
                        values: values
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : SEND_CODE_ERROR,
                    payload: error,
                    values: values
                });
            });
}

// export const handleSuccessClose=()=> {
//     return (dispatch) => {
//         dispatch({
//           type: SNACKBAR_FALSE
//         })}
//   }


export const verifyCodeEvent = (userName, code, values) =>{
    return (dispatch) =>
    axios.get('http://192.168.5.119:8010/EDM/forgetuser/verifyCode', {
                params: {
                    userName:userName,
                    code:code,
                }
            })
            .then(response => {
                    return dispatch({
                        type: VERIFY_CODE_SUCCESS,
                        payload: response,
                        values:values
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : VERIFY_CODE_ERROR,
                    payload: error,
                    values:values
                });
            });
}

export const submitEvent = (userName, values) =>{

    return (dispatch) =>
    axios.get('http://192.168.5.119:8010/EDM/forgetuser/submit', {
                params: {
                    userName:userName,
                    code:values.code,
                    password:values.newPassword,
                    esign:values.newEsign,
                    forgetType:values.forgetType,
                    securityAnswer:values.secutityAnswer,
                    resetEsign:values.checkedEsignReset,
                    resetPassword:values.checkedPasswordReset,
                }
            })
            .then(response => {
                    return dispatch({
                        type: SUBMIT_SUCCESS,
                        payload: response,
                        values : values
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type : SUBMIT_ERROR,
                    payload: error,
                    values : values
                });
            });
}

export const resetEvent = (values) =>{
    return(dispatch) =>{
        dispatch({
            type : RESET,
            values : values
        });
    }
}