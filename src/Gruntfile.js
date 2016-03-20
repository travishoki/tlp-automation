/*
1) Install all dependant libraries:
npm install grunt;
npm install grunt-contrib-less --save-dev;
npm install grunt-contrib-watch --save-dev;

2) Run the compiler:
grunt watch

*/
module.exports = function(grunt) {

	//Load Tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//Compile LESS to CSS
		less: {
			css: {
				src: ['css/main.less'],
				dest: '../style.css'
			}
		},

		//Live Reload
		watch: {
			src: {
		        files: [
		        	'css/*.less',
		        	'css/*/*.less'
		        ],
		        tasks: ['less'],
		        options: {
		          livereload: true
				}
			}
		}
	});

	//Default task
	grunt.registerTask('default', ['less']);
};