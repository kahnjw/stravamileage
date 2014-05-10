module.exports = function(grunt) {
  'use strict';

  var stringify = require('stringify');
  require('load-grunt-tasks')(grunt);

  var testemConfig = grunt.file.readJSON('testem.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      less: {
        files: ['app/styles/less/**/*.less'],
        tasks: ['less:compile']
      },
      livereload: {
        options: { livereload: true },
        files: ['build/*', 'compiled_template/*']
      },
      browserify: {
        files: ['app/**/*.js'],
        tasks: ['jshint', 'browserify', 'testem']
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: ['app/html', '.'],
          hostname: '0.0.0.0',
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
              '/api',
              '/static/rest_framework'
            ],
            host: 'stravamileage.com',
            port: 8000,
            xforward: true
          }
        ]
      }
    },
    browserify: {
      client: {
        src: ['app/**/*.js'],
        dest: 'build/stravamileage.js',
        options: {
          transform: [stringify(['.rvt'])]
        }
      },
      testBundle: {
        src: ['tests/**/*.js'],
        dest: 'test-bundles/tests.js',
        options: {
          transform: [stringify(['.rvt'])]
        }
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
    jshint: {
      options: {
        jshintrc: true,
      },
      mvc: ['app/**/*.js'],
      jstests: ['tests/**/*.js']
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
    'browserify:client',
    'watch'
  ]);

  grunt.registerTask('test', [
    'browserify:testBundle',
    'env:phantom',
    'testem'
  ]);

  grunt.registerTask('build', [
    'less',
    'jshint',
    'browserify:client'
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
  grunt.loadNpmTasks('grunt-browserify');
};
