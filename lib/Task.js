/**
 * Task object.
 * @param {String} taskName Name of the task.
 */
var Task = function(taskName) {
	if (typeof taskName == 'undefined') {
		throw "Task called without name error";
	}

	this.name = taskName;
	this.done = false;
	this.createdAt = Date.now();
};

module.exports = Task;