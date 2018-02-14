const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = [
  // electron
  module.exports = {
    entry: {
      main: './src/electron/index.ts',
    },
    cache: true,
    output: {
      path: path.join(__dirname, 'build/electron'),
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },
    resolve: { extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'] },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    externals: [
      'electron',
      'fs-extra'
    ],
    target: 'electron',
  },
  // react
  {
    cache: true,
    entry: {
      react: './src/react/index.tsx',
    },
    output: {
      path: path.join(__dirname, 'build/react'),
      filename: 'bundle.js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }]
      }]
    },
    devtool: 'inline-source-map',
    // devtool: "eval",
    resolve: { extensions: ['.ts', '.tsx', '.js'] },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/react/index.html',
        filename: path.join(__dirname, 'build/react/index.html'),
        inject: false,
        minify: false,
        compile: false,
      }),
      // new CopyWebpackPlugin([
      //   { from: './template', to: path.join(__dirname, 'build/react/template') },
      // ], {})
    ],
    externals: [
      'electron',
      'fs-extra',
    ],
  },
];