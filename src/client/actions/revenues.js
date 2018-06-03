import {
  SAVE_CITY_BASED_REVENUES,
  SAVE_SALES_TOTAL_REVENUES,
  SAVE_CHANNEL_BASED_REVENUES,
  SAVE_SERVICE_BASED_REVENUES,
} from '../constants';

export const saveSalesTotalRevenues = totalRevenues => (
  { type: SAVE_SALES_TOTAL_REVENUES, totalRevenues }
);
export const saveServiceBasedRevenues = serviceTypeRevenues => (
  { type: SAVE_SERVICE_BASED_REVENUES, serviceTypeRevenues }
);
export const saveChannelBasedRevenues = channelTypeRevenues => (
  { type: SAVE_CHANNEL_BASED_REVENUES, channelTypeRevenues }
);
export const saveCityBasedRevenues = cityRevenues => (
  { type: SAVE_CITY_BASED_REVENUES, cityRevenues }
);
