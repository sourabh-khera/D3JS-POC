import {
  ENABLE_DISABLE_LOADER,
  ENABLE_DISABLE_SERVICE_TYPE_LOADER,
  ENABLE_DISABLE_CHANNEL_TYPE_LOADER,
  ENABLE_DISABLE_CITY_LOADER,
  SET_ERROR_MESSAGE,
} from '../constants';

export const enableDisableLoader = showLoader => (
  { type: ENABLE_DISABLE_LOADER, showLoader }
);
export const enableDisableServiceTypeLoader = showServiceTypeLoader => (
  { type: ENABLE_DISABLE_SERVICE_TYPE_LOADER, showServiceTypeLoader }
);
export const enableDisableChannelTypeLoader = showChannelTypeLoader => (
  { type: ENABLE_DISABLE_CHANNEL_TYPE_LOADER, showChannelTypeLoader }
);
export const enableDisableCityLoader = showCityLoader => (
  { type: ENABLE_DISABLE_CITY_LOADER, showCityLoader }
);
export const setErrorMessage = value => (
  { type: SET_ERROR_MESSAGE, value }
);
