'use strict';

module.exports = {
	app: {
		title: 'AnimeBeat',
		description: 'Anime Online Sub Español HD',
		keywords:
			'anime, online, descarga, sub, español, one piece, naruto, fairy tail',
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'MEAN',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions',
	// The session cookie settings
	sessionCookie: {
		path: '/',
		httpOnly: true,
		// If secure is set to true then it will cause the cookie to be set
		// only when SSL-enabled (HTTPS) is used, and otherwise it won't
		// set a cookie. 'true' is recommended yet it requires the above
		// mentioned pre-requisite.
		secure: false,
		// Only set the maxAge to null if the cookie shouldn't be expired
		// at all. The cookie will expunge when the browser is closed.
		maxAge: null,
		// To set the cookie in a specific domain uncomment the following
		// setting:
		// domain: 'yourdomain.com'
	},
	// The session cookie name
	sessionName: 'connect.sid',
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log',
		},
	},
	assets: {
		lib: {
			css: [
				'public/lib/materialize/dist/css/materialize.min.css',
				'public/lib/material-design-icons/iconfont/material-icons.css',
				/* 'public/lib/perfect-scrollbar/css/perfect-scrollbar.min.css', */
				'public/lib/isteven-angular-multiselect/isteven-multi-select.css',
				'public/lib/video.js/dist/video-js.min.css',
				'public/lib/owl.carousel/dist/assets/owl.carousel.css',
				'public/lib/owl.carousel/dist/assets/owl.theme.default.css',
				'public/lib/medium-editor/dist/css/medium-editor.min.css',
				'public/lib/medium-editor/dist/css/themes/default.css',
				'public/lib/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css',
				'public/lib/angular-loading-bar/src/loading-bar.css',
			],
			js: [
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',

				'public/lib/angular-materialize/src/angular-materialize.js',
				'public/lib/materialize/dist/js/materialize.min.js',

				/* 'public/lib/perfect-scrollbar/js/perfect-scrollbar.min.js', */

				'public/lib/underscore/underscore-min.js',
				'public/lib/angular-paging/dist/paging.min.js',
				'public/lib/isteven-angular-multiselect/isteven-multi-select.js',
				'public/lib/angular-local-storage/dist/angular-local-storage.js',
				'public/lib/video.js/dist/video.min.js',
				'public/lib/vjs-video/dist/vjs-video.min.js',
				'public/lib/owl.carousel/dist/owl.carousel.min.js',
				/* 'public/lib/angular-owl-carousel-directive/dist/angular-owl-carousel-directive.min.js', */

				'public/lib/medium-editor/dist/js/medium-editor.min.js',
				'public/lib/angular-medium-editor/dist/angular-medium-editor.min.js',
				'public/lib/handlebars/handlebars.runtime.min.js',
				'public/lib/jquery-sortable/source/js/jquery-sortable-min.js',
				'public/lib/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
				'public/lib/blueimp-file-upload/js/jquery.iframe-transport.js',
				'public/lib/blueimp-file-upload/js/jquery.fileupload.js',
				'public/lib/medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.min.js',
				'public/lib/moment/moment.js',
				'public/lib/moment/locale/es.js',
				'public/lib/angular-moment/angular-moment.min.js',
				'public/lib/angular-loading-bar/src/loading-bar.js',
				'public/lib/angularjs-social-login/angularjs-social-login.js',
			],
		},
		css: ['public/modules/**/css/*.css'],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js',
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js',
		],
	},
};
