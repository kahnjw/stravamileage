module.exports = function(grunt) {
  "use strict";

  require("load-grunt-tasks")(grunt);

  var testemConfig = grunt.file.readJSON("testem.json");

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000,
          base: ['app/html', './'],
          hostname: 'localhost',
          keepalive: true
        }
      }
    },
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      less: {
        files: ["app/styles/less/**/*.less"],
        tasks: ["less:compile"]
      },
      handlebars: {
        files: ["app/templates/**/*.hbs"],
        tasks: ["handlebars"]
      },
      livereload: {
        options: { livereload: true },
        files: ["build/*", "compiled_template/*"]
      },
      requirejs: {
          files: ["app/**/*.js"],
          tasks: ["jshint", "handlebars", "requirejs", "testem"]
      },
      jsTests: {
        files: ["tests/spec-runner-template.html", "tests/**/*.js"],
        tasks: ["jshint", "testem"]
      }
    },
    less: {
      compile: {
        options: {
          relativeUrls: true,
          dumpLineNumbers: "comments",
          compress: false
        },
        files: {
          "app/styles/css/app.css": "app/styles/less/app.less"
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
          cwd: "app/templates",
          src: ["**/*.hbs"],
          dest: "compiled_templates/",
          ext: ".js"
        }]
      }
    },
    jshint: {
      configs: [
        "Gruntfile.js",
        "package.json",
        "bower.json"
      ],
      mvc: ["app/**/*.js"],
      jstests: ["tests/**/*.js"]
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: "requirejs-config.js"
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
            value : "node_modules/grunt-contrib-jasmine/node_modules/grunt-lib-phantomjs/node_modules/.bin",
            delimiter : ":"
          }
        }
      }
    }
  });

  grunt.registerTask("default", [
    "less",
    "handlebars",
    "requirejs",
    "watch"
  ]);

  grunt.registerTask("test", [
    "env:phantom",
    "testem"
  ]);

  grunt.registerTask("build", [
    "less",
    "jshint",
    "handlebars",
    "requirejs"
  ]);

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-react');
};

