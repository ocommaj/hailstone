const path = require('path');
const zlib = require("zlib");
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: [
    './src/scripts/mapbox/index.js',
     './src/scripts/firebase/index.js',
     './src/index.js'
   ],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.ttf$/,
        use: 'url-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',

        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
    			cacheGroups: {
    				commons: {
    					test: /[\\/]node_modules[\\/]/,
    					name: 'vendors',
    					chunks: 'all'
    				}
    			}
    		},
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      algorithm: "brotliCompress",
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/icons/favicon/fav.ico'
    }),
    new Dotenv({
      systemvars: true
    }),
  ],
};
