const API = {
  ENDPOINT: {
    BASE: 'localhost',
    DOMAIN: 'http',
    PORT: 3000,
    REVENUES: {
      TOTAL_SALES_REVENUES: {
        url: '/calculateTotalSalesRevenues',
        method: 'get',
      },
      SERVICE_BASED_REVENUES: {
        url: '/calculateServiceBasedRevenues',
        method: 'get',
      },
      CHANNEL_BASED_REVENUES: {
        url: '/calculateChannelBasedRevenues',
        method: 'get',
      },
      CITY_BASED_REVENUES: {
        url: '/calculateCityBasedRevenues',
        method: 'get',
      },
    },
  },
};
export default API;
