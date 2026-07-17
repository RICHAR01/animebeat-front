'use strict';

module.exports = {
	db: {
		uri: 'mongodb://user:password@ds017173.mlab.com:17173/heroku_n4g1cmmx',
		options: {
			user: '',
			pass: '',
		},
	},
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
				/* 'public/lib/perfect-scrollbar/min/perfect-scrollbar.min.css', */
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
				// 'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',

				'public/lib/angular-materialize/src/angular-materialize.js',
				'public/lib/materialize/dist/js/materialize.min.js',

				/* 'public/lib/perfect-scrollbar/min/perfect-scrollbar.min.js', */
				//perfect-scrollbar/min/perfect-scrollbar.with-mousewheel.min.js NOT FOUND
				/* 'public/lib/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js', */

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
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js',
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback',
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback',
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback',
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback',
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback',
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD',
			},
		},
	},
};
