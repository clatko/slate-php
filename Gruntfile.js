module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        // sass: {
        //     dist: {
        //         options: {
        //             // style: 'expanded'
        //             // expand: true
        //         },
        //         files: {
        //             'assets/css/slate.css': ['assets/css/src/print.scss']
        //         }
        //     }
        // },

        cssmin: {
            combine: {
                // options: {
                //     banner: '/* Slate, yo */'
                // },
                files: {
                    // expand: true,
                    'assets/css/slate.min.css': [
                        // 'assets/css/slate.css'
                        'assets/css/src/screen.css',
                        'assets/css/src/extended.css',
                        'assets/css/src/custom.css',
                        'assets/css/src/jquery-ui.min.css',
                        'assets/css/src/jquery-ui.structure.min.css',
                        'assets/css/src/jquery.datetimepicker.css'
                    ],
                'assets/css/print.min.css' : [
                		'assets/css/src/print.css'
                	]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', [ 'cssmin']);

};