const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry:{
    home:'./src/js/index.js',
    buy:'./src/js/buy.js',
    shop:'./src/js/shop.js',
    registration:'./src/js/registration.js',
    product:'./src/js/product.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'assets/js/[name].js'
  },
  mode:'production',
  resolve:{
    extensions:['.js']
  },
  module:{
    rules:[
      {
        test:/\.html$/,
        use:['html-loader']
      },
      {
        test:/\.js$/,
        exclude:/node-module/,
        use:{
          loader:'babel-loader'
        }
      },
      {
        test:/\.css$/,
        use:['style-loader', 'css-loader'], //development
        // use:[MiniCssExtractPlugin.loader, 'css-loader'], //production
      },
      {
        test:/\.(png|jpg|webp)/,
        type:'asset/resource',
        generator:{
          filename:'assets/images/[name].[ext]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/html/index.html',
      filename:'index.html',
      chunks:['home'],
    }),
    new HtmlWebpackPlugin({
      template:'./src/html/buy.html',
      filename:'buy.html',
      chunks:['buy']
    }),
    new HtmlWebpackPlugin({
      template:'./src/html/product.html',
      filename:'product.html',
      chunks:['product']
    }),
    new HtmlWebpackPlugin({
      template:'./src/html/registration.html',
      filename:'registration.html',
      chunks:['registration']
    }),
    new HtmlWebpackPlugin({
      template:'./src/html/shop.html',
      filename:'shop.html',
      chunks:['shop']
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:'assets/css/[name].css'
    })
  ],
  optimization:{
    minimize:true,
    minimizer:[
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  },
  // devServer:{
  //   static:path.join(__dirname,'dist'),
  //   compress:true,
  //   historyApiFallback:true,
  //   port:3005
  // }
}