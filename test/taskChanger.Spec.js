var expect = require('chai').expect;
var Task = require('../lib/Task');
var taskChanger = require('../lib/taskChanger');
var addTask = taskChanger.addTask;
var removeTask = taskChanger.removeTask;
var clearDoneTasks = taskChanger.clearDoneTasks;

describe('addTask', function() {

	it('requires tasks to be given to it', function() {
		var failTask = function() {
			addTask();
		};

		expect(addTask).to.throw(/without tasks/);
	});

	it('adds a task to tasks', function() {
		var task1 = 'Task name 1';
		var task2 = 'Task name 2';
		var tasks = [];

		tasks = addTask(tasks, task1);
		expect(tasks.length).to.equal(1);
		expect(tasks[0].name).to.equal(task1);

		var tasks = addTask(tasks, task2);
		expect(tasks.length).to.equal(2);
	});

	it('readds done tasks', function() {
		var task = 'Task name';
		var tasks = [];

		tasks = addTask(tasks, task);
		expect(tasks.length).to.equal(1);
		expect(tasks[0].done).not.to.be.ok;

		tasks[0].done = true;
		tasks = addTask(tasks, task);
		expect(tasks.length).to.equal(1);
		expect(tasks[0].done).not.to.be.ok;
	});

	it('does not readd done tasks if task name matches multiple', function() {
		var task1 = 'Task name 1';
		var task2 = 'Task name 2';
		var tasks = [];

		tasks = addTask(tasks, task1);
		tasks = addTask(tasks, task2);

		tasks[0].done = true;
		tasks[1].done = true;

		tasks = addTask(tasks, 'task');
		expect(tasks[0].done).to.be.ok;
		expect(tasks[1].done).to.be.ok;
	});
});

describe('removeTask', function() {

});

describe('clearDoneTasks', function() {

});