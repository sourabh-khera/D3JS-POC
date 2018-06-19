const schedule = require('node-schedule');
const revenueController = require('../controller/revenues');

(() => {
  const rule = new schedule.RecurrenceRule();
  rule.minute = new schedule.Range(0, 59, 2);
  schedule.scheduleJob(rule, () => {
    revenueController.checkForAllUpdatedRecords()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  });
})();
