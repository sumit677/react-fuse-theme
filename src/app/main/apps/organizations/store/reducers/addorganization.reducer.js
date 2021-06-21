import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   
    addEditOrganizationState: {
        siteName:'',
    siteCode:'',
    siteType: 'OTHER',
    city:'',
    state:'',
    siteStatus: 'ACTIVE',
    otherState:'',
    zipcode:'',
    country:'',
    workPhone:'',
    fax :'',
    email:'',
    address1:'',
    address2:''
    },
    showAddOrganizationSuccessMsg: false,
    showAddOrganizatioErrornMsg:false,
    
    
};

const addorganizationreducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.ADD_ORGANIZATION:
        {
            return {
                ...state,
                showAddOrganizationSuccessMsg : action.payload,
                showAddOrganizatioErrornMsg: false,
               
            };
        }  case Actions.ERROR_IN_ADD_ORGANIZATION:
        {
            return {
                ...state,
                showAddOrganizationSuccessMsg : false,
                showAddOrganizatioErrornMsg: true,
            };
        }
        case Actions.SITE_INFO:
        {
            return {
                ...state,
                addEditOrganizationState: action.payload,
               
            };
        }
        
        
        default:
        {
            return state;
        }
    }
};

export default addorganizationreducer;
