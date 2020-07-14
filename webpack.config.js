const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ENV = process.env.npm_lifecycle_event;
const isDev = ENV === "dev";
const isProd = ENV === "build";

function setDevTool() {
  if (isDev) {
    return "cheap-module-eval-source-map";
  }
  return "none";
}

function setDMode() {
  if (isProd) {
    return "production";
  }
  return "development";
}

const config = {
  target: "web",
  entry: {
    progress: "./src/js/progress.js",
    englishpuzzle: './src/js/english-puzzle.js',
    savannah: "./src/js/savannah.js",
    savannah: "./src/js/savannah.js",
    speakit: './src/js/speak-it/speakIt.js',
    sprint: './src/js/sprint.js',
    audiocall: './src/js/audiocall.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: setDMode(),
  devtool: setDevTool(),
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader" /* , 'eslint-loader' */],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "./postcss.config.js" },
            },
          },
        ],
      },
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: "json-loader",
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "img",
              name: "[name].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
                optimizationLevel: 1,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts",
            },
          },
        ],
      },
      {
        test: /\.(wav|mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "audio",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebPackPlugin({
      template: "./src/html/progress.html",
      chunks: ["progress"],
      filename: "progress.html",
    }),
    new HtmlWebPackPlugin({
      template: './src/english-puzzle.html',
      chunks: ["englishpuzzle"],
      filename: 'english-puzzle.html'
    }),
    new HtmlWebPackPlugin({
      template: "./src/savannah.html",
      chunks: ["savannah"],
      filename: "savannah.html",
    }),
    new HtmlWebPackPlugin({
      template: './src/speak-it.html',
      chunks: ['speakit'],
      filename: 'speakit.html'
    }),
    new HtmlWebPackPlugin({
      template: './src/sprint.html',
      chunks: ['sprint'],
      filename: 'sprint.html'
    }),
    new HtmlWebPackPlugin({
      template: './src/audiocall.html',
      chunks: ['audiocall'],
      filename: 'audiocall.html'
    }),
    new CopyWebpackPlugin([
      { from: './src/img', to: './img/' },
      { from: './src/icons', to: './icons/' },
      { from: './src/audio', to: './audio/' }

    ]),
  ],

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3001,
    overlay: true,
    stats: "errors-only",
    clientLogLevel: "none",
  },
};

module.exports = config;
