import {
  SAVE_CITY_BASED_REVENUES,
  SAVE_SALES_TOTAL_REVENUES,
  SAVE_CHANNEL_BASED_REVENUES,
  SAVE_SERVICE_BASED_REVENUES,
  ENABLE_DISABLE_LOADER,
  ENABLE_DISABLE_SERVICE_TYPE_LOADER,
  ENABLE_DISABLE_CHANNEL_TYPE_LOADER,
  ENABLE_DISABLE_CITY_LOADER,
  SAVE_DATE_OBJECT,
  CLEAR_TRANSACTIONS,
} from '../constants';

const initialState = {
  totalRevenues: {},
  showLoader: true,
  serviceTypeRevenues: [],
  channelTypeRevenues: [],
  cityRevenues: {},
  showServiceTypeLoader: false,
  showChannelTypeLoader: false,
  showCityLoader: false,
  Transactions: [],
  dateObj: {},
};

const saveTotalRevenues = (state, { totalRevenues }) => ({ ...state, totalRevenues });

const saveServiceRevenues = (state, { serviceTypeRevenues }) => {
  const serviceTypeObj = { type: 'Service' };
  for (let key in serviceTypeRevenues) {
    serviceTypeObj[key] = serviceTypeRevenues[key].Transactions;
  };
  const keys = Object.keys(serviceTypeRevenues);
  const serviceType = keys.map(item => (
    { ServiceType: item, ...serviceTypeRevenues[item] }
  ));
  return { ...state, serviceTypeRevenues: serviceType, Transactions: [...state.Transactions, serviceTypeObj] };
};

const saveChannelRevenues = (state, { channelTypeRevenues }) => {
  const channelTypeObj = { type: 'Channel' };
  for (let key in channelTypeRevenues) {
    channelTypeObj[key] = channelTypeRevenues[key].Transactions;
  };
  const keys = Object.keys(channelTypeRevenues);
  const channelType = keys.map(item => (
    { ChannelType: item, ...channelTypeRevenues[item] }
  ));
  return { ...state, channelTypeRevenues: channelType, Transactions: [...state.Transactions, channelTypeObj] };
};


const saveCityRevenues = (state, { cityRevenues }) => {
  const revenues = { city: "cities", children: [] };
  for( let i in cityRevenues){
    revenues.children.push({ city: `city${i}`, children: [{ city: i, grossRevenue: cityRevenues[i] }] });
  };
  return { ...state, cityRevenues: revenues };
};

const saveDateObj = (state, { dateObj }) => ({ ...state, dateObj });

const clearTransactions = state => ({
  ...state,
  Transactions: [],
  cityRevenues: {},
  serviceTypeRevenues: [],
  channelTypeRevenues: [],
  totalRevenues: {},
});


const showHideLoader = (
  state,
  {
    showLoader,
    showServiceTypeLoader,
    showChannelTypeLoader,
    showCityLoader,
  }, type,
) => {
  if (type === 'dashboard') {
    return { ...state, showLoader };
  } else if (type === 'service') {
    return { ...state, showServiceTypeLoader };
  } else if (type === 'channel') {
    return { ...state, showChannelTypeLoader };
  } else if (type === 'city') {
    return { ...state, showCityLoader };
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
  case ENABLE_DISABLE_CITY_LOADER:
    return showHideLoader(state, action, 'city');
  case SAVE_DATE_OBJECT:
    return saveDateObj(state, action);
  case CLEAR_TRANSACTIONS:
    return clearTransactions(state);
  default: return state;
  }
};

export default revenues;
