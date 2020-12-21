const path = require('path')
const webpack =  require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js'
  },
  node: {fs: "empty"},
  module: {
    rules: [
      {
        test: /\.jsx?$/,
         exclude: /node_modules/,
         use: {
           loader: 'babel-loader'
         }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
   ]
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
       template: './public/index.html'
    })
  ],
  mode: "development",
  resolve: {
    extensions: ['.js', '.jsx']
  }
}