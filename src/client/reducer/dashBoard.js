import { ENABLE_DISABLE_SLIDE_MENU, SET_ERROR_MESSAGE } from '../constants';

const initialState = {
  menuOpen: false,
  apiError: false,
};

const toggleSlideMenu = state => ({ ...state, menuOpen: !state.menuOpen });
const setErrorMessage = (state, { value }) => ({ ...state, apiError: value });

const dashBoard = (state = initialState, action) => {
  switch (action.type) {
  case ENABLE_DISABLE_SLIDE_MENU:
    return toggleSlideMenu(state, action);
  case SET_ERROR_MESSAGE:
    return setErrorMessage(state, action);
  default: return state;
  }
};

export default dashBoard;
