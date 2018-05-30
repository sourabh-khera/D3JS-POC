const PythonShell = require('python-shell');


const getSalesRevenues = () => {
    return new Promise((resolve, reject) => {
        PythonShell.run('./src/server/py/calc_serviceBasedRevenues.py', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

module.exports = (app) => {

    app.get('/calculateRevenues', (req, res) => {
        getSalesRevenues()
            .then(data => console.log("group-----",data))
            .catch(err => console.log(err))
    });
};
