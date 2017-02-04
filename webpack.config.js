const path = require('path');
const webpack = require('webpack');

module.exports = {
   context: path.join(__dirname, './src'),
   entry: {
         javascript: './index.js',
         html: './index.html'
   },
   output: {
      path: path.join(__dirname, './dist'),
      filename: 'bundle.js'
   },
   // devServer: {
   //    contentBase: 'dist',
   //    port: 9999,
   //    proxy: {
   //       '/api': {
   //          target: 'http://localhost:8080'
   //       }
   //    }
   // },
   // devtool: 'inline-source-map',
   module: {
      loaders: [
         {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
         },
         {
           test: /\.css$/,
           loaders: ['style', 'css?modules'],
         },
         {
            test: /\.html$/,
            loader: "file?name=[name].[ext]",
         },
      ]
   },
   resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
   }
   // plugins: [
   //    new webpack.DefinePlugin({
   //       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
   //    })
   // ]
};