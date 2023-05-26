module.exports = function (grunt) {
  // Load all tasks
  require("load-grunt-tasks")(grunt);
  // Show elapsed time
  require("time-grunt")(grunt);
  var serveStatic = require("serve-static");

  grunt.initConfig({
    jshint: {
      files: ["Gruntfile.js", "src/**/*.js", "test/**/*.js"],
      options: {
        globals: {
          jQuery: true,
        },
      },
    },
    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["jshint"],
    },
    uglify: {
      options: {
        mangle: true,
      },
      app: {
        files: {
          "dist/poc-webapp.min.js": ["dist/poc-webapp.js"],
        },
      },
    },
    concat: {
      dist: {
        options: {
          separator: ";",
        },
        src: ["tmp/templates.js", "src/**/*.js"],
        dest: "dist/poc-webapp.js",
      },
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: "src",
          keepalive: true,
          open: true,
          livereload: true,
        },
      },
    },
    auto_install: {
      local: {},
    },
  });
  
  // Register a build task to run on 'grunt build', will add more to minify and uglify etc
  grunt.registerTask("build", ["auto_install", "concat", "uglify", "html2js", "clean"]);

  // Register a dev task to run on 'grunt dev'
  grunt.registerTask("dev", ["connect", "jshint"]);

  //Register a default task to run on 'grunt'
  grunt.registerTask("default", ["jshint"]);
};
