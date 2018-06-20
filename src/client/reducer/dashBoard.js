import { ENABLE_DISABLE_SLIDE_MENU } from '../constants';

const initialState = {
  menuOpen: false,
};

const toggleSlideMenu = state => ({ ...state, menuOpen: !state.menuOpen });
const dashBoard = (state = initialState, action) => {
  switch (action.type) {
  case ENABLE_DISABLE_SLIDE_MENU:
    return toggleSlideMenu(state, action);
  default: return state;
  }
};

export default dashBoard;
