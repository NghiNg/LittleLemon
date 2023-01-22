module.exports = {
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.wasm', '.ts', '.tsx', '.saas'],
    },
    module: {
      rules: [
        {
          test: /\.sass$/i,
          use: [
            // compiles Less to CSS
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
  };