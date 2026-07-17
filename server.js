'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection (non-blocking — app starts even without MongoDB)
var db = null;
console.log('config.db.uri:', config.db.uri);
console.log('config.db.options:', config.db.options);

mongoose.connect(config.db.uri, config.db.options, function(err) {
	if (err) {
		console.error(chalk.yellow('⚠ MongoDB unavailable — running without database.'));
		console.log(chalk.yellow(err.message));
	} else {
		db = mongoose.connection;
		console.log(chalk.green('✓ MongoDB connected'));
	}
});

mongoose.connection.on('error', function(err) {
	console.error(chalk.yellow('MongoDB connection error: ' + err.message));
	// NO process.exit — keep running without DB
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
try { require('./config/passport')(); } catch(e) { console.log('Passport skipped (no DB)'); }

try { app.use(require('prerender-node').set('prerenderServiceUrl', 'http://service.prerender.io/')); } catch(e) {}

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.yellow('Database:\t\t\t' + (db ? 'connected' : 'unavailable (running without DB)')));
if (process.env.NODE_ENV === 'secure') {
	console.log(chalk.green('HTTPs:\t\t\t\ton'));
}
console.log('--');
