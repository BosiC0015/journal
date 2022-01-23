export const SET_USER = 'SET_USER';
export const SET_DIARIES = 'SET_DIARIES';
export const SET_PLANS = 'SET_PLANS';
export const CLEAR_USER = 'CLEAR_USER';
export const CLEAR_DIARIES = 'CLEAR_DIARIES';
export const CLEAR_PLANS = 'CLEAR_PLANS';
export const GET_ERRORS = 'GET_ERRORS';

// Reducer for setting application states
const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USER: {
      const { user, isLoggedin } = action;
      return {
        ...state, user, isLoggedin
      };
    }
    case SET_DIARIES:
      return {
        ...state,
        diaries: action.diaries
      };
    case SET_PLANS:
      return {
        ...state,
        plans: action.plans
      };
    case CLEAR_USER: {
      const { user, isLoggedin } = action;
      return {
        ...state, user, isLoggedin
      };
    }
    case CLEAR_DIARIES:
      return {
        ...state,
        diaries: action.diaries
      };
    case CLEAR_PLANS:
      return {
        ...state,
        plans: action.plans
      };
    default:
      return state;
  }
};

export default dataReducer;