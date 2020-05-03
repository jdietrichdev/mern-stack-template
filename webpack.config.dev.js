const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    publicPath: 'http://localhost:3000/',
    historyApiFallback: true,
    port: 3000
  },
  output: {
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
}
