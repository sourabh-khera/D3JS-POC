const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackconfig = require('../../webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const compiler = webpack(webpackconfig);
// require('./services/checkForUpdate_Job');
const routes = require('./routes');

const app = express();

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: '/',
  historyApiFallback: true,
}));

routes(app);

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve('src/client', 'index.html'))
});

app.listen(PORT, () => {
    console.log('server is listening on port number------>', PORT)
});
