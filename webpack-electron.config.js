const path = require('path');
module.exports = {
  entry: {
    main: './src/electron/index.ts',
  },
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
};
