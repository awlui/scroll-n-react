const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
module.exports = merge([
{
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: process.cwd()
    })
  ],
  devtool: 'none'
}

]);
