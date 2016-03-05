module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        webpack: {
            dev: require('./webpack.config.js')
        },
        watch: {
            files: ['src/**/*.js', 'src/**/*.css', 'src/**/*.html', '!src/*.bundle.js', '!src/assets/**/*.js'],
            tasks: ['webpack']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'src/*.bundle.js'
                    ]
                },
                options: {
                    watchTask: true,
                    notify: false,
                    port: 3000,
                    proxy: 'http://localhost:8000/'
                }
            }
        }
    })
    ;

    grunt.registerTask('default', ['browserSync:dev', 'watch']);
    grunt.registerTask('release', []);
};
