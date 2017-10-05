module.exports = function(grunt) {

	grunt.initConfig({
		
		csslint:{
			options:{
				"important":false,
				"regex-selectors":false,
				"unique-headings":false,
				"universal-selector":false,
				"unqualified-attributes":false,
				"box-sizing":false,
				"outline-none":false,
				"compatible-vendor-prefixes":false,
				"adjoining-classes":false,
				"qualified-headings":false,
				"vendor-prefix":false,
				"box-model":false,
				"ids":false,
				"fallback-colors":false,
				"display-property-grouping":false,
				"font-sizes":false,
				"known-properties":false,
				"overqualified-elements":false,
                "star-property-hack":false
			},
			src:['source/css/*.css']
		},
		jshint:{
			src:['source/js/*.js']
		},
		useminPrepare:{
			html: {
				src:['source/html/*.html']
			},
			options: {
				dest:'build/'
			}
		},
		cssmin:{
			combine:{
				files: {
				'build/css/all.css':['source/css/*.css']
				}
			}
		},
		uglify:{
			build:{
				files:{
					'build/js/custom.js':['source/js/plugins.js','source/js/main.js'],
					'build/js/vendor.js':['source/js/vendor/jquery-1.10.2.min.js',
                                          'source/js/vendor/jquery-magnific-popup.js',
                                          'source/js/vendor/owl.carousel.js',
                                         ]
				}
			}
		},		
		usemin:{
			html:['build/html/*.html']
		},
		copy:{
			html:{
				expand:true,
				cwd:'source/',
				src:['html/*.html'],
				dest:'build/'
			},
			images:{
				expand:true,
				cwd:'source/img/',
				src:'**',dest:'build/img/'
			},
			fonts:{
				expand:true,
				cwd:'source/font/',
				src:'**',dest:'build/font/'
			},			
			modernizr: {
				expand:true,
				cwd:'source/js/vendor/',
				src:'modernizr-2.6.2.min.js',dest:'build/js/'
			}
		},
		jade: {
            compile: {
                options:{
                    client:false,
                    pretty:'\t'
                },
                files: [{
                    expand:true,
                    cwd:'source/jade/',
                    src:['*.jade'],
                    dest:'source/html/',
                    ext:'.html'
                }]
            }
		},
        sass: {
            compile: {
                files: [{
                    expand: true,
                    cwd: 'source/scss/',
                    src: ['*.scss'],
                    dest: 'source/css/',
                    ext: '.css'
                }]
            }
        },
        /*
        browserSync:{
            dev:{
                bsFiles:{
                    src:[
                        'source/css/*.css',
                        'source/html/*.html'
                    ]
                },
                options:{
                    watchTask:true,
                    server:'./source/html/'
                }
            }
        },*/
        watch: {
            jade: {
                files: ['source/jade/*.jade', 'source/layout/*.*', 'source/partial/*.*', 'source/include/*.*'],
                tasks: ['jade']
            },
            scss: {
                files: ['source/scss/*.scss'],
                tasks: ['sass']
            }
        }
	});

	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');	
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-browser-sync');


    grunt.registerTask('htmlize',['jade']);
    grunt.registerTask('watcher',['watch']);

    grunt.registerTask('css',['sass']);

	grunt.registerTask('lint',['csslint','jshint']);
	grunt.registerTask('build',['copy','useminPrepare','usemin','cssmin','uglify']);
	
};