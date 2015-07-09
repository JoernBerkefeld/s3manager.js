/*global module */
/*jshint indent:2 */
module.exports = function(grunt) {
  // Do grunt-related things in here

// Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    basePath : 'app',
    // paths: {
    //   base : '<%= pkg.corePrefix %>-',
    //   core : '<%= pkg.corePrefix %>-<%= pkg.version %>'
    // },

    // copy maximized CSS and JS files as well as external dependencies 
    htmlcompressor: {
      options: {
        type: 'html',
        preserveServerScript: true,
        preservePhp: true,
        removeQuotes: true,
        removeSurroundingSpaces:"all",
        compressJs: true
      },
      debug: {
        files: {
          // dest : source
          '<%= basePath %>/client/client.min.html' : '<%= basePath %>/client/client.html'
        },
      },
      production: {
        files: {
          // dest : source
          '<%= basePath %>/public/client.min.html' : '<%= basePath %>/client/client.html'
        },
      }
    },
    compass: {                  // Task
      debug: {                   // Target
        options: {              // Target options
          sassDir: '<%= basePath %>/client/sass',
          cssDir: '<%= basePath %>/client/css',
          sourcemap: true,
          outputStyle: 'nested',
          environment: 'development'
        }
      },
      production: {                   // Target
        options: {              // Target options
          sassDir: '<%= basePath %>/client/sass',
          cssDir: '<%= basePath %>/public/css',
          sourcemap: false,
          outputStyle: 'compressed',
          environment: 'production'
        }
      },
    },
    autoprefixer: {
      options: {
        // Task-specific options go here.
        browsers: ['> 1%','last 2 versions', 'Firefox ESR', 'Opera 12.1', 'iOS >=6', 'Android >= 4', 'Explorer >= 9'],
        diff:false,
        // map:false
      },
      debug: {
        // Target-specific file lists and/or options go here.
        options: {
          map : true
          // Target-specific options go here.
        },
        // src: '<%= basePath %>/css/*.css',
        // dest: '<%= basePath %>/css/ap/*.css'
        files: {
          // dest : source
          '<%= basePath %>/client/css/style.css': ['<%= basePath %>/client/css/style.css']
        }
      },
      production: {
        // Target-specific file lists and/or options go here.
        options: {
          // Target-specific options go here.
        },
        // src: '<%= basePath %>/css/*.css',
        // dest: '<%= basePath %>/css/ap/*.css'
        files: {
          // dest : source
          '<%= basePath %>/public/css/style.css': ['<%= basePath %>/public/css/style.css']
        }
      },
    },
    cssmin: {
      production: {
        // options: {
        //   banner: '/* NLV core <%= pkg.version %> */'
        // },
        files: {
          // dest : source
          '<%= basePath %>/public/css/style.css': ['<%= basePath %>/public/css/style.css']
        }
      }
    },
    closureCompiler:  {
      options: {
        // [REQUIRED] Path to closure compiler
        compilerFile: '../compiler.jar',

        // [OPTIONAL] set to true if you want to check if files were modified
        // before starting compilation (can save some time in large sourcebases)
        checkModified: false,

        // [OPTIONAL] Set Closure Compiler Directives here
        compilerOpts: {
          /**
           * Keys will be used as directives for the compiler
           * values can be strings or arrays.
           * If no value is required use null
           *
           * The directive 'externs' is treated as a special case
           * allowing a grunt file syntax (<config:...>, *)
           *
           * Following are some directive samples...
           */
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          language_in: 'ECMASCRIPT5',
          // language_in: 'ECMASCRIPT5_STRICT',
          externs: [
            // '<%= basePath %>/client-js/lib/jquery-2.1.4.js',
            '<%= basePath %>/client/js/lib/jquery-2.1.4.min.js',
            '<%= basePath %>/client/js/lib/socket.io-1.3.5.min.js',
            '<%= basePath %>/client/js/lib/notification-1.0.0.min.js',
            '<%= basePath %>/client/js/lib/intro-1.0.0.min.js',
            '<%= basePath %>/client/js/lib/tabcomplete-1.5.1.min.js'
          ],
          // externs: [
            // '<%= basePath %>/client/js/lib/jquery-2.1.4.min.js'
          // ],
          // define: ["'goog.DEBUG=false'"],
          warning_level: 'quiet',
          // warning_level: 'verbose',
          // jscomp_off: ['checkTypes', 'fileoverviewTags'],
          summary_detail_level: 3,
          // create_source_map: 'deploy/<%= pkg.version %>/<%= paths.core %>.map',
          source_map_format: 'V3'
          // output_wrapper: '(function(){%output%}).call(this);'
        }
      },
      // any name that describes your task
      production: {

        // [OPTIONAL] Target files to compile. Can be a string, an array of strings
        // or grunt file syntax (<config:...>, *)
        src: [
          '<%= basePath %>/client/js/client.js'
        ],

        // [OPTIONAL] set an output file
        dest: '<%= basePath %>/public/js/client.js'
      }
    },
    nodemon: {

     // set NODE_ENV=debug&&nodemon --verbose --ignore \"data/*\" --ignore \"sass/*\" --ignore \"client-js/*\" --delay 500ms video/app.js

      dev: {
        script: '<%= basePath %>/app.js',
        options: {
          // nodeArgs: ['--debug'],
          env: {
            // PORT: '5455'
            NODE_ENV: 'debug'
          },
          delay: 500,
          watch: [
            '<%= basePath %>',
            '<%= basePath %>/server'
          ],
          ext: 'js',
          ignore: [
            // 'node_modules/**',
            '<%= basePath %>/client',
            '<%= basePath %>/data/**',
            '<%= basePath %>/log/**'
          ]
          // omit this property if you aren't serving HTML files and 
          // don't want to open a browser tab on start
          // callback: function (nodemon) {
          //   nodemon.on('log', function (event) {
          //     console.log(event.colour);
          //   });

          //   // opens browser on initial server start
          //   // nodemon.on('config:update', function () {
          //   //   // Delay before server listens on port
          //   //   setTimeout(function() {
          //   //     require('open')('http://localhost:5500');
          //   //   }, 1000);
          //   // });

          //   // refreshes browser when server reboots
          //   // nodemon.on('restart', function () {
          //   //   // Delay before server listens on port
          //   //   setTimeout(function() {
          //   //     require('fs').writeFileSync('.rebooted', 'rebooted');
          //   //   }, 1000);
          //   // });
          // }
        }
      }
    },
    watch: {
      sass: {
        options: {
          livereload: false,
          // spawn : true
        },
        files: ['<%= basePath %>/client/sass/**/*.scss'],
        // tasks: ['compass','autoprefixer','cssmin'],
        tasks: ['compass:debug','autoprefixer:debug'],
      },
      livereload: {
        options: {
          livereload: true,
          // spawn : false
        },
        files: [
          '<%= basePath %>/client/css/*.css',
          '<%= basePath %>/client/js/*',
          '<%= basePath %>/client/client.html'
        ]
      },
      // css: {
      //   files: '<%= basePath %>/css/*.css',
      //   tasks: ['compass','autoprefixer','cssmin'],
      // },
      // js: {
      //   files: ['<%= basePath %>/client-js/*.js'],
      //   tasks: ['closureCompiler'],
      // },
      html: {
        files: ['<%= basePath %>/client/client.html'],
        tasks: ['htmlcompressor:debug'],
      },
    },
    shell: {
        // options: {
        //     stderr: false
        // },
        // greet: {
        //     command: 'echo trying to update caniuse-db...'
        // },
        updateAutoPrefixerDB: {
            command: 'npm update caniuse-db'
        }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      debug: {
        tasks: [
          'nodemon',
          // 'node-inspector',
          'watch'],
        // options: {
        //   logConcurrentOutput: true
        // }
      },
      // inspect: {
      //   tasks: [
      //     // 'nodemon',
      //     'node-inspector',
      //     'watch'],
      //   // options: {
      //   //   logConcurrentOutput: true
      //   // }
      // },
      updateDebug: {
        tasks: [
          'shell',
          'compass:debug',
          'htmlcompressor:debug'
        ]
      },
      production: {
        tasks: [
          'shell',
          'compass:production',
          'htmlcompressor:production',
          'closureCompiler',
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-closure-tools');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-htmlcompressor');
  // grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-shell');


  // Default task(s).
  grunt.registerTask('default', ['concurrent:production','autoprefixer:production','cssmin']);
  grunt.registerTask('debug', ['shell','concurrent:debug']);
  grunt.registerTask('updatedebug', ['concurrent:updateDebug','autoprefixer:debug']);

};