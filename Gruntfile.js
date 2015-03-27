module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['src/angular-bootstrap-daterangepicker.js', 'test/**/*.js']
    },

    karma: {
      unit: {
        options: {
          basePath: './',
          frameworks: ['jasmine'],
          browsers: ['PhantomJS'],
          autoWatch: true,
          singleRun: true,
          files: [
            'src/components/jquery/dist/jquery.js',
            'src/components/angular/angular.js',
            'src/components/angular-mocks/angular-mocks.js',
            'src/components/bootstrap/dist/js/bootstrap.js',
            'src/components/moment/min/moment.min.js',
            'src/components/bootstrap-daterangepicker/daterangepicker.js',
            'src/angular-bootstrap-daterangepicker.js',
            'test/**/*.js']
        }
      }
    },

    uglify: {
       options: {
          preserveComments: 'some',
          sourceMap: 'dist/angular-bootstrap-daterangepicker.min.js.map',
          sourceMappingURL: 'angular-bootstrap-daterangepicker.min.js.map',
          report: 'min'
       },
       dist: {
          files: {
             'dist/angular-bootstrap-daterangepicker.min.js': ['src/angular-bootstrap-daterangepicker.js']
          }
       }
     }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'karma']);
};
