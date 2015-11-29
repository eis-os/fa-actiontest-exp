
module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		
		webfont: {
			icons: {
				src: ['build/svg_icons/*.svg', 'build/svg_actions_nowidth/*.svg'],
				dest: 'public/',
				destCss: 'public/',
				options: {
					engine: 'node',
					font: 'fa-actiontest-exp',
					types: 'eot,woff,ttf,svg',
					fontHeight: 1000,
					template: 'src/template/fa-test.css',
					htmlDemoTemplate: 'src/template/demo.html',
					templateOptions: {
						baseClass: 'fa',
						classPrefix: 'fa-',
						mixinPrefix: 'fa-'
					}
				}
			}
		},
		replace: {
			fontaweactions: {
				options: {
					patterns: [
						{
							match: /width\=\"500\"/i,
							replacement: 'width="2"'
						}
					]
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: 'build/svg_actions/',
					src: ['*.svg'], 
					dest: 'build/svg_actions_nowidth/'
				}]
			}
		},
		svgmin: {
			fontaweclean: {
				options: grunt.file.readYAML('src/dump.svgo.yml'),
				files: [{
					expand: true,
					cwd: 'build/raw/',
					src: ['*.svg'],
					dest: 'build/svg_clean/'
				}]
			},
			fontaweicons: {
				options: grunt.file.readYAML('src/createicons.svgo.yml'),
				files: [{
					expand: true,
					cwd: 'build/svg_clean/',
					src: ['*.svg'],
					dest: 'build/svg_icons/'
				}]
			},
			fontaweactions: {
				options: grunt.file.readYAML('src/createactions.svgo.yml'),
				files: [{
					expand: true,
					cwd: 'build/svg_clean/',
					src: grunt.file.readYAML('src/toactionlist.yml'),
					//['*.svg'],
					dest: 'build/svg_actions/',
					rename: function(dest, matchedSrcPath, options) {
						// return the destination path and filename:
						return (dest + matchedSrcPath).replace(/\/([A-Za-z0-9_-]+).svg$/, '/action-$1.svg');
					}
				}]
			}
		},
		webfont_svg_extractor: {
			fontawe: {
				options: {
					fontPath: "deps/fontawesome-webfont.svg",
					cssPath: "deps/font-awesome.css",
					outputDir: "build/raw/",
					preset: 'fontawesome'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-webfont-svg-extractor');
	
	grunt.registerTask('font-awesome-decode', ['webfont_svg_extractor:fontawe', 'svgmin:fontaweclean']);
	grunt.registerTask('font-awesome-icons', ['svgmin:fontaweicons']);
	grunt.registerTask('font-awesome-actions', ['svgmin:fontaweactions', 'replace:fontaweactions']);
	grunt.registerTask('default', ['font-awesome-decode', 'font-awesome-icons', 'font-awesome-actions', 'webfont']);
	
};
