const cors = require('cors');
const revenueController = require('../controller/revenues');


module.exports = app => {
  app.use(cors());
  app.get('/calculateTotalSalesRevenues', (req, res) => {
    revenueController.getSalesRevenues(req.query.date)
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });

  app.get('/calculateServiceBasedRevenues', (req, res) => {
    revenueController.getServiceBasedRevenues()
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });

  app.get('/calculateChannelBasedRevenues', (req, res) => {
    revenueController.getChannelBasedRevenues()
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });

  app.get('/calculateCityBasedRevenues', (req, res) => {
    revenueController.getCityBasedRevenues()
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });
};
