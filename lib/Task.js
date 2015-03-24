/**
 * Task object.
 * @param {String} taskName Name of the task.
 */
var Task = function(taskName) {
	this.name = taskName;
	this.done = false;
	this.createdAt = Date.now();
};

module.exports = task;