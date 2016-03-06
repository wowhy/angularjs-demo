var webpack = require('webpack');

module.exports = {
    entry: {
        admin: './src/admin/index.js',
        index: './src/app/index.js'
    },
    output: {
        path: './src',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            loader: 'ng-annotate!babel'
        }, {
            test: /\.html/,
            loader: 'raw!html-minifier'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};