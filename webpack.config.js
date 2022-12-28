// nodejs 内置模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  // 相对 entry 的根目录
  context: path.resolve(__dirname, ''),
  // 指定入口文件
  entry: './unzip.js',
  // 指定打包后的输出目录
  output: {
    // publicPath: './public',
    // 指定打包后的目录
    path: path.resolve(__dirname, 'dist'),
    // 指定打包后的文件名。相对的是 output.path。只能是相对路径
    filename: './js/main.js',
    // 打包时先清空输出目录下的文件
    clean: true,
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    // 使用插件
    new HtmlWebpackPlugin({
      // 文档上说明，可以是相对路径或者绝对路径
      template: './unzip7z.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: './public', to: '' }, //to the dist root directory
      ],
    }),
  ],
};
