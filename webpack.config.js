const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const shouldAnalyze = process.argv.includes('--analyze');

  const config = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
      index: './index.js',
      'catalog-by-categories': './catalog-by-categories.js',
      'catalog-by-search-results': './catalog-by-search-results.js',
      'product-card': './product-card.js',
      'whiskey-collection-club': './whiskey-collection-club.js',
      'whiskey-collection-club-succeed': './whiskey-collection-club-succeed.js',
      'terms-and-conditions': './terms-and-conditions.js',
      'privacy-policy': './privacy-policy.js',
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
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
        filename: 'catalog-by-search-results.html',
        template: './catalog-by-search-results.html',
        chunks: ['catalog-by-search-results'],
      }),
      new HtmlWebpackPlugin({
        filename: 'product-card.html',
        template: './product-card.html',
        chunks: ['product-card'],
      }),
      new HtmlWebpackPlugin({
        filename: 'whiskey-collection-club.html',
        template: './whiskey-collection-club.html',
        chunks: ['whiskey-collection-club'],
      }),
      new HtmlWebpackPlugin({
        filename: 'whiskey-collection-club-succeed.html',
        template: './whiskey-collection-club-succeed.html',
        chunks: ['whiskey-collection-club-succeed'],
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
          { from: './assets/whiskey.json', to: './assets/whiskey.json' },
          { from: './robots.txt' },
          { from: './sitemap.xml' },
        ],
      }),
      new CleanWebpackPlugin(),
      isProduction && shouldAnalyze && new BundleAnalyzerPlugin(),
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

  return config;
};
