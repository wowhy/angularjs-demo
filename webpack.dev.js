module.exports = {
    entry: {
        admin: './src/admin/admin.js',
        index: './src/app/app.js'
    },
    output: {
        path: './src',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel'},
            {test: /\.html/, loader: 'raw!html-minifier'},
            {test: /\.css$/, loader: 'style!css'}
        ]
    }
};