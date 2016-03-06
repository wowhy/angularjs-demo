module.exports = {
    devtool: 'inline-source-map',
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /(test|node_modules|bower_components|libs)/,
            loader: 'isparta-instrumenter'
        }],
        loaders: [
            {test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel'},
            {test: /\.html/, loader: 'raw!html-minifier'},
            {test: /\.css$/, loader: 'style!css'}
        ]
    }
};