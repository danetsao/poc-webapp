module.exports = function(grunt) {

    grunt.initConfig({
      jshint: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        options: {
          globals: {
            jQuery: true
          }
        }
      },
      watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      connect: {
        server: {
            options: {
                port: 9001,
                base: 'src',
                keepalive: true
                }
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Register a build task to run on 'grunt build', will add more to minify and uglify etc
    grunt.registerTask('build', ['jshint']);
    
    // Register a default task to run on 'grunt'
    grunt.registerTask('default', ['connect', 'jshint']);
  
  };