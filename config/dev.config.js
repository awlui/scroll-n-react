const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge([
{
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    contentBase: path.resolve('build'),
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
  ]
}

]);
