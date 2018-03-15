const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
  // electron
  module.exports = {
    node: {
      __dirname: false
    },
    entry: {
      main: './src/electron/index.ts',
    },
    cache: true,
    output: {
      path: path.join(__dirname, 'build'),
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
    ],
    target: 'electron-main',
  },
  // react
  {
    target: "electron-renderer",
    cache: true,
    entry: {
      react: './src/react/index.tsx',
    },
    output: {
      path: path.join(__dirname, 'build'),
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
      // new UglifyJsPlugin({uglifyOptions: {ecma: 6}}),
      new HtmlWebpackPlugin({
        template: './src/react/index.html',
        filename: path.join(__dirname, 'build/index.html'),
        inject: false,
        minify: false,
        compile: false,
      }),
      new CopyWebpackPlugin([
        { from: './package.json', to: path.join(__dirname, 'build/') },
      ], {})
      // new CopyWebpackPlugin([
      //   { from: './template', to: path.join(__dirname, 'build/react/template') },
      // ], {})
    ],
    externals: [
      'electron',
    ],
  },
];