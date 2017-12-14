// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const PATHS = {
  src: path.join(process.cwd(), 'src'),
  dist: path.join(process.cwd(), 'dist'),
};
const commonConfig = merge([
  {
    entry: {
      index: './index'
    },
    context: path.join(process.cwd(), 'src'),
    output: {
      path: PATHS.dist,
      filename: '[name].js'
    }
  }
  ]);

module.exports = () => {
  return commonConfig;
};