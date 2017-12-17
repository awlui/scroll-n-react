const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge([
{
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: process.cwd()
    }),
    new UglifyJSPlugin()
  ],
  devtool: 'none',
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
  }
}

]);
