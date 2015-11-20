module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 清理文件
        clean: {
            all: ['dist/**']
        },

        // 复制资源文件
        copy: {
            assets: {
                files: [{expand: true, cwd: 'src', src: ['assets/**/*.{png,jpg,gif,ico}'], dest: 'dist'}]
            },
            libs: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: [
                        'libs/**/*.{js,css,eot,svg,ttf,woff,woff2}',
                        '!libs/*/src/**'
                    ],
                    dest: 'dist'
                }]
            }
        },

        // 解决依赖关系
        browserify: {
            'app': {
                src: 'src/app/app.js',
                dest: 'src/app/main.js'
            }
        },

        // 压缩JS文件
        uglify: {
            dist: {
                files: {
                    'dist/app/main.js': ['<%= browserify.app.dest %>']
                }
            }
        },

        // 压缩CSS文件
        cssmin: {
            options: {report: 'gzip'},
            css: {
                expand: true,
                cwd: 'src',
                src: ['assets/**/*.css'],
                dest: 'dist'
            }
        },

        // 压缩HTML文件
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeOptionalTags: true
            },
            html: {
                expand: true,
                cwd: 'src',
                src: ['*.html', 'app/**/*.html'],
                dest: 'dist'
            }
        },

        watch: {
            assets: {
                files: ['src/assets/**/*.*', 'src/app/**/*.html'],
                tasks: ['default']
            },
            scripts: {
                files: ['src/app/directives/**/*.js', 'src/app/components/**/*.js', 'src/app/modules/**/*.js', 'src/app/app.js', 'src/app/core.js'],
                tasks: ['scripts']
            },
            options: {
                spawn: true,
                interrupt: true
            }
        }
    });

    // 加载任务插件。
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-browserify');

    // 任务列表。
    grunt.registerTask('scripts', ['browserify', 'uglify']);
    grunt.registerTask('all', ['clean', 'copy', 'browserify', 'uglify', 'cssmin', 'htmlmin']);
    grunt.registerTask('default', ['copy', 'browserify', 'uglify', 'cssmin', 'htmlmin']);
};