const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
  src: path.join(process.cwd(), 'src'),
  build: path.join(process.cwd(), 'build'),
};
module.exports = merge([
{
  entry: {
    index: './src/index'
  },
  output: {
    libraryTarget: 'umd',
    path: PATHS.build,
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    contentBase: 'build',
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  devtool: 'inline-source-map',
  plugins: [
      new HtmlWebpackPlugin({
        template: './src/public/index.html'
      })
  ]
}

]);
