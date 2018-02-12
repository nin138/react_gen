const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  // Electron設定
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
  // React 設定
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
    // devtool: 'inline-source-map',
    devtool: "eval",
    resolve: { extensions: ['.ts', '.tsx', '.js'] },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/react/index.html',
        filename: path.join(__dirname, 'build/react/index.html'),
        inject: false,
        minify: false,
        compile: false,
      }),
    ],
    externals: [
      'electron',
      'fs-extra',
    ],
  },
];