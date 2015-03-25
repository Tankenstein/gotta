/**
 * This module handles showing the tasks.
 */
'use strict';

/**
 * Module dependencies
 */
var chalk = require('chalk');

/**
 * Checkmark unicode character
 * @type {String}
 */
var checkMark = '✔';

/**
 * Uncheck unicode character.
 * @type {String}
 */
var unCheckMark = '✗';

/**
 * Show tasks needed to do.
 * @param  {Array.<Task>} tasks Array of current tasks.
 */
var show = function(tasks) {
	var doneTasks = [];
	var doTasks = [];

	tasks.forEach(function(task) {
		if (task.done) {
			doneTasks.push(task);
		} else {
			doTasks.push(task);
		}
	});
		
	if (doTasks.length) {
		console.log('You gotta');

		doTasks.forEach(function(task) {
			console.log('  ' + chalk.red(unCheckMark + ' ' + task.name));
		});

		if (doneTasks.length) {
			doneTasks.forEach(function(doneTask) {
				console.log('  ' + chalk.green(checkMark + ' ' + chalk.strikethrough(doneTask.name)));
			});
		}

		console.log('\nGet to work!');
	} else {
		if (doneTasks.length) {
			console.log('You did');
			doneTasks.forEach(function(doneTask) {
				console.log('  ' + chalk.green(checkMark + ' ' + chalk.strikethrough(doneTask.name)));
			});
			console.log('');
		}
		console.log("You ain't gotta do " + chalk.green("nothin") + '.');
		console.log('Go on, get!');
	}
};

module.exports = show;