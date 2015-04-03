var expect = require('chai').expect;
var Task = require('../lib/Task');
var taskChanger = require('../lib/taskChanger');
var addTask = taskChanger.addTask;
var removeTask = taskChanger.removeTask;
var clearDoneTasks = taskChanger.clearDoneTasks;

var disableConsole = require('./testUtils').disableConsole;

describe('addTask', function() {

	it('requires tasks to be given to it', function() {
		var failTask = function() {
			addTask();
		};

		expect(addTask).to.throw(/without tasks/);
	});

	it('adds a task to tasks', function() {
		disableConsole(function() {
			var task1 = 'Task name 1';
			var task2 = 'Task name 2';
			var tasks = [];

			tasks = addTask(tasks, task1);
			expect(tasks.length).to.equal(1);
			expect(tasks[0].name).to.equal(task1);

			var tasks = addTask(tasks, task2);
			
			expect(tasks.length).to.equal(2);
		});
	});

	it('readds done tasks', function() {
		disableConsole(function() {	
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
	});

	it('does not readd done tasks if task name matches multiple', function() {
		disableConsole(function() {
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
});

describe('removeTask', function() {
	it('requires tasks to be given to it', function() {
		var failTask = function() {
			removeTask();
		};

		expect(failTask).to.throw(/without tasks/);
	});

	it('marks tasks as done', function() {
		disableConsole(function() {
			var task1 = 'Task name 1';
			var task2 = 'Task name 2';
			var tasks = [];

			tasks = addTask(tasks, task1);
			tasks = addTask(tasks, task2);

			expect(tasks.length).to.equal(2);

			tasks = removeTask(tasks, task1);

			tasks.forEach(function(task){
				if (task.name == task1) {
					expect(task.done).to.be.ok;
				} else {
					expect(task.done).not.to.be.ok;
				}
			});
		});
	});

	it('does not remove tasks if taskname matches multiple', function() {
		disableConsole(function() {
			var task1 = 'Task name 1';
			var task2 = 'Task name 2';
			var tasks = [];

			tasks = addTask(tasks, task1);
			tasks = addTask(tasks, task2);

			expect(tasks.length).to.equal(2);

			tasks = removeTask(tasks, 'task');

			expect(tasks.length).to.equal(2);

			tasks.forEach(function(task){
				expect(task.done).to.not.be.ok;
			});
		});
	});
});

describe('clearDoneTasks', function() {

	it('requires tasks to be given to it', function() {
		var failTask = function() {
			clearDoneTasks();
		};

		expect(failTask).to.throw(/without tasks/);
	});

	it('removes tasks that are done', function() {
		disableConsole(function() {
			var task1 = 'Task name 1';
			var task2 = 'Task name 2';
			var tasks = [];

			tasks = addTask(tasks, task1);
			tasks = addTask(tasks, task2);

			expect(tasks.length).to.equal(2);

			tasks = removeTask(tasks, task1);

			tasks = clearDoneTasks(tasks);

			expect(tasks.length).to.equal(1);
			expect(tasks[0].name).to.equal(task2);
		});
	});
});