import {
  SAVE_CITY_BASED_REVENUES,
  SAVE_SALES_TOTAL_REVENUES,
  SAVE_CHANNEL_BASED_REVENUES,
  SAVE_SERVICE_BASED_REVENUES,
} from '../constants';

const initialState = {
  totalRevenues: {},
};

const saveTotalRevenues = (state, { totalRevenues }) => ({ ...state, totalRevenues });
const saveServiceRevenues = () => {};
const saveChannelRevenues = () => {};
const saveCityRevenues = () => {};

const revenues = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_SALES_TOTAL_REVENUES:
    return saveTotalRevenues(state, action);
  case SAVE_SERVICE_BASED_REVENUES:
    return saveServiceRevenues(state, action);
  case SAVE_CHANNEL_BASED_REVENUES:
    return saveChannelRevenues(state, action);
  case SAVE_CITY_BASED_REVENUES:
    return saveCityRevenues(state, action);
  default: return state;
  }
};

export default revenues;
