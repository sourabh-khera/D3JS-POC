import fetch from 'isomorphic-fetch';
import API from '../../config/endpoints';
import {
  saveSalesTotalRevenues,
  saveServiceBasedRevenues,
  saveChannelBasedRevenues,
  saveCityBasedRevenues,
  clearDateObject,
} from '../revenues';
import {
  enableDisableLoader,
  enableDisableServiceTypeLoader,
  enableDisableChannelTypeLoader,
  enableDisableCityLoader,
} from '../common';

export const getTotalRevenues = dateObj => async dispatch => {
  const { url, method } = API.ENDPOINT.REVENUES.TOTAL_SALES_REVENUES;
  const URL = `${API.ENDPOINT.DOMAIN}://${API.ENDPOINT.BASE}:${API.ENDPOINT.PORT}${url}/?date=${JSON.stringify(dateObj)}`;
  dispatch(enableDisableLoader(true));
  try {
    const response = await fetch(URL, {
      method,
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    const totalRevenues = JSON.parse(result[0]);
    dispatch(enableDisableLoader(false));
    if (Object.keys(dateObj).length) {
      dispatch(clearDateObject());
    }
    dispatch(saveSalesTotalRevenues(totalRevenues));
  } catch (error) {
    console.log(error);
  }
};

export const getServiceBasedRevenues = dateObj => async dispatch => {
  const { url, method } = API.ENDPOINT.REVENUES.SERVICE_BASED_REVENUES;
  const URL = `${API.ENDPOINT.DOMAIN}://${API.ENDPOINT.BASE}:${API.ENDPOINT.PORT}${url}/?date=${dateObj}`;
  dispatch(enableDisableServiceTypeLoader(true));
  try {
    const response = await fetch(URL, {
      method,
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    const data = JSON.parse(result[0]);
    dispatch(enableDisableServiceTypeLoader(false));
    dispatch(saveServiceBasedRevenues(data));
  } catch (error) {
      console.log(error);
  }
};

export const getChannelBasedRevenues = dateObj => async dispatch => {
  const { url, method } = API.ENDPOINT.REVENUES.CHANNEL_BASED_REVENUES;
  const URL = `${API.ENDPOINT.DOMAIN}://${API.ENDPOINT.BASE}:${API.ENDPOINT.PORT}${url}/?date=${dateObj}`;
  dispatch(enableDisableChannelTypeLoader(true));
  try {
    const response = await fetch(URL, {
      method,
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    const data = JSON.parse(result[0]);
    dispatch(enableDisableChannelTypeLoader(false));
    dispatch(saveChannelBasedRevenues(data));
  } catch (error) {
    console.log(error);
  }
};

export const getCityBasedRevenues = dateObj => async dispatch => {
  const { url, method } = API.ENDPOINT.REVENUES.CITY_BASED_REVENUES;
  const URL = `${API.ENDPOINT.DOMAIN}://${API.ENDPOINT.BASE}:${API.ENDPOINT.PORT}${url}/?date=${dateObj}`;
  dispatch(enableDisableCityLoader(true));
  try {
    const response = await fetch(URL, {
      method,
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    const data = JSON.parse(result[0]);
    dispatch(enableDisableCityLoader(false));
    dispatch(saveCityBasedRevenues(data));
  } catch (error) {
    console.log(error);
  }
};
