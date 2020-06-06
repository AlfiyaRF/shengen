const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  module: {
    rules: [
    {
      test: /\.css$/,
      use: [
      'style-loader',
      'css-loader',
      ],
    },
    {
      test: /\.(png|svg|jpg|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
    {
      test: /\.exec\.js$/,
      use: [
      {
        loader: 'script-loader',
        options: {
          useStrict: false,
        },
      }],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
      'style-loader',
      'css-loader',
      'sass-loader',
      ],
    },
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    compress: true,
    port: 9000,
  },
};
