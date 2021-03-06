const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackModules = require('webpack-modules');

const baseDir = process.cwd();
const { env } = process; // eslint-disable-line no-undef

module.exports = {
  context: path.resolve(baseDir, './src'),

  entry: {
    index: path.resolve(baseDir, env.ENTRY || './src/index.ts'),
  },

  output: {
    path: path.resolve(baseDir, './dist'),
    filename: 'js/[name].js',
  },

  resolve: {
    // Make sure that libs are included only once
    alias: {
      mithril$: path.resolve(baseDir, 'node_modules/mithril/mithril.js'), // Note the exact match
    },
    extensions: ['.mjs', '.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: '../../babel.config.js',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[local]',
            },
          },
          'css-loader',
        ],
      },
    ],
  },

  plugins: [
    new WebpackModules(),
    new MiniCssExtractPlugin({
      filename: 'css/app.css',
    }),
  ],

  devtool: 'source-map',
};
