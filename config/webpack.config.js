const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const commonConfig = merge([
  {
    entry: {
      index: './'
    },
    context: path.join(process.cwd(), 'src'),,
    
  }
  ])}
