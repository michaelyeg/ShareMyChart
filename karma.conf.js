// Karma configuration
// Generated on Wed Nov 16 2016 18:43:24 GMT-0700 (Mountain Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      //this thing loads in ALPHABETICAL ORDER so if something isn't working, it's probably 100% this
      //there's a cleaner way to do this im sure but
      'http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js',
      'web/node_modules/rdfstore/dist/rdfstore.js',
      'web/Parameter.js',
      //'web/Graph.js',
      'web/*',
      //'web/bootstrap/**/*',
      'web/css/*',
      'src/test/*.js'
    ],


    // list of files to exclude
    exclude: [
        'web/func.js',
        'web/index.jsp',
        'web/superstore-small.ttl',
        'web/Graph.js',
        'web/BarChart.js',
        'web/lineGraph.js',
        'web/scatterplot.js',
        'web/dragndrop.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
