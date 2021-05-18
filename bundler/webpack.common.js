const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "none",
  entry: {
    game: "./src/Game.js",
  },
  output: {
    filename: "js/[contenthash:6].[name]-bundle.js",
    path: path.resolve(__dirname, "../", "dist")
  },

  module: {

      rules:[
        {
          test: /\.s[ac]|c]ss$/i,
          use: [MiniCSSExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader" ]
        },

        {
          test: /\.(jpg|png|svg|gif|jpeg)$/,
          use: "file-loader"
        },

        { 
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: path.resolve(__dirname, "../", "dist/fonts")
              }
            }
          ]
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use:
          [
            "babel-loader"
          ]
        },
      ]
    },

  
  
   plugins: [  
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/template.html'),
      minify: true 
    }),   

    // new CopyWebpackPlugin({
    //         patterns: [
    //             { from: path.resolve(__dirname, '../static') }
    //         ]           
    //     }),
        
    new MiniCSSExtractPlugin({
      filename: "[name].[contenthash:6].css"
    }),    
  ],
}
