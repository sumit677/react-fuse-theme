import {combineReducers} from 'redux';
import questionnaire from './questionnaire.reducer';

const reducer = combineReducers({
    questionnaire,
});

export default reducer;
