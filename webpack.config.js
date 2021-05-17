const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, options) => {
  return {
    mode: options.mode,
    entry: {
      app: path.join(__dirname, 'src', 'index.js')
    },
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'public')
    },
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader'
          ]
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, './public/'),
      port: 8000,
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html',
        templateParameters: {
          env: options.mode === 'production' ? '' : 'dev'
        },
        minify:
          options.mode === 'production'
            ? {
                collapseWhitespace: true,
                removeComments: true
              }
            : false
      }),
      new BundleAnalyzerPlugin()
    ]
  };
};
