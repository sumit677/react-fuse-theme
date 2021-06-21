import {combineReducers} from 'redux';
import contacts from './organization.reducer';
import addorganization from './addorganization.reducer';
import user from './user.reducer';

const reducer = combineReducers({
    contacts,
    user,
    addorganization
});

export default reducer;
