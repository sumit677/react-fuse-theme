import axios from 'axios';
import {getUserData} from 'app/main/apps/contacts/store/actions/user.actions';

export const GET_CONTACTS = '[CONTACTS APP] GET CONTACTS';
export const SET_SEARCH_TEXT = '[CONTACTS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_CONTACTS = '[CONTACTS APP] TOGGLE IN SELECTED CONTACTS';
export const SELECT_ALL_CONTACTS = '[CONTACTS APP] SELECT ALL CONTACTS';
export const DESELECT_ALL_CONTACTS = '[CONTACTS APP] DESELECT ALL CONTACTS';
export const OPEN_NEW_CONTACT_DIALOG = '[CONTACTS APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[CONTACTS APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[CONTACTS APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[CONTACTS APP] CLOSE EDIT CONTACT DIALOG';
export const ADD_CONTACT = '[CONTACTS APP] ADD CONTACT';
export const UPDATE_CONTACT = '[CONTACTS APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[CONTACTS APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[CONTACTS APP] REMOVE CONTACTS';
export const TOGGLE_STARRED_CONTACT = '[CONTACTS APP] TOGGLE STARRED CONTACT';
export const TOGGLE_STARRED_CONTACTS = '[CONTACTS APP] TOGGLE STARRED CONTACTS';
export const SET_CONTACTS_STARRED = '[CONTACTS APP] SET CONTACTS STARRED ';
export const ADD_SCREEN = '[ORGANIZATION APP] ADD_SCREEN';
export const ENABLE_EDIT_SCREEN = '[ORGANIZATION APP] ENABLE_EDIT_SCREEN';
export const  ENABLE_SUBMIT_BTN= '[ENABLE SUBMIT BTN] ENABLE_SUBMIT_BTN';
export function getContacts(routeParams)
{
    const request = axios.get('/api/contacts-app/contacts', {
        params: routeParams
    });

    return (dispatch) =>   request.then((response) => {
       
        if(response.data==null){
               dispatch({
                type   : GET_CONTACTS,
                payload: response.data,
                routeParams
            })
        }else{
                dispatch({
                type   : GET_CONTACTS,
                payload: response.data,
                routeParams
            })
        }
            
    });
  
}

export function getOrganizations(routeParams)
{
    let arr=[];
    // const request = axios.get('http://192.168.5.119:8080/searchOrganization/', {
    //     params: routeParams
    // });
    const request = axios.get('http://192.168.5.119:8010/EDM/site/all', {
        params: routeParams
    });

    return (dispatch) =>   request.then((response) => {
        arr=response.data;
        response.data=arr;
        if(response.data==null){
               dispatch({
                type   : GET_CONTACTS,
                payload: response.data,
                routeParams
            })
        }else{
                dispatch({
                type   : GET_CONTACTS,
                payload: response.data,
                routeParams
            })
        }
            
    });
  
        
}   

export function getOrganizationsSearchBtnClick(values)
{
    console.log("getOrganizationsSearchBtnClickvalues"+ values);
    let arr=[];
    // const request = axios.get('http://192.168.5.119:8080/searchOrganizationc', {
    //     params: {siteName: values.organizationName}
    // });
    const request = axios.get('http://192.168.5.119:8010/EDM/site/all', {
        params: {siteName: values.organizationName , siteCode: values.organizationCode, siteType: values.organizationType,
        city : values.city, siteStatus : values.organizationStatus, state:values.state }
    });

    return (dispatch) =>   request.then((response) => {
        arr=response.data;
        response.data=arr;
        if(response.data==null){
               dispatch({
                type   : GET_CONTACTS,
                payload: response.data,
                
            })
        }else{
                dispatch({
                type   : GET_CONTACTS,
                payload: response.data,
                
            })
        }
            
    });
  
        
}   


export function getCustomContacts(routeParams)
{
    
    const request = axios.get('/api/contacts-app/customContacts', {
        params: routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CONTACTS,
                payload: response.data,
                routeParams
            })
        );
}



export function enableEditZone(data)
{
    return {
        type      : ENABLE_EDIT_SCREEN,
        data
    }
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedContacts(contactId)
{
    return {
        type: TOGGLE_IN_SELECTED_CONTACTS,
        contactId
    }
}

export function selectAllContacts()
{
    return {
        type: SELECT_ALL_CONTACTS
    }
}

export function deSelectAllContacts()
{
    return {
        type: DESELECT_ALL_CONTACTS
    }
}

export function openNewContactDialog()
{
    return {
        type: OPEN_NEW_CONTACT_DIALOG
    }
}

export function closeNewContactDialog()
{
    return {
        type: CLOSE_NEW_CONTACT_DIALOG
    }
}

export function openEditContactDialog(data)
{
    return {
        type: OPEN_EDIT_CONTACT_DIALOG,
        data
    }
}

export function closeEditContactDialog()
{
    return {
        type: CLOSE_EDIT_CONTACT_DIALOG
    }
}

export function addContact(newContact)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/add-contact', {
            newContact
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function updateContact(contact)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/update-contact', {
            contact
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function removeContact(contactId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/remove-contact', {
            contactId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}


export function removeContacts(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/remove-contacts', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACTS
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function toggleStarredContact(contactId)
{
    return (dispatch, getState) => {
        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/toggle-starred-contact', {
            contactId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CONTACT
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function toggleStarredContacts(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/toggle-starred-contacts', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CONTACTS
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function setContactsStarred(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/set-contacts-starred', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_CONTACTS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function setContactsUnstarred(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/set-contacts-unstarred', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_CONTACTS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}


export function enableSubmitBtn(data)
{

    // return (dispatch) =>
    //     request.then((response) =>
    //         dispatch({
    //             type   : SITE_INFO,
    //             payload: response.data
    //         })
    //     );
    
    return (dispatch) => {
        dispatch({   type      : ENABLE_SUBMIT_BTN,
        data })
    }
}
