module.exports = {
      entry: './client/index.js', // assumes your entry point is the index.js in the root of your project folder
      mode: 'development',
      output: {
        path: __dirname, // assumes your bundle.js will also be in the root of your project folder
        filename: './public/bundle.js'
      },
      resolve: {
            extensions: ['.js', '.jsx']
          },
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    }