const merge = require('webpack-merge');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
module.exports = merge([
{
  plugins: [
    new TypedocWebpackPlugin({}, ['./src'])
  ],
  devtool: 'none'
}

]);
