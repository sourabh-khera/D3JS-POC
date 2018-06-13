const cors = require('cors');
const revenueController = require('../controller/revenues');


module.exports = app => {
  app.use(cors());
  app.get('/calculateTotalSalesRevenues', (req, res) => {
    const dateObj = JSON.parse(req.query.date);
    revenueController.getSalesRevenues(dateObj)
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });

  app.get('/calculateServiceBasedRevenues', (req, res) => {
    const dateObj = JSON.parse(req.query.date);
    revenueController.getServiceBasedRevenues(dateObj)
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });

  app.get('/calculateChannelBasedRevenues', (req, res) => {
    const dateObj = JSON.parse(req.query.date);
    revenueController.getChannelBasedRevenues(dateObj)
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });

  app.get('/calculateCityBasedRevenues', (req, res) => {
    const dateObj = JSON.parse(req.query.date);
    revenueController.getCityBasedRevenues(dateObj)
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });
};
