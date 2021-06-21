import axios from 'axios';



export const ERROR_IN_ADD_ORGANIZATION = '[ERROR IN ADD_ORGANIZATION] ERROR IN ADD ORGANIZATION ';
export const ADD_ORGANIZATION = '[ADD ORGANIZATION] ADD_ORGANIZATION';
export const  SITE_INFO= '[SITE_INFO] SITE_INFO';


export function addOrganization(jsonObj)
{
    // const request = axios.get('http://192.168.5.119:8080/addOrganization', {
    //     params: jsonObj
    // });
    const request = axios.get('http://192.168.5.119:8010/EDM/site/save', {
        params: jsonObj
    });
   

    return (dispatch) =>   request.then((response) => {
       
        if(response.data==null || response.data==false){
               dispatch({
                type   : ERROR_IN_ADD_ORGANIZATION,
                payload: response.data,
                
            })
        }else{
                dispatch({
                type   : ADD_ORGANIZATION,
                payload: response.data,
                
            })
        }
            
    });
  
}


export function getSiteInfo(params)
{
    //const request = axios.get('http://192.168.5.119:8080/getSiteInfo', {params});
   const request = axios.get('http://192.168.5.119:8010/EDM/site/getSiteInfo', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SITE_INFO,
                payload: response.data
            })
        );
}


