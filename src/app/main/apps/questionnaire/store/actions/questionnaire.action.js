import axios from 'axios';

export const GET_FORM_DATA = 'GET_FORM_DATA';

export function getFormData()
{
    const request = axios.get('http://192.168.5.221:8010/EDM/FormFields/getFormFields', {
        params:{formId: '4'}  
    });

    return (dispatch) =>   request.then((response) => {
        if(response.data==null){
               dispatch({
                type   : GET_FORM_DATA
            })
        }else{
                dispatch({
                    type   : GET_FORM_DATA,
                    payload: response.data,
            })
        }
            
    });
}