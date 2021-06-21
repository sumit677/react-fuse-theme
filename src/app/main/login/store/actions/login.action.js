import axios from 'axios';


export const AUTHENTICATE_USER_DATA = 'AUTHENTICATE USER DATA';



export function customFunForChecking({email, password})
{
    
    const request = axios.get(`http://192.168.5.119:8080/loginAuthenticate/authenticateCredentials`, {
        params: {
            userName: email,
          password:password
        }
      });

    const dataPromise =  request.then((response) => response.data );
    return dataPromise;
    // return (dispatch) =>
    // request.then((response) =>
    //     dispatch({
    //         type   : AUTHENTICATE_USER_DATA,
    //         payload: response.data
    //     })
    // );

     

    }