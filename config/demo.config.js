const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const PATHS = {
  demo: path.join(process.cwd(), 'demo'),
};
module.exports = merge([
{
  entry: {
    index: './src/example'
  },
  output: {
    path: PATHS.demo,
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin(['demo'], {
      root: process.cwd()
    }),
    new HtmlWebpackPlugin({
      template: './src/public/index.html'
    })
  ],
  devtool: 'none',

}

]);
