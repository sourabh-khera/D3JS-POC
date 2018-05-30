const PythonShell = require('python-shell');


const getSalesRevenues = () => {
    return new Promise((resolve, reject) => {
        PythonShell.run('./src/server/py/calc_salesRevenues.py', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

const getServiceBasedRevenues = () => {
    return new Promise((resolve, reject) => {
        PythonShell.run('./src/server/py/calc_serviceBasedRevenues.py', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

const getChannelBasedRevenues = () => {
    return new Promise((resolve, reject) => {
        PythonShell.run('./src/server/py/calc_channelBasedRevenues.py', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

module.exports = (app) => {

    app.get('/calculateSalesRevenues', (req, res) => {
        getSalesRevenues()
            .then(data => console.log("group-----",data))
            .catch(err => console.log(err))
    });

    app.get('/calculateServiceBasedRevenues', (req, res) => {
        getServiceBasedRevenues()
            .then(data => console.log("group-----",data))
            .catch(err => console.log(err))
    });

    app.get('/calculateChannelBasedRevenues', (req, res) => {
        getChannelBasedRevenues()
            .then(data => console.log("group-----",data))
            .catch(err => console.log(err))
    });
};
