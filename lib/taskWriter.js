/**
 * This module handles reading and writing from the datafile.
 */
'use strict';

/**
 * Module dependencies
 */
var osenv = require('osenv');
var fs = require('fs');
var path = require('path');

var defaultDataPath = path.join(osenv.home(), '.gottadata');

/**
 * Parses tasks from file.
 * @param  {String}        dataFile Optional path to data file.
 * @return {Array.<Task>}           Parsed tasks.  
 */
var parseTasks = function(dataFile) {
	var dataPath = dataFile || defaultDataPath;
	var tasks = [];

	try {
		tasks = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
	} catch (error) {
		fs.writeFileSync( dataPath , '[]');
		tasks = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
	}

	return tasks;
};

/**
 * Writes tasks to file.
 * @param  {Array.<Task>} tasks    Tasks to write.
 * @param  {String}       dataFile Optional path to data file.
 */
var writeTasks = function(tasks, dataFile) {
	var dataPath = dataFile || defaultDataPath;
	fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
};

module.exports = {
	parseTasks: parseTasks,
	writeTasks: writeTasks
};