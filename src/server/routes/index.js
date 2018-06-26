const cors = require('cors');
const revenueController = require('../controller/revenues');


const fetchAllRecords = (req, res, next) => {
  revenueController.getAllRecords()
    .then(response => {
      if (response.includes('true')) {
        next();
      }
    })
    .catch(err => console.log(err));
};

module.exports = app => {
  app.use(cors());
  app.use(fetchAllRecords);

  app.get('/calculateTotalSalesRevenues', (req, res) => {
    const dateObj = JSON.parse(req.query.date);
    revenueController.getSalesRevenues(dateObj)
      .then(data => res.status(200).send(data))
      .catch(() => res.status(400).send('No data found'));
  });

  app.get('/calculateServiceBasedRevenues', (req, res) => {
    const dateObj = JSON.parse(req.query.date);
    revenueController.getServiceBasedRevenues(dateObj)
      .then(data => res.status(200).send(data))
      .catch(() => res.status(400).send('No data found'));
  });

  app.get('/calculateChannelBasedRevenues', (req, res) => {
    const dateObj = JSON.parse(req.query.date);
    revenueController.getChannelBasedRevenues(dateObj)
      .then(data => res.status(200).send(data))
      .catch(() => res.status(200).send('No data found'));
  });

  app.get('/calculateCityBasedRevenues', (req, res) => {
    const dateObj = JSON.parse(req.query.date);
    revenueController.getCityBasedRevenues(dateObj)
      .then(data => res.status(200).send(data))
      .catch(() => res.status(400).send('No data found'));
  });
};
