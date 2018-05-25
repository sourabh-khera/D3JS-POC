const path = require("path");

module.exports = {
  mode:'development',
  entry: './src/client/index.js',
  output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, 'dist')
  },
 module: {
    rules: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
    ]
 },

};
