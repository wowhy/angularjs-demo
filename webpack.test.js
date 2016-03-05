module.exports = {
    devtool: 'inline-source-map',
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /(test|node_modules|bower_components|libs)\//,
            loader: 'isparta-instrumenter',
            query: {
                'babel': {
                    presets: ['es2015']
                }
            }
        }],
        loaders: [
            {test: /\.js$/, exclude: [/node_modules/], loader: 'babel'},
            {test: /\.html/, loader: 'raw!html-minifier'},
            {test: /\.css$/, loader: 'style!css'}
        ]
    }
};