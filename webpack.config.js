const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';
  const shouldAnalyze = process.argv.includes('--analyze');

  const optimization = () => {
    const optimizeConfig = {
      splitChunks: {
        chunks: 'all',
      },
    };

    if (isProduction) {
      optimizeConfig.minimize = true;
      optimizeConfig.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
    }

    return optimizeConfig;
  };

  const configuration = {
    context: path.resolve(__dirname, 'src'),
    mode: isProduction ? 'production' : 'development',
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
    optimization: optimization(),
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['index'],
        minify: {
          collapseWhitespace: isProduction,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'catalog-by-categories.html',
        template: './catalog-by-categories.html',
        chunks: ['catalog-by-categories'],
        minify: {
          collapseWhitespace: isProduction,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'catalog-by-search-results.html',
        template: './catalog-by-search-results.html',
        chunks: ['catalog-by-search-results'],
        minify: {
          collapseWhitespace: isProduction,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'product-card.html',
        template: './product-card.html',
        chunks: ['product-card'],
        minify: {
          collapseWhitespace: isProduction,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'whiskey-collection-club.html',
        template: './whiskey-collection-club.html',
        chunks: ['whiskey-collection-club'],
        minify: {
          collapseWhitespace: isProduction,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'whiskey-collection-club-succeed.html',
        template: './whiskey-collection-club-succeed.html',
        chunks: ['whiskey-collection-club-succeed'],
        minify: {
          collapseWhitespace: isProduction,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'terms-and-conditions.html',
        template: './terms-and-conditions.html',
        chunks: ['terms-and-conditions'],
        minify: {
          collapseWhitespace: isProduction,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'privacy-policy.html',
        template: './privacy-policy.html',
        chunks: ['privacy-policy'],
        minify: {
          collapseWhitespace: isProduction,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './assets/images', to: './assets/images' },
          { from: './assets/whiskey.json', to: './assets/whiskey.json' },
          { from: './robots.txt' },
          { from: './sitemap.xml' },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
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
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
  };

  return configuration;
};
