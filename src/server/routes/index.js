const PythonShell = require('python-shell');


const getData = () => {
    return new Promise((reject, resolve) => {
        PythonShell.run('./src/server/data.py', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

module.exports = (app) => {

    app.get('/fetchData', (req, res) => {
        getData()
            .then(response => res.send(response))
            .catch(err => res.send(err))
    });

};
