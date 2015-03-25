'use strict';

/**
 * Module dependencies
 */
var commander = require('commander');
var path = require('path');

/**
 * Package.json object.
 * @type {Object}
 */
var pkg = require( path.join(__dirname, '../package.json') );

/**
 * Require all of the functions used.
 */
var taskChanger = require('./taskChanger');
var show = require('./show');
var taskWriter = require('./taskWriter');

/**
 * Runs gotta with the specified arguments.
 * @param  {String} argv Arguments gotta is run with.
 */
var run = function(argv) {

	/**
	 * Read tasks.
	 */
	var tasks = taskWriter.parseTasks();

	/**
	 * Set up commander.
	 */
	commander
		.version(pkg.version);

	commander
		.command('do <task>')
		.description('Add a task you gotta do.')
		.action(function(task) {
			tasks = taskChanger.addTask(tasks, task);
		});

	commander
		.command('done <task>')
		.description('Mark a task as done.')
		.action(function(task) {
			tasks = taskChanger.removeTask(tasks, task);
		});

	commander
		.command('clear')
		.description("Remove tasks marked as done.")
		.action(function() {
			tasks = taskChanger.clearDoneTasks(tasks);
		});

	commander
		.command('what')
		.description('Show tasks you gotta do.')
		.action(function() {
			show(tasks);
		});

	commander.parse(argv);

	/**
	 * Write tasks.
	 */
	taskWriter.writeTasks(tasks);
};

module.exports = {
	run:run
};