const path = require('node:path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UnpluginInjectPreload = require('unplugin-inject-preload/webpack').default

module.exports = {
  entry: path.resolve(__dirname, './../src/main.ts'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: '[name].[hash][ext][query]',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(),
    UnpluginInjectPreload({
      files: [
        {
          match: /Roboto-[a-zA-Z]*.[a-z-0-9]*\.woff2$/,
        },
        {
          match: /^(?!main).*\.(css|js)$/,
        },
      ],
    }),
  ],
}
