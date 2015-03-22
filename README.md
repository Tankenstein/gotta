gotta - A feisty, minimal command line todos manager.
-----------------------------------------------------

I sometimes feel like super quickly jutting down something i gotta do.
I'm in the terminal a lot, so i felt like i should be able to do that
in the terminal.

Installing
----------
```
npm install gotta -g
```
Maybe you gotta add sudo, maybe you don't.
Run
```
gotta --version
```
to see if it's installed.

If node starts throwing ENOACCESS errors, do the following:
* cd into your global node_modules folder
* cd into the gotta folder
* change permissions of tasks.json to 777, so on unix systems:
```
chmod 777 tasks.json
```

Usage
-----
```
gotta [options] [command]
```
Commands:
```
do <task>   Add a task you gotta do.
did <task>  Remove a task you did.
what        Show tasks you gotta do.
```
Options:
```
-h, --help     output usage information
-V, --version  output the version number
```
So for instance, if i gotta write some tests for gotta, i would go:
```
gotta do "write some tests for gotta"
```
Or do the laundry:
```
gotta do "the laundry"
```
Whatever you gotta do man.
Later, when i want to see what i gotta do, i would go:
```
gotta what
```
And if i did the laundry, i would go:
```
gotta did "laundry"
```
Removing a task doesn't need the full task, just a part of it.

Side note: gotta is awesome when you call it from .bashrc, to show what
you gotta do today.

Things i gotta add
------------------
A fancy user configuration utility, where you can specify what the commands
are and what sort of language to use.

Gotta should whine when you leave something not done for a while.

A special version of `gotta need` for when you're running it from .bashrc, 
aka when you want it to show anytime you log onto terminal.

If you have any more fun ideas, send them my way or make a pull request.

Screenshots
-----------
![Image of gotta in action.](http://i.imgur.com/c05bRGv.png)

License
-------
MIT

Contributors
------------
Seriously? i'm adding a contributors on this?

Uku Tammet