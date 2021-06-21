import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedContactIds: [],
    routeParams       : {},
    contactDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    searchscreenDisabled:false,
    addBtnFlagDisabled:false,
    editBtnFlagDisabled:true,
    deleteBtnFlagDisabled:true,
    viewBtnFlagDisabled:true,
    searchWidgetValues: [],
    showAddOrganizationSuccessMsg: false,
    showAddOrganizatioErrornMsg:false,
    selectedRowId:0,
    submitBtnDisableFlag:true
    
};

const contactsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CONTACTS:
        {
            return {
                ...state,
                // entities   : _.keyBy(action.payload, 'id'),
                entities   : _.keyBy(action.payload, 'siteId'),
                routeParams: action.routeParams
            };
        }
        case Actions.ENABLE_EDIT_SCREEN:
        {
            return {
                ...state,
                editBtnFlagDisabled:false,
                selectedRowId: action.data.siteId
            };
        }
        case Actions.ENABLE_SUBMIT_BTN:
        {
            return {
                ...state,
                submitBtnDisableFlag: action.data,
               
            };
        }
        
        case Actions.TOGGLE_IN_SELECTED_CONTACTS:
        {

            const contactId = action.contactId;

            let selectedContactIds = [...state.selectedContactIds];

            if ( selectedContactIds.find(id => id === contactId) !== undefined )
            {
                selectedContactIds = selectedContactIds.filter(id => id !== contactId);
            }
            else
            {
                selectedContactIds = [...selectedContactIds, contactId];
            }

            return {
                ...state,
                selectedContactIds: selectedContactIds
            };
        }
        case Actions.SELECT_ALL_CONTACTS:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedContactIds = arr.map(contact => contact.id);

            return {
                ...state,
                selectedContactIds: selectedContactIds
            };
        }
        case Actions.DESELECT_ALL_CONTACTS:
        {
            return {
                ...state,
                selectedContactIds: []
            };
        }
        case Actions.OPEN_NEW_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.ADD_SCREEN:
        {
            return {
                ...state,
                searchscreenDisabled:true
            };
        }
        default:
        {
            return state;
        }
    }
};

export default contactsReducer;
