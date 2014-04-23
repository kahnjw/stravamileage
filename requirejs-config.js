var require = {
  name: 'strava-mileage',
  insertRequire: ['app/strava-mileage'],
  baseUrl: 'app/',
  map: {
    '*':{
      //build-time mapping
      'underscore': 'lodash'
    }
  },
  paths: {
    console: '../bower_components/h5bp-console-polyfill/console',
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    lodash: '../bower_components/lodash/dist/lodash',
    handlebars: '../bower_components/handlebars/handlebars.runtime',
    bootstrap: '../bower_components/bootstrap/js',
    q: '../bower_components/q/q.js',
    'jquery.cookie': '../bower_components/jquery.cookie/jquery.cookie',
    templates: '../compiled_templates'
  },
  shim: {
    'jquery.cookie': {
      deps: ['jquery']
    },
    'bootstrap/bootstrap-transition': {
      deps: ['jquery']
    },
    'handlebars': {
      exports: 'Handlebars'
    },
  },
  out: 'build/compiled.js',
  keepBuildDir: true,
  optimize: 'none',
  optimizeCss: 'none'
};
