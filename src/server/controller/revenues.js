const PythonShell = require('python-shell');


exports.getSalesRevenues = dateObj => (
  new Promise((resolve, reject) => {
    PythonShell.run('./src/server/py/calc_salesRevenues.py', { args: [dateObj] }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
);

exports.getServiceBasedRevenues = () => (
  new Promise((resolve, reject) => {
    PythonShell.run('./src/server/py/calc_serviceBasedRevenues.py', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
);

exports.getChannelBasedRevenues = () => (
  new Promise((resolve, reject) => {
    PythonShell.run('./src/server/py/calc_channelBasedRevenues.py', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
);


exports.getCityBasedRevenues = () => (
  new Promise((resolve, reject) => {
    PythonShell.run('./src/server/py/calc_cityBasedRevenues.py', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
);
