module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        browsers: ['PhantomJS2'],
        reporters: ['mocha', 'coverage'],
        coverageReporter: {
            reporters: [
                {type: 'text-summary'},
                {type: 'html', dir: 'coverage/'}
            ]
        },

        files: loadFiles().concat([
            'test/unit/index.spec.js'
        ]),
        preprocessors: {
            'test/unit/index.spec.js': ['webpack', 'sourcemap']
        },

        port: 9876,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        singleRun: false,

        webpack: require('./webpack.test.js')
    })
};

function loadFiles() {
    return [
        'src/assets/libs/jquery-2.1.4/dist/jquery.js',
        'src/assets/libs/bootstrap-3.3.6/js/bootstrap.js',
        'src/assets/libs/angular-1.4.8/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'src/assets/libs/angular-touch-1.4.8/angular-touch.js',
        'src/assets/libs/angular-animate-1.4.8/angular-animate.js',
        'src/assets/libs/angular-sanitize-1.4.8/angular-sanitize.js',
        'src/assets/libs/angular-block-ui-0.2.2/dist/angular-block-ui.js',
        'src/assets/libs/angular-ui-router-0.2.15/release/angular-ui-router.js',
        'src/assets/libs/angular-bootstrap-0.14.3/ui-bootstrap-tpls.js',
        'src/assets/libs/angular-i18n/angular-locale_zh-cn.js',
        'src/assets/libs/AdminLTE/js/app.js'
    ];
}