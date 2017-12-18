const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
