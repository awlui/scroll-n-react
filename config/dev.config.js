const merge = require('webpack-merge');
const path = require('path');
module.exports = merge([
{
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    contentBase: path.resolve('src', 'public'),
    overlay: {
      errors: true,
      warnings: true,
    },
  },
}

]);
