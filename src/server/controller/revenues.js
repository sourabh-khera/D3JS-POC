const PythonShell = require('python-shell');

exports.getSalesRevenues = dateObj => (
  new Promise((resolve, reject) => {
    const date = `{"dateRange":${JSON.stringify(dateObj)}}`;
    PythonShell.run('./src/server/py/calc_salesRevenues.py', { args: date }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
);

exports.getServiceBasedRevenues = dateObj => (
  new Promise((resolve, reject) => {
    const date = `{"dateRange":${JSON.stringify(dateObj)}}`;
    PythonShell.run('./src/server/py/calc_serviceBasedRevenues.py', { args: date }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
);

exports.getChannelBasedRevenues = dateObj => (
  new Promise((resolve, reject) => {
    const date = `{"dateRange":${JSON.stringify(dateObj)}}`;
    PythonShell.run('./src/server/py/calc_channelBasedRevenues.py', { args: date }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
);


exports.getCityBasedRevenues = dateObj => (
  new Promise((resolve, reject) => {
    const date = `{"dateRange":${JSON.stringify(dateObj)}}`;
    PythonShell.run('./src/server/py/calc_cityBasedRevenues.py', { args: date }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
);

exports.getAllRecords = () => (
  new Promise((resolve, reject) => {
    PythonShell.run('./src/server/py/fetchAllRecords.py', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
);

exports.checkForAllUpdatedRecords = () => (
  new Promise((resolve, reject) => {
    PythonShell.run('./src/server/py/checkForUpdatedData.py', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
);
