const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { DefinePlugin } = require("webpack");
const dotenv = require("dotenv");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const envFile = dotenv.config().parsed || {};

const envKeys = Object.keys(envFile).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(envFile[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "http://localhost:3001/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "mf_auth",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
        "./Register": "./src/components/Register.tsx", // Expose bootstrap or App
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router": { singleton: true },
        "react-router-dom": { singleton: true },
      },
    }),
    new DefinePlugin(envKeys),
    new ReactRefreshPlugin(),
  ],
  devServer: {
    static: "./dist",
    port: 3001,
    open: true,
    hot: false,
    historyApiFallback: true,
  },
  mode: "development",
};
