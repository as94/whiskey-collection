const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    index: './index.js',
    header: './components/Header/header.js',
    jumbotron: './components/Jumbotron/jumbotron.js',
    worldWhiskeyCatalog:
      './components/WorldWhiskeyCatalog/worldWhiskeyCatalog.js',
    worldWhiskeyBlockTitle: './components/BlockTitle/worldWhiskeyBlockTitle.js',
    search: './components/Search/search.js',
    footer: './components/Footer/footer.js',
    agePopup: './components/AgePopup/agePopup.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
