var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  var testemConfig = grunt.file.readJSON('testem.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      less: {
        files: ['app/styles/less/**/*.less'],
        tasks: ['less:compile']
      },
      handlebars: {
        files: ['app/templates/**/*.hbs'],
        tasks: ['handlebars']
      },
      livereload: {
        options: { livereload: true },
        files: ['build/*', 'compiled_template/*']
      },
      requirejs: {
          files: ['app/**/*.js'],
          tasks: ['jshint', 'handlebars', 'requirejs', 'testem']
      },
      jsTests: {
        files: ['tests/spec-runner-template.html', 'tests/**/*.js'],
        tasks: ['jshint', 'testem']
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: ['app/html', '.'],
          hostname: 'localhost',
          keepalive: true,
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
                options.base = [options.base];
            }

            // Setup the proxy
            var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

            // Serve static files
            options.base.forEach(function(base) {
                middlewares.push(connect.static(base));
            });

            // Make directory browse-able
            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        },
        proxies: [
          {
            context: [
              '/api/v1',
              '/static/rest_framework'
            ],
            host: '127.0.0.1',
            port: 8000,
            changeOrigin: true
          }
        ]
      }
    },
    less: {
      compile: {
        options: {
          relativeUrls: true,
          dumpLineNumbers: 'comments',
          compress: false
        },
        files: {
          'app/styles/css/app.css': 'app/styles/less/app.less'
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          amd: true,
          namespace: false
        },
        files: [{
          expand: true,
          cwd: 'app/templates',
          src: ['**/*.hbs'],
          dest: 'compiled_templates/',
          ext: '.js'
        }]
      }
    },
    jshint: {
      configs: [
        'Gruntfile.js',
        'package.json',
        'bower.json'
      ],
      mvc: ['app/**/*.js'],
      jstests: ['tests/**/*.js']
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'requirejs-config.js'
        }
      }
    },
    testem: {
      local: {
        src: testemConfig.src_files,
        options: testemConfig
      }
    },
    env : {
      phantom : {
        push : {
          PATH : {
            value : 'node_modules/grunt-contrib-jasmine/node_modules/grunt-lib-phantomjs/node_modules/.bin',
            delimiter : ':'
          }
        }
      }
    }
  });

  grunt.registerTask('default', [
    'less',
    'handlebars',
    'requirejs',
    'watch'
  ]);

  grunt.registerTask('test', [
    'env:phantom',
    'testem'
  ]);

  grunt.registerTask('build', [
    'less',
    'jshint',
    'handlebars',
    'requirejs'
  ]);

  grunt.registerTask('server', function (target) {
    return grunt.task.run([
      'build',
      'configureProxies:server',
      'connect:server'
    ]);
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');
};

