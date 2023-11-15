const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    index: './index.js',
    'catalog-by-categories': './catalog-by-categories.js',
    'terms-and-conditions': './terms-and-conditions.js',
    'privacy-policy': './privacy-policy.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'catalog-by-categories.html',
      template: './catalog-by-categories.html',
      chunks: ['catalog-by-categories'],
    }),
    new HtmlWebpackPlugin({
      filename: 'terms-and-conditions.html',
      template: './terms-and-conditions.html',
      chunks: ['terms-and-conditions'],
    }),
    new HtmlWebpackPlugin({
      filename: 'privacy-policy.html',
      template: './privacy-policy.html',
      chunks: ['privacy-policy'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './assets/images', to: './assets/images' },
        { from: './assets/icons', to: './assets/icons' },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: { loader: 'html-loader' },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
