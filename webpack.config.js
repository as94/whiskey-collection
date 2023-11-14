const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    header: './src/components/Header/header.js',
    jumbotron: './src/components/Jumbotron/jumbotron.js',
    worldWhiskeyCatalog:
      './src/components/WorldWhiskeyCatalog/worldWhiskeyCatalog.js',
    worldWhiskeyBlockTitle:
      './src/components/BlockTitle/worldWhiskeyBlockTitle.js',
    search: './src/components/Search/search.js',
    footer: './src/components/Footer/footer.js',
    agePopup: './src/components/AgePopup/agePopup.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
    ],
  },
};
