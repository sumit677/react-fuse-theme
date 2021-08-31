import * as Actions from "../actions";

const initialState = {
  formFieldData: "",
};

const questionnaireReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_FORM_DATA: {
      return {
        formFieldData: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default questionnaireReducer;
