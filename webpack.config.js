const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        // other loaders...
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html", // path to your index.html
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? "[name].[contenthash].css" : "[name].css",
      }),
    ],
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
  };
};
