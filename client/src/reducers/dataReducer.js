export const SET_USER = 'SET_USER';
export const SET_DIARIES = 'SET_DIARIES';
export const SET_PLANS = 'SET_PLANS';
export const CLEAR_USER = 'CLEAR_USER';
export const GET_ERRORS = 'GET_ERRORS';

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
      const { user, diaries, plans, isLoggedin, weekendsVisible } = action;
      return {
        ...state, user, diaries, plans, isLoggedin, weekendsVisible
      };
    }
    default:
      return state;
  }
};

export default dataReducer;