import {
  SAVE_CITY_BASED_REVENUES,
  SAVE_SALES_TOTAL_REVENUES,
  SAVE_CHANNEL_BASED_REVENUES,
  SAVE_SERVICE_BASED_REVENUES,
} from '../constants';

export const saveSalesTotalRevenues = totalRevenues => ({ type: SAVE_SALES_TOTAL_REVENUES, totalRevenues });
export const saveServiceBasedRevenues = serviceRevenues => ({ type: SAVE_SERVICE_BASED_REVENUES, serviceRevenues });
export const saveChannelBasedRevenues = channelRevenues => ({ type: SAVE_CHANNEL_BASED_REVENUES, channelRevenues });
export const saveCityBasedRevenues = cityRevenues => ({ type: SAVE_CITY_BASED_REVENUES, cityRevenues });
