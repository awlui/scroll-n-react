const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    }),
    new UglifyJSPlugin(),
    new ExtractTextPlugin({filename: 'styles.css', allChunks: true})

  ],
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            'sass-loader'
          ]
        })

      }
    ]
  }
}

]);
