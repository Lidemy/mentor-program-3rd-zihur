const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成 html，並且自動引入 js 檔案連結
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清空 dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 拉出獨立的 CSS 編譯檔
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // CSS 最小化，減少重複的 CSS 設定
const TerserJSPlugin = require('terser-webpack-plugin'); // 最小化編譯出的 JS 檔案

module.exports = {
  mode: 'production', // 在 develope 模式下不會觸發下面最優化
  entry: {
    index: './src/index.js',
  },
  optimization: {
    // 在 product 模式時，此設定會蓋過原先內建的 CSS 和 JS 最小化功能，所以要記得再補回 JS 最小化套件，uglify 已不支援 ES6 之後的
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Produced by HtmlWebpackPlugin',
      // name: 輸出的 html 名稱
      // template: 輸出的模板，應該是配合 pug 使用
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // 移除關於衝突的 Warning
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            // 導出獨立的 CSS 檔案
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 這邊的路徑的參數設定說明查了一些資料，仍然還不太清楚
              publicPath: (resourcePath, context) => path.relative(path.dirname(resourcePath), context) + '/'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
              ]
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.styl$/,
        use: [
          {
            // 導出獨立的 CSS 檔案
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 這邊的路徑的參數設定說明查了一些資料，仍然還不太清楚
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              }
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
              ]
            }
          },
          'stylus-loader'
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
}
