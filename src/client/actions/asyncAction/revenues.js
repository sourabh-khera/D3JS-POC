import fetch from 'isomorphic-fetch';
import API from '../../config/endpoints';
import {
  saveSalesTotalRevenues,
  saveServiceBasedRevenues,
  saveChannelBasedRevenues,
} from '../revenues';
import {
  enableDisableLoader,
  enableDisableServiceTypeLoader,
  enableDisableChannelTypeLoader,
} from '../common';

export const getTotalRevenues = () => async dispatch => {
  const { url, method } = API.ENDPOINT.REVENUES.TOTAL_SALES_REVENUES;
  const URL = `${API.ENDPOINT.DOMAIN}://${API.ENDPOINT.BASE}:${API.ENDPOINT.PORT}${url}`;
  dispatch(enableDisableLoader(true));
  try {
    const response = await fetch(URL, {
      method,
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    const totalRevenues = JSON.parse(result[0]);
    dispatch(enableDisableLoader(false));
    dispatch(saveSalesTotalRevenues(totalRevenues));
  } catch (error) {
    console.log(error);
  }
};

export const getServiceBasedRevenues = () => async dispatch => {
  const { url, method } = API.ENDPOINT.REVENUES.SERVICE_BASED_REVENUES;
  const URL = `${API.ENDPOINT.DOMAIN}://${API.ENDPOINT.BASE}:${API.ENDPOINT.PORT}${url}`;
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

export const getChannelBasedRevenues = () => async dispatch => {
  const { url, method } = API.ENDPOINT.REVENUES.CHANNEL_BASED_REVENUES;
  const URL = `${API.ENDPOINT.DOMAIN}://${API.ENDPOINT.BASE}:${API.ENDPOINT.PORT}${url}`;
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

export const getCityBasedRevenues = () => async dispatch => {
  const { url, method } = API.ENDPOINT.REVENUES.CITY_BASED_REVENUES;
  const URL = `${API.ENDPOINT.DOMAIN}://${API.ENDPOINT.BASE}:${API.ENDPOINT.PORT}${url}`;
  try {
    const response = await fetch(URL, {
      method,
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    const json = JSON.parse(result[0]);
  } catch (error) {
    console.log(error);
  }
};
