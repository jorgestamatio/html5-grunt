'use strict';
module.exports = function(grunt) {

    var configs = {   
      
      css_combine_files : [
        'src/vendor/font-awesome.css',
        'dist/css/style.css'],
      
      js_plugins : [
        'src/js/vendor/jquery-1.10.1.min.js',
        'src/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js',
        'src/js/vendor/headroom.js',
        'src/js/vendor/parallax.js',
        'src/js/vendor/handlebars-v4.0.5.js',
        'src/js/vendor/isotope.pkgd.min.js',
        'src/js/plugins.js'
        ]
      
    }

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger sass, jshint, uglify and livereload
        watch: {
            sass: {
                files: ['src/scss/**/*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer', 'cssmin']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            },
            images: {
                files: ['images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        },

        // sass
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                },
                files: {
                    'dist/css/style.css': 'src/scss/style.scss'
                }
            }
        },

        // autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
                map: true
            },
            files: {
                expand: true,
                flatten: true,
                src: 'dist/css/*.css',
                dest: 'dist/css'
            },
        },

        // css minify
        cssmin: {
            combine: {
                files: {
                    'dist/css/style.min.css' : configs.css_combine_files
                }
            }
        },

        // image sprites
        sprite: {
            all: {
                src: 'images/sprites/*.png',
                dest: 'images/spritesheet.png',
                destCss: 'src/scss/partials/_spritesheet.scss',
                padding: 30,
                cssFormat: 'css',
                imgPath: 'images/spritesheet.png'
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'src/js/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            plugins: {
                options: {
                    sourceMap: 'dist/js/plugins.js.map',
                    sourceMappingURL: 'plugins.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'dist/js/plugins.min.js': configs.js_plugins
                }
            },
            main: {
                options: {
                    sourceMap: 'dist/js/main.js.map',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'dist/js/main.min.js': [
                        'src/js/main.js'
                    ]
                }
            }
        },

        /**
         * Build bower components
         * https://github.com/yatskevich/grunt-bower-task
         */
        bower: {
          dev: {
            dest: 'components/'
          },
          dist: {
            dest: 'dist/components/'
          }
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/'
                }]
            }
        },

        // browserSync
        browserSync: {
            dev: {
                bsFiles: {
                    src : ['dist/css/style.min.css', 'dist/js/*.js', 'images/**/*.{png,jpg,jpeg,gif,webp,svg}','*.{html,php}']
                },
                options: {
                    proxy: "localhost.dev/repos/html5-bp-grunt",
                    watchTask: true,
                    browser: "safari"
                }
            }
        },

        // deploy via rsync
        deploy: {
            options: {
                src: "./",
                args: ["--verbose"],
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc','src'],
                recursive: true,
                syncDestIgnoreExcl: true
            },
            staging: {
                 options: {
                    dest: "~/www/path-to-folder-no-trailing-slash",
                    host: "username@jswebdev.ch"
                }
            },
            production: {
                options: {
                    dest: "~/www/path-to-folder-no-trailing-slash",
                    host: "username@jswebdev.ch"
                }
            }
        }

    });

    // Load in `grunt-spritesmith`
    grunt.loadNpmTasks('grunt-spritesmith');


    // rename tasks
    grunt.renameTask('rsync', 'deploy');

    // register task
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'uglify', 'bower', 'browserSync', 'watch']);

    grunt.registerTask('build', ['sass', 'autoprefixer', 'cssmin', 'uglify', 'imagemin']);

};
