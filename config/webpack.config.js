const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(__dirname, "../src/assets/scripts/main.js"),
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "bundle.js",
      path: path.resolve(__dirname, "../dist"),
      publicPath: "/", // Adjust as needed for your deployment
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
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
        // Add other loaders here for handling images, fonts, etc.
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../src/pages/index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? "[name].[contenthash].css" : "[name].css",
      }),
      new CleanWebpackPlugin(), // This will clean the dist folder before each build
    ],
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    // Uncomment and adjust the following lines if you're using webpack-dev-server
    // devServer: {
    //   contentBase: path.join(__dirname, 'dist'),
    //   compress: true,
    //   port: 9000,
    // },
  };
};
