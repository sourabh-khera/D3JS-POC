import {
  SAVE_CITY_BASED_REVENUES,
  SAVE_SALES_TOTAL_REVENUES,
  SAVE_CHANNEL_BASED_REVENUES,
  SAVE_SERVICE_BASED_REVENUES,
  ENABLE_DISABLE_LOADER,
  ENABLE_DISABLE_SERVICE_TYPE_LOADER,
  ENABLE_DISABLE_CHANNEL_TYPE_LOADER,
} from '../constants';

const initialState = {
  totalRevenues: {},
  showLoader: false,
  serviceTypeRevenues: [],
  channelTypeRevenues: [],
  showServiceTypeLoader: false,
  showChannelTypeLoader: false,
};

const saveTotalRevenues = (state, { totalRevenues }) => ({ ...state, totalRevenues });

const saveServiceRevenues = (state, { serviceTypeRevenues }) => {
  const keys = Object.keys(serviceTypeRevenues);
  const serviceType = keys.map(item => (
    { ServiceType: item, ...serviceTypeRevenues[item] }
  ));
  return { ...state, serviceTypeRevenues: serviceType };
};

const saveChannelRevenues = (state, { channelTypeRevenues }) => {
  const keys = Object.keys(channelTypeRevenues);
  const channelType = keys.map(item => (
    { ChannelType: item, ...channelTypeRevenues[item] }
  ));
  return { ...state, channelTypeRevenues: channelType };
};

const saveCityRevenues = () => {};

const showHideLoader = (state, { showLoader, showServiceTypeLoader, showChannelTypeLoader }, type) => {
  if (type === 'dashboard') {
    return { ...state, showLoader };
  } else if (type === 'service') {
    return { ...state, showServiceTypeLoader };
  } else if (type === 'channel') {
    return { ...state, showChannelTypeLoader };
  }
  return { ...state };
};

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
  case ENABLE_DISABLE_LOADER:
    return showHideLoader(state, action, 'dashboard');
  case ENABLE_DISABLE_SERVICE_TYPE_LOADER:
    return showHideLoader(state, action, 'service');
  case ENABLE_DISABLE_CHANNEL_TYPE_LOADER:
    return showHideLoader(state, action, 'channel');
  default: return state;
  }
};

export default revenues;
