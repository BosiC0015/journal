export const SET_USER = 'SET_USER';
export const GET_ERRORS = 'GET_ERRORS';

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: action.isLoggedin
      };
    default:
      return state;
  }
};

export default dataReducer;