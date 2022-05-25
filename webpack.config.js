const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  target: 'node', // IMPORTANT!
  entry: {
    CONFIG_DATA_LOAD: path.resolve(__dirname, './infrastructure/functions/dist/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        loader: 'native-ext-loader',
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".mjs", ".js", ".tsx", ".graphql"],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'infrastructure/functions'),
    libraryTarget: 'commonjs', // IMPORTANT!
  },
  optimization: {
    minimize: false,
  }
};