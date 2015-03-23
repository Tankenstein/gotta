#!/usr/bin/env node
/* jslint node:true */

/**
 * gotta - A feisty, minimal command line todos manager.
 *
 * Github repo: https://github.com/Tankenstein/gotta
 * Author: Uku Tammet
 * Version: 0.2.3
 */

'use strict';

var path = require('path');
var fs = require('fs');

/**
 * Set up dependencies.
 * Commander is used for command line arguments parsing.
 * Chalk is used for output styling.
 * osenv is used for getting platform-agnostic paths.
 */
var commander = require('commander');
var chalk = require('chalk');
var osenv = require('osenv');

/**
 * Package.json object.
 * @type {Object}
 */
var pkg = require( path.join(__dirname, 'package.json') );

/**
 * Get tasks file path.
 * @type {String}
 */
var tasksPath = path.join(osenv.home(), '.gottadata');

/**
 * Global tasks array.
 * @type {Array.<Task>}
 */
var tasks;

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
 * One day in milliseconds.
 * @type {Number}
 */
var day = 86400000;

/**
 * Try to read tasks, creating a file if no file found.
 */
try {
	tasks = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
} catch (error) {
	fs.writeFileSync( tasksPath , '[]');
	tasks = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
}

/**
 * Task object.
 * @param {String} taskName Name of the task.
 */
var Task = function(taskName) {
	this.name = taskName;
	this.done = false;
	this.createdAt = Date.now();
};

/**
 * Add a task to tasks.
 * @param {String} taskName The name of the task to add.
 */
var addTask = function(taskName) {
	var found = false;
	var doneIndexes = [];

	tasks.forEach(function(task, index) {
		if (task.name.toLowerCase().indexOf(taskName.toLowerCase()) != -1) {
			if (task.done) {
				doneIndexes.push(index);
			} else {
				console.log('You already gotta ' + chalk.red(task.name) + '!');
			}
			found = true;
		}
	});

	if (doneIndexes.length > 1) {
		console.log('We found ' + doneIndexes.length + ' done tasks that match ' + chalk.red(taskName));
		doneIndexes.forEach(function(doneIndex) {
			console.log('  ' + chalk.red(tasks[doneIndex].name));
		});
		console.log('\nPlease specify which one you want to readd.');
	} else if (doneIndexes.length === 1) {
		var task = tasks[doneIndexes[0]];
		console.log('Readded ' + chalk.green(task.name) + '!');
		task.done = false;
	} else if (!found) {
		var task = new Task(taskName);
		tasks.push(task);
		console.log('You gotta ' + chalk.green(taskName) + '!');
	}
};

/**
 * Remove a task from tasks.
 * @param {String} taskNamePart A part of the name of the todo to remove. 
 */
var removeTask = function(taskNamePart) {

	var found = 0;
	var doneIndexes = [];
	var removeTask = taskNamePart.toLowerCase();

	tasks.forEach(function(task, index) {
		if (!task.done) {
			var taskName = task.name.toLowerCase();
			if (taskName.indexOf(removeTask) != -1) {
				doneIndexes.push(index);
			}
		}
	});

	if (doneIndexes.length === 1){
		var doneTask = tasks[doneIndexes[0]];
		console.log('Nice! you did: ' + chalk.green(doneTask.name));
		doneTask.done = true;
	} else if (doneIndexes.length > 1) { 
		console.log('We found ' + doneIndexes.length + ' done tasks that match ' + chalk.red(taskNamePart) );
		doneIndexes.forEach(function(doneIndex) {
			console.log('  ' + chalk.red(tasks[doneIndex].name));
		});
		console.log('\nPlease specify which one you want to mark as done.');
	} else if (!doneIndexes.length) {
		console.log("Didn't find anything like " + chalk.red(taskNamePart) + ' that you gotta do.');
	}
};


/**
 * Removes all tasks marked as done.
 */
var clear = function() {
	var removeCount = 0;
	var doneIndexes = [];
	var i = 0;
	
	while (true){
		if (i >= tasks.length) {
			break;
		}

		if (tasks[i].done) {
			tasks.splice(i, 1);
			removeCount += 1;
			i = -1;
		}

		i += 1;
	}

	if (removeCount > 1) {
		console.log('Removed ' + chalk.green(removeCount) + ' tasks.');
	} else if (removeCount === 1) {
		console.log('Removed ' + chalk.green(removeCount) + ' task.');
	} else {
		console.log("You haven't done " + chalk.red('any') + ' tasks.');
	}
};

/**
 * Show tasks needed to do.
 */
var show = function() {
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

/**
 * Set up commander.
 */
commander
	.version(pkg.version);

commander
	.command('do <task>')
	.description('Add a task you gotta do.')
	.action(function(task) {
		addTask(task);
	});

commander
	.command('done <task>')
	.description('Mark a task as done.')
	.action(function(task) {
		removeTask(task);
	});

commander
	.command('clear')
	.description("Remove tasks marked as done.")
	.action(function() {
		clear();
	});

commander
	.command('what')
	.description('Show tasks you gotta do.')
	.action(function() {
		show();
	});

commander.parse(process.argv);

/**
 * If no arguments passed to gotta, output help. 
 */
if (!process.argv.slice(2).length) {
	commander.help();
}

/**
 * Write tasks to file.
 */
fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));