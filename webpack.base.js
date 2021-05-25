const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'tetris.bundle.js',
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(mp3|wav)/,
        type: 'asset/resource',
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: 'ts',
      fix: true,
      threads: true
    }),
    new MiniCssExtractPlugin({
      filename: 'tetris.bundle.css'
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
  ],
}
