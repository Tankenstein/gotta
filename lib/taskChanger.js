/**
 * This module handles changing tasks.
 */
'use strict';

/**
 * Module dependencies
 */
var chalk = require('chalk');
var Task = require('./Task');

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
 * Remove a task from tasks.
 * @param {Array.<Task>} tasks         Current tasks.
 * @param {String}       taskNamePart  A part of the name of the task to remove.
 * @return {Array.<Task>}              New tasks. 
 */
var removeTask = function(tasks, taskNamePart) {

	if (typeof tasks == 'undefined') {
		throw "removeTask called without tasks error";
	}

	var found = 0;
	var doneIndexes = [];
	var definedTaskName = taskNamePart || "";
	var taskToRemove = definedTaskName.toLowerCase();

	tasks.forEach(function(task, index) {
		if (!task.done) {
			var taskName = task.name.toLowerCase();
			if (taskName.indexOf(taskToRemove) != -1) {
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

	return tasks;
};

/**
 * Add a task to tasks.
 * @param {Array.<Task>} tasks    Current tasks.
 * @param {String}       taskName The name of the task to add.
 * @return {Array.<Task>}         New tasks.
 */
var addTask = function(tasks, taskName) {

	if (typeof tasks == 'undefined') {
		throw 'addTask called without tasks error'; 
	}

	if (typeof taskName == 'undefined') {
		throw 'addTask called without taskName error';
	}

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

	return tasks;
};

/**
 * Removes tasks that are done.
 * @param  {Array.<Task>} tasks Tasks array.
 * @return {Array.<Task>}       Tasks array with removed tasks.
 */
var clearDoneTasks = function(tasks) {
	
	if (typeof tasks == 'undefined') {
		throw 'clearDoneTasks called without tasks error'; 
	}

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

	return tasks;
};

module.exports = {
	removeTask: removeTask,
	addTask: addTask,
	clearDoneTasks: clearDoneTasks
};