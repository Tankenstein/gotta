'use strict';

/**
 * Module dependencies
 */
var commander = require('commander');

/**
 * Package.json object.
 * @type {Object}
 */
var pkg = require( path.join(__dirname, '../package.json') );

/**
 * Require all of the functions used.
 */
var addTask = require('./addTask');
var removeTask = require('./removeTask');
var clear = require('./clear');
var show = require('./show');
var taskWriter = require('./taskWriter');

/**
 * Runs gotta with the specified arguments.
 * @param  {String} argv Arguments gotta is run with.
 */
var run = function(argv) {
	var tasks = [];

	/**
	 * Set up commander.
	 */
	commander
		.version(pkg.version);

	commander
		.command('do <task>')
		.description('Add a task you gotta do.')
		.action(function(task) {
			tasks = addTask(tasks, task);
		});

	commander
		.command('done <task>')
		.description('Mark a task as done.')
		.action(function(task) {
			tasks = removeTask(tasks, task);
		});

	commander
		.command('clear')
		.description("Remove tasks marked as done.")
		.action(function() {
			tasks = clear(tasks);
		});

	commander
		.command('what')
		.description('Show tasks you gotta do.')
		.action(function() {
			show(tasks);
		});

	commander.parse(argv);
};

module.exports = run;