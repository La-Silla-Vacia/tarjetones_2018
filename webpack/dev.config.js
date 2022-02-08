const path = require("path");
const webpack = require("webpack"); //to access built-in plugins
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

//process.traceDeprecation = true;

const config = {
  entry: ["whatwg-fetch", "./debug.js"],
  output: {
    //path: __dirname,
    filename: "./script.js",
  },
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,

        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }],
                "@babel/preset-react",
              ]
            }
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
        ],
        include: /global/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",

            options: {
              importLoaders: 1,
              modules: {
                localIdentName:
                  "[name]__[local]___[hash:base64:5]",
              }
            },
          },
          "postcss-loader"
        ],
        exclude: /global/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "underscore-template-loader",
          },
        ],
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          {
            loader: "dsv-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: "localhost",
      port: 3000,
      server: { baseDir: ["dist"] },
    }),
  ],
};

module.exports = config;
