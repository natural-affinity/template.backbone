'use strict';
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var gconf = {
    src: {
      root: 'src',
      images: 'src/images',
      styles: 'src/sass',
      scripts: 'src/scripts',
      templates: 'src/templates'
    },
    staging: {
      root: '.tmp'
    },
    dist: {
      root: 'dist',
      fonts: 'dist/fonts',
      images: 'dist/images',
      styles: 'dist/styles',
      scripts: 'dist/scripts'
    }
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: grunt.file.readJSON(grunt.option('env') || 'conf/local.json'),
    pretty: grunt.option('pretty') || true,
    gconf: gconf,
    clean: {
      dist: ['<%= gconf.staging.root %>', '<%= gconf.dist.root %>']
    },
    copy: {
      fonts: {
        expand: true,
        dot: true,
        flatten: true,
        cwd: 'bower_components/',
        src: 'font-awesome/fonts/**/*.{svg,otf,eot,woff,woff2}',
        dest: '<%= gconf.dist.fonts %>/'
      },
      images: {
        expand: true,
        dot: true,
        flatten: true,
        cwd: '<%= gconf.src.images %>',
        dest: '<%= gconf.dist.images %>/',
        src: '*.{ico,png}'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        src: ['<%= gconf.src.styles %>/main.scss'],
        dest: '<%= gconf.staging.root %>/main.min.css'
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      dist: {
        src: '<%= gconf.staging.root %>/main.min.css',
        dest: '<%= gconf.dist.styles %>/main.min.css'
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: '<%= app.namespace %>.Templates',
          processName: function(filePath) {
            return filePath.replace(/^src\/templates\//, '').replace(/\.hbs$/, '');
          }
        },
        files: {
          '<%= gconf.staging.root %>/templates.js': '<%= gconf.src.root %>/**/*.hbs'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= gconf.src.scripts %>/**/*.js'
      ]
    },
    uglify: {
      options: {
        compress: true,
        expand: true,
        dot: true,
        mangle: {
          except: ['jQuery', 'Backbone']
        }
      },
      legacy: {
        files: {
          '<%= gconf.dist.scripts %>/legacy.min.js': [
            'bower_components/html5shiv/dist/html5shiv.min.js',
            'bower_components/respond/dest/respond.min.js',
            'bower_components/polyfills-pkg/dist/polyfills-pkg.min.js'
          ]
        }
      },
      libs: {
        files: {
          '<%= gconf.dist.scripts %>/lib.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/underscore/underscore-min.js',
            'bower_components/backbone/backbone.js',
            'bower_components/handlebars/handlebars.runtime.min.js'
          ]
        }
      },
      dist: {
        files: {
          '<%= gconf.dist.scripts %>/app.min.js': [
            '<%= gconf.src.scripts %>/app.js',
            '<%= gconf.src.scripts %>/handlebars/**/*.js',
            '<%= gconf.staging.root %>/templates.js',
            '<%= gconf.src.scripts %>/mixins/**/*.js',
            '<%= gconf.src.scripts %>/models/**/*.js',
            '<%= gconf.src.scripts %>/collections/**/*.js',
            '<%= gconf.src.scripts %>/views/**/*.js',
            '<%= gconf.src.scripts %>/master.js',
            '<%= gconf.src.scripts %>/manager.js',
            '<%= gconf.src.scripts %>/bootstrap.js'
          ]
        }
      }
    },
    jade: {
      options: {
        pretty: '<%= pretty %>',
        data: {
          name: grunt.option('name') || '<%= app.name %>',
          version: grunt.option('version') || '<%= pkg.version %>'
        }
      },
      compile: {
        files: {
          '<%= gconf.dist.root %>/index.html': '<%= gconf.src.root %>/index.jade'
        }
      }
    },
    'regex-replace': {
      endpoints: {
        src: ['<%= gconf.dist.root %>/index.html %>', '<%= gconf.dist.scripts %>/app.min.js'],
        actions: [{
          name: 'replace-api-url',
          search: 'https://app.domain.com/api',
          replace: '<%= app.api %>',
          flags: 'g'
        }]
      },
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost',
        open: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>',
        middleware: function(connect) {
          return [
            connect.static(gconf.dist.root)
          ];
        }
      },
      dev: {},
      dist: {
        options: {
          livereload: false,
          keepalive: true
        }
      }
    },
    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['js', 'replace']
      },
      jade: {
        files: ['<%= gconf.src.root %>/*.jade'],
        tasks: ['jade', 'replace'],
        options: {
          livereload: true
        }
      },
      handlebars: {
        files: ['<%= gconf.src.templates %>/**/*.hbs'],
        tasks: ['handlebars', 'js', 'replace']
      },
      js: {
        files: ['<%= gconf.src.scripts %>/**/*.js'],
        tasks: ['handlebars', 'js', 'replace'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['<%= gconf.src.styles %>/*.scss'],
        tasks: ['css', 'jade', 'replace']
      },
      other: {
        files: ['<%= gconf.src.images %/*.{png,ico}',
          '<%= gconf.src.fonts %>/*.{svg,otf,eot,woff}'
        ],
        tasks: ['copy:fonts', 'copy:images']
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (!target) {
      target = 'dist';
    }

    grunt.task.run([
      'build',
      'connect:' + target,
      'watch'
    ]);
  });

  grunt.registerTask('js', ['jshint', 'uglify']);
  grunt.registerTask('css', ['sass', 'autoprefixer']);
  grunt.registerTask('replace', ['regex-replace']);
  grunt.registerTask('build', ['clean', 'copy', 'css', 'handlebars', 'js', 'jade', 'replace']);
  grunt.registerTask('default', ['build']);
};
