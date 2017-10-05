module.exports = function(grunt) {

	grunt.initConfig({
		jshint:{
			all:['en/js/main.js']
		},
		uglify:{
			build:{
				options:{
					banner:'/*This has been created using grunt*/\n'
				},
				files:{
					'build/en/js/main.min.js':['en/js/main.js']
					
				}
			}
		},
		cssmin:{
			minify:{
				files:{
					'build/en/css/common.min.css':['en/css/common.css']
				}
			}
		},
		csslint:{
			strict:{
				options:{
					'import':2,
					'ids':false,
					'important':false,
					'adjoining-classes':false,
					'box-model':false
				},
				src:['en/css/common.css','en/css/homepage.css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.registerTask('default',['jshint','uglify','cssmin','cslint']);
};