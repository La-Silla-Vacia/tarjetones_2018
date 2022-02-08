const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const webpack = require("webpack"); //to access built-in plugins

const config = {
  entry: ["whatwg-fetch", "./debug.js"],
  mode: "production",
  output: {
    // path: path.resolve(__dirname, '../dist'),
    filename: "./script.js",
  },

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
                ["@babel/preset-env", { targets: "defaults" }],
                "@babel/preset-react",
              ],
            },
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
                localIdentName: "lsvi__[hash:base64:5]",
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
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true,
    }),
  ],

  optimization: {
    minimize: true,

    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
          },
          output: {
            comments: false,
          },
        // sourceMap: false,
        }
      }),
    ],
  },
};

module.exports = config;
