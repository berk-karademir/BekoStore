import { SET_USER, CLEAR_USER } from '../actions/userActions';
import { SET_ROLES } from '../actions/clientActions';

const initialState = {
  user: null,
  roles: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null
      };
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer; 