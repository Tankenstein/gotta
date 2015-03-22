#!/usr/bin/env node
/* jslint node:true */
'use strict';

/**
 * Set up dependencies.
 */
var path = require('path');
var fs = require('fs');

var commander = require('commander');
var chalk = require('chalk');

/**
 * Package.json object.
 * @type {Object}
 */
var pkg = require( path.join(__dirname, 'package.json') );

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
 * Try to parse gotta tasks file, if fails, create new one.
 */
try {
	tasks = require( path.join(__dirname, 'tasks.json') );
} catch (error) {
	fs.writeFileSync( 'tasks.json' , '[]');
	tasks = require( path.join(__dirname, 'tasks.json') );
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
	var task = new Task(taskName);
	tasks.push(task);
	console.log('You gotta ' + chalk.green(taskName) + '!');
};

/**
 * Remove a task from tasks.
 * @param {String} taskNamePart A part of the name of the todo to remove. 
 */
var removeTask = function(taskNamePart) {

	var found = false;
	var removeTask = taskNamePart.toLowerCase();
	tasks.forEach(function(task, index) {
		var taskName = task.name.toLowerCase();
		if (taskName.indexOf(removeTask) != -1) {
			console.log('Nice! you did: ' + chalk.green(tasks[index].name));
			tasks[index].done = true;
			found = true;
		}
	});
	if (!found) {
		console.log("Didn't find anything like " + chalk.red(taskNamePart) + ' that you gotta do.');
	}
};


/**
 * Removes all tasks marked as done
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
			i = 0;
		}

		i += 1;
	}

	if (removeCount) {
		console.log('Removed ' + chalk.green(removeCount) + ' tasks.');
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

if (!process.argv.slice(2).length) {
	commander.help();
}

/**
 * Write tasks to file.
 */
fs.writeFileSync(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2));