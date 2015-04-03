var oldConsole = console.log;
var enableConsole = function(doEnable) {
	if (doEnable) {
		console.log = oldConsole;
	} else {
		console.log = function(){};
	}
};

var disableConsole = function(fun) {
	enableConsole(false);
	fun();
	enableConsole(true);
};

module.exports = {
	disableConsole: disableConsole
};