const path = require('path');
const zlib = require("zlib");
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  /*entry: [
    './src/scripts/mapbox/index.js',
     './src/scripts/firebase/index.js',
     './src/index.js'
   ],*/
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
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
    minimize: true,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      filename: "[path].[name].[hash].[ext].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: Infinity,
      deleteOriginalAssets: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/icons/favicon/fav.ico',
      meta: {
        "og:image": "https://github.com/ocommaj/hailstone/blob/main/src/assets/hailstonePreview.jpg?raw=true"
      }
    }),
    new Dotenv({
      systemvars: true
    }),
  ]
};
