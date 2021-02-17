const path = require("path");

module.exports = {
  entry: {
    quickstartsPreview: "./src/view/app/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "quickstartsPreview"),
    filename: "[name].js"
  },
  devtool: "source-map",
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {},
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|webp|gif|svg)$/,
        loader: "null-loader"
        // use: {
        //   loader: "url-loader",
        //   options: {
        //     limit: 1024,
        //     fallback: "file-loader",
        //     name: "[name].[contenthash].[ext]",
        //     outputPath: "images/",
        //   },
        // },
      },
      {
        test: /.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "null-loader"
        // use: [
        //   {
        //     loader: "file-loader",
        //     options: {
        //       name: "[name].[ext]",
        //       outputPath: "fonts/",
        //     },
        //   },
        // ],
      },
    ],
  },
  // performance: {
  //   hints: false,
  // },
};
