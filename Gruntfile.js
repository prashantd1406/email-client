'use strict';

module.exports = function (grunt) {
    var pkg = require('./package.json');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    
    var appConfig = {
        rootFolders: {
            src: 'src',
            tmp: '.tmp',
            app: 'src/app',
            mocks: 'src/mocks',
            dist: 'dist',
            scss: '../scss'
        }
    };

    var taskConfig = {
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: [
                    '<%= rootFolders.app %>/app.js',
                    '<%= rootFolders.app %>/**/*.boot.js',
                    '<%= rootFolders.app %>/**/*.module.js',
                    '<%= rootFolders.app %>/**/*.config.js',
                    '<%= rootFolders.app %>/**/*.service.js',
                    '<%= rootFolders.app %>/**/*.filter.js',
                    '<%= rootFolders.app %>/**/*.directive.js',
                    '<%= rootFolders.app %>/**/*.controller.js'
                ]
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= rootFolders.dist %>',
                        '!<%= rootFolders.dist %>/.git*',
                        '!<%= rootFolders.dist %>/Procfile'
                    ]
                }]
            },
            app: '.tmp'
        },
        injector: {
            options: {
                lineEnding: grunt.util.linefeed
            },
            scripts: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/src/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->',
                },
                files: {
                    'src/index.html': [
                        '<%= rootFolders.app %>/app.js',
                        '<%= rootFolders.app %>/**/*.boot.js',
                        '<%= rootFolders.app %>/**/*.module.js',
                        '<%= rootFolders.app %>/**/*.config.js',
                        '<%= rootFolders.app %>/**/*.service.js',
                        '<%= rootFolders.app %>/**/*.filter.js',
                        '<%= rootFolders.app %>/**/*.directive.js',
                        '<%= rootFolders.app %>/**/*.controller.js'
                    ]
                }
            },
            cleanMocks: {
                options: {
                    transform: function(filePath) {
                        filePath = filePath.replace('/app/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:mocks -->',
                    endtag: '<!-- endinjector -->',
                },
                files: {
                    'src/index.html': []
                }
            },
            mocks: {
                options: {
                    transform: function(filePath) {
                        filePath = filePath.replace('/src/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:mocks -->',
                    endtag: '<!-- endinjector -->',
                },
                files: {
                    'src/index.html': [
                        '<%= rootFolders.mocks %>/backend.mock.js',
                        '<%= rootFolders.mocks %>/**/*.model.js'
                    ]
                }
            }, 
            sass: {
                options: {
                    transform: function(filePath) {
                        filePath = filePath.replace('/src/app/', '');
                        return '@import \'' + filePath + '\';';
                    },
                    starttag: '// injector',
                    endtag: '// endinjector'
                },
                files: {
                    '<%= rootFolders.app %>/app.scss': [
                    '<%= rootFolders.app %>/**/*.scss',
                    '!<%= rootFolders.app %>/app.scss'
                    ]
                }    
            },
            test: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/src/app/', 'src/app/');
                        return "'" + filePath + "',";
                    },
                    starttag: '// injector:js',
                    endtag: '// endinjector'
                },
                files: {
                    'karma.conf.js': [
                        ['<%= rootFolders.app %>/app.js',
                            '<%= rootFolders.app %>/**/*.boot.js',
                            '<%= rootFolders.app %>/**/*.module.js',
                            '<%= rootFolders.app %>/**/*.config.js',
                            '<%= rootFolders.app %>/**/*.directive.js',
                            '<%= rootFolders.app %>/**/*.service.js',
                            '<%= rootFolders.app %>/**/*.filter.js',
                            '<%= rootFolders.app %>/**/*.controller.js',
                            '<%= rootFolders.app %>/**/*.spec.js'
                        ]
                    ]
                }
            }
        },
        wiredep: {
            appIndex: {
                devDependencies: true,
                src: ['<%= rootFolders.src %>/index.html'],
                ignorePath: /\.\.\//
            },
            distIndex: {
                src: ['<%= rootFolders.src %>/index.html'],
                ignorePath: /\.\.\//
            },
            scss: {
                src: ['<%= rootFolders.app %>/app.scss'],
                ignorePath: /\.\.\//
            },
            test: {
                devDependencies: true,
                src: 'karma.conf.js',
                ignorePath: /\.\.\//,
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            }
        },
        sass: {
            options: {
                includePaths: ['<%= rootFolders.src %>']
            },
            app: {
                files: {
                    '<%= rootFolders.tmp %>/assets/styles/app.css': '<%= rootFolders.app %>/app.scss'
                },
                options: {
                    sourceMap: true
                }
            },
            dist: {
                files: {
                    '<%= rootFolders.tmp %>/assets/styles/app.css': '<%= rootFolders.app %>/app.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['ie 10', 'opera 12', 'ff 15', 'chrome 25', 'last 2 version']
            },
            css: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/styles',
                    src: '{,*/}*.css',
                    dest: '.tmp/assets/styles'
                }]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '127.0.0.1',
                livereload: true
            },

            app: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('src'),
                            connect.static('.tmp')
                        ];
                    }
                }
            }
        },
        watch: {
            jshint: {
                files: [
                    '<%= rootFolders.app %>/app.js',
                    '<%= rootFolders.app %>/**/*.boot.js',
                    '<%= rootFolders.app %>/**/*.module.js',
                    '<%= rootFolders.app %>/**/*.config.js',        
                    '<%= rootFolders.app %>/**/*.service.js',
                    '<%= rootFolders.app %>/**/*.filter.js',
                    '<%= rootFolders.app %>/**/*.directive.js',
                    '<%= rootFolders.app %>/**/*.controller.js'
                ],
                tasks: ['jshint']
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            angular: {
                files: [
                    '<%= rootFolders.app %>/app.js',
                    '<%= rootFolders.app %>/**/*.boot.js',
                    '<%= rootFolders.app %>/**/*.module.js',
                    '<%= rootFolders.app %>/**/*.config.js',
                    '<%= rootFolders.app %>/**/*.service.js',
                    '<%= rootFolders.app %>/**/*.filter.js',
                    '<%= rootFolders.app %>/**/*.directive.js',
                    '<%= rootFolders.app %>/**/*.controller.js'
                ],
                tasks: ['injector:scripts']
            },
            mocks: {
                files: [
                    '<%= rootFolders.mocks %>/backend.mock.js',
                    '<%= rootFolders.mocks %>/**/*.model.js'
                ],
                tasks: ['injector:mocks']
            },
            scss: {
                files: ['<%= rootFolders.app %>/**/*.scss', 'src/scss/**/*.scss'],
                tasks: ['injector:sass', 'sass:app', 'autoprefixer']
            },
            livereload: {
                options: {
                  livereload: '<%= connect.options.livereload %>'
                },
                files: [
                  '<%= rootFolders.src %>/index.html',
                    'src/views/*.html',
                    'src/views/**/*.template.html',
                  '<%= rootFolders.app %>/**/*.template.html',
                  '.tmp/assets/styles/*.css',
                  '<%= rootFolders.src %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        useminPrepare: {
            html: ['<%= rootFolders.src %>/index.html'],
            options: {
                staging: '.tmp',
                dest: '<%= rootFolders.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        ngtemplates: {
            options: {
                module: 'app',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                usemin: 'scripts/app.js'
            },
            main: {
                cwd: '<%= rootFolders.src %>',
                src: ['app/**/*.template.html'],
                dest: '.tmp/templates.js'
            }
        },
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= rootFolders.src %>',
                        dest: '<%= rootFolders.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'index.html',
                            'assets/images/**',
                            'assets/fonts/**',
                            'server/app.js',
                            'Procfile',
                            'package.json',
                            'app/api-settings.json'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= rootFolders.src %>',
                        src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                        dest: '<%= rootFolders.dist %>'
                    }
                ] 
            },
            
            mocks: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= rootFolders.src %>',
                    dest: '<%= rootFolders.dist %>',
                    src: [
                        '*.html',
                        '!scss',
                        '!index.html'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= rootFolders.src %>',
                    src: 'screenshot/archive/*',
                    dest: '<%= rootFolders.dist %>'
                }]
            }
        },
        filerev: {
            dist: {
                src: [
                    '<%= rootFolders.dist %>/scripts/{,*/}*.js',
                    '<%= rootFolders.dist %>/assets/styles/{,*/}*.css',
                    '<%= rootFolders.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= rootFolders.dist %>/dist/assets/styles/fonts/*'
                ]
            }
        },
        usemin: {
            html: ['<%= rootFolders.dist %>/index.html'],
            css: ['<%= rootFolders.dist %>/assets/styles/{,*/}*.css'],
            options: {
                assetsDirs: [
                    '<%= rootFolders.dist %>',
                    '<%= rootFolders.dist %>/assets/images',
                    '<%= rootFolders.dist %>/assets/styles'
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        protractor: {
            options: {
                configFile: "e2e-tests/protractor.config.js",
                noColor: false,
                args: { }
            },
            e2e: {
                options: {
                  keepAlive: false
                }
            },
            continuous: {
                options: {
                  keepAlive: true
                }
            }
        },
        buildcontrol: {
            options: {
                dir: 'dist',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            'heroku_testing': {
                options: {
                   branch: 'master',
                    connectCommits: false
                }
            }
        }           
    };
    
    grunt.initConfig(grunt.util._.extend(taskConfig, appConfig));
    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        grunt.task.run([
          'jshint',
          'clean:app',
          'injector',
          'wiredep:appIndex',
          'wiredep:scss',
          'sass:app',
          'autoprefixer',
          'connect:app',
          'watch'
        ]);
    });
}