import * as Actions from '../actions';

export const initialState = {
    userName : 'valleyadmin',
    response : [],
    error : "",
    progressStatus: 'inProgress',
    radioButtonFlag: true,
    verifyDisableFlag: true,
    submitDisableFlag:true,
    securityQuestion: 'admin',
    sendCodeLabel: 'SEND CODE',
    disableFLag: false,
    sendDisableFlag: true,
    successSnackbar:false,
    errorSnackbar:false,
    
};


const forgetScreenReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SEND_CODE_SUCCESS:
        {
            closePreviousSnackBars(action.values);
            switch(action.payload.data.resultStatus){
                case 'SUCCESS':{
                    action.values.successMessage=action.values.messages.sendMailSuccessMessage;
                    action.values.successSnackbar=true;
                    action.values.disableFLag= true;
                    setTimeout(()=>{
                        action.values.disableFLag=false;
                        action.values.successSnackbar=false;
                    }, 1000);
                    return{
                        ...state,
                        radioButtonFlag: false,
                        sendDisableFlag: false,
                        sendCodeLabel: 'RESEND CODE',
                        successSnackbar: true,
                        response: action.payload.data
                    };
                }
                default:
                    action.values.errorMessage=action.values.messages.sendMailErrorMessage;
                    action.values.errorSnackbar=true;
                    return{
                        ...state,
                        error:action.payload
                    };
            }
        }
        case Actions.SEND_CODE_ERROR:
        {
            closePreviousSnackBars(action.values);
            action.values.errorMessage=action.values.messages.sendMailErrorMessage;
            action.values.errorSnackbar=true;
            return{
                ...state,
                error:action.payload
            };
        }
        case Actions.VERIFY_CODE_SUCCESS:
        {
            
            closePreviousSnackBars(action.values);
            switch(action.payload.data.resultStatus){
                case 'CODE_VERIFIED':{
                    action.values.successMessage=action.values.messages.verifyCodeSuccessMessage;
                    action.values.successSnackbar=true;
                    action.values.disableFLag=true;
                    return {
                        ...state,
                        sendDisableFlag: true,
                        verifyDisableFlag: false,
                        submitDisableFlag: false
                    };
                }
                default:{
                    action.values.successSnackbar=false;
                    action.values.errorMessage=action.values.messages.verifyCodeErrorMessage;
                    action.values.errorSnackbar=true;
                    return {
                        ...state,
                        error:action.payload
                    };
                }
            }
            
        }
        case Actions.VERIFY_CODE_ERROR:
        {
            closePreviousSnackBars(action.values);
            action.values.errorMessage=action.values.messages.verifyCodeErrorMessage;
            action.values.errorSnackbar=true;
            return {
                ...state,
                error:action.payload
            };
        }
        case Actions.RESET:
        {
            reset(action.values);
            return {
                ...state,
                radioButtonFlag:true,
                verifyDisableFlag:true,
                submitDisableFlag: true,
                sendCodeLabel:'SEND CODE',
            }
           
        }
        case Actions.SUBMIT_SUCCESS:
        {
            reset(action.values);
            switch(action.payload.data.resultStatus){
                case 'PASSWORD_ESIGN_CHANGED_SUCCESSFULLY':{
                    action.values.successMessage=action.values.messages.submitCodeSuccess;
                    action.values.successSnackbar=true;
                    
                    return {
                        ...state,
                        radioButtonFlag:true,
                        verifyDisableFlag:true,
                        submitDisableFlag: false,
                        sendCodeLabel:'SEND CODE',
                    }
                }
                case 'CREDENTIALS_CHANGED_MAIL_SENT_SUCCESSFULLY':{
                    action.values.successMessage=action.values.messages.submitAnswerSuccess;
                    action.values.successSnackbar=true;
                    
                    return {
                        ...state,
                        radioButtonFlag:true,
                        verifyDisableFlag:true,
                        submitDisableFlag: false,
                        sendCodeLabel:'SEND CODE',
                    }
                }
                case 'ANSWER_NOT_VERIFIED':{
                    action.values.errorMessage=action.values.messages.submitAnswerNotVerified;
                    action.values.errorSnackbar=true;
                    return {...state};
                }
                default:{
                    action.values.errorMessage=action.values.messages.submitCodeError;
                    action.values.errorSnackbar=true;
                    
                    return {...state};
                }
            }
        }
        case Actions.SUBMIT_ERROR:
        {
            reset(action.values);
            action.values.errorMessage=action.values.messages.submitCodeError;
            action.values.errorSnackbar=true;

            
            return {
                ...state,
                error:action.payload
            };
        }
        default:
        {
            return {...state};
        }
    }
}

function closePreviousSnackBars(values){
    values.successMessage='';
    values.errorMessage='';
    values.successSnackbar=false;
    values.errorSnackbar=false;
}
function reset(values){
    closePreviousSnackBars(values);
    values.confirmNeweSign='';
    values.newEsign='';
    values.confirmNewPassword='';
    values.newPassword='';
    values.code='';
    values.checkedPasswordReset=false;
    values.checkedEsignReset=false;

    values.secutityAnswer='';
    values.disableFLag=false;
    values.sendDisableFlag=true;
    
}
export default forgetScreenReducer;