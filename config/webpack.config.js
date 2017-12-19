const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const developmentConfig = require('./dev.config');
const productionConfig = require('./prod.config');
const demoConfig = require('./demo.config');
const PATHS = {
  src: path.join(process.cwd(), 'src'),
  build: path.join(process.cwd(), 'build'),
};
const commonConfig = merge([
  {
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          loader: 'tslint-loader'
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
      ]
    },

  }
  ]);

module.exports = (env) => {
  switch(env) {
    case 'development':
      return merge(developmentConfig, commonConfig);
    case  'production':
      return merge(productionConfig, commonConfig);
    case 'demo':
      return merge(demoConfig, commonConfig);
  }
}
