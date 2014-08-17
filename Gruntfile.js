module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Minify JS
    uglify: {
      minify: {
        files: {
          'script/elum.min.js': [
                                  'script/Levels.js',
                                  'script/Block.js',
                                  'script/Grid.js',
                                  'script/Game.js',
                                  'script/UserInterface.js',
                                  'script/main.js'
                                ]
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);

};
