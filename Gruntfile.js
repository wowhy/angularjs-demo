module.exports = function (grunt) {
    var alias = require("browserify-alias-grunt");

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
                files: [{ expand: true, cwd: 'src', src: ['assets/**/*.{png,jpg,gif,ico}'], dest: 'dist' }]
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
            options: {
                alias: alias.map(grunt, [{
                        cwd: "src/components/utilities",
                        src: ["**/*.js"],
                        dest: "utility"
                    }, {
                        cwd: "src/components/directives",
                        src: ["**/*.js"],
                        dest: "directive"
                    }, {
                        cwd: "src/components/filters",
                        src: ["**/*.js"],
                        dest: "filter"
                    }, {
                        cwd: "src/services",
                        src: ["**/*.js"],
                        dest: "service"
                    }, {
                        cwd: "src/modules",
                        src: ["**/*.js"],
                        dest: ""
                    }, {
                        cwd: "src/",
                        src: ["core.js", "app.js"],
                        dest: ""
                    }
                ])
            },
            'app': {
                src: ['src/app.js'],
                dest: 'src/main.js'
            }
        },

        // 压缩JS文件
        uglify: {
            dist: {
                files: {
                    'dist/main.js': ['<%= browserify.app.dest %>']
                }
            }
        },

        // 压缩CSS文件
        cssmin: {
            options: { report: 'gzip' },
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
                src: ['*.html', '**/*.html'],
                dest: 'dist'
            }
        },

        watch: {
            assets: {
                files: ['src/assets/**/*.*', 'src/**/*.html'],
                tasks: ['default']
            },
            scripts: {
                files: ['src/components/**/*.js', 'src/modules/**/*.js', 'src/services/**/*.js', 'src/app.js', 'src/core.js'],
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