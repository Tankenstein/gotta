#!/usr/bin/env node
/* jslint node:true */
'use strict';

var path = require('path');
var fs = require('fs');

var commander = require('commander');
var colors = require('colors');

var pkg = require( path.join(__dirname, 'package.json') );

var tasks;

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
 * @param {string} taskName Name of the task.
 */
var Task = function(taskName) {
	this.name = taskName;
	this.createdAt = Date.now();
};

/**
 * Add a task to tasks.
 * @param {string} taskName The name of the task to add.
 */
var addTask = function(taskName) {
	var task = new Task(taskName);
	tasks.push(task);
	console.log('You gotta ' + taskName.green + '!');
};

/**
 * Remove a task from tasks.
 * @param {string} taskNamePart A part of the name of the todo to remove. 
 */
var removeTask = function(taskNamePart) {

	var found = false;
	var removeTask = taskNamePart.toLowerCase();
	tasks.forEach(function(task, index) {
		var taskName = task.name.toLowerCase();
		if (taskName.indexOf(removeTask) != -1) {
			console.log('Nice! you did: ' + tasks[index].name.green);
			tasks.splice(index, 1);
			found = true;
		}
	});
	if (!found) {
		console.log("Didn't find anything like " + taskNamePart.red + ' that you gotta do.');
	}
};

/**
 * Show tasks needed to do.
 */
var show = function() {
	if (tasks.length) {
		console.log('You gotta');
		tasks.forEach(function(task) {
			console.log('    ' + task.name.green);
		});
		console.log('\nGet to work!');
	} else {
		console.log("You ain't gotta do " + "nothin".green + '.');
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
	.command('did <task>')
	.description('Remove a task you did.')
	.action(function(task) {
		removeTask(task);
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