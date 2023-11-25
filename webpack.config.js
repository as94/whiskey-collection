const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const pageKeys = [
  'index',
  'catalog-by-categories',
  'catalog-by-search-results',
  'product-card',
  'whiskey-collection-club',
  'whiskey-collection-club-succeed',
  'terms-and-conditions',
  'privacy-policy',
  'blog-post-list',
  'blog-post',
];

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

  const entryPoints = () => {
    const entryPoints = {};
    pageKeys.forEach(key => {
      entryPoints[key] = `./${key}.js`;
    });

    return entryPoints;
  };

  const htmlPagePlugins = () => {
    return pageKeys.map(
      key =>
        new HtmlWebpackPlugin({
          filename: `./${key}.html`,
          template: `./${key}.html`,
          chunks: [`${key}`],
          minify: {
            collapseWhitespace: isProduction,
          },
        })
    );
  };

  const configuration = {
    context: path.resolve(__dirname, 'src'),
    mode: isProduction ? 'production' : 'development',
    entry: entryPoints(),
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: optimization(),
    plugins: [
      ...htmlPagePlugins(),
      new CopyWebpackPlugin({
        patterns: [
          { from: './assets/images', to: './assets/images' },
          { from: './assets/posts', to: './assets/posts' },
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
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.md$/,
          use: 'raw-loader',
        },
      ],
    },
  };

  return configuration;
};
