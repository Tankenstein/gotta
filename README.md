gotta - A feisty, minimal command line todos manager.
=====================================================

I sometimes feel like super quickly jutting down something i gotta do.
I'm in the terminal a lot, so i felt like i should be able to do that
in the terminal.

Installing
----------
```
$ npm install gotta -g
```
Maybe you gotta add sudo, maybe you don't.
Run
```
$ gotta --version
```
to see if it's installed.

Gotta puts a .gottadata file in your home directory.

Screenshots
-----------
![Image of gotta in action.](http://i.imgur.com/wP5kfQt.png)

Usage
-----
```
$ gotta [options] [command]
```
Commands:
```
do <task>    Add a task you gotta do.
done <task>  Mark a task as done.
clear        Remove tasks marked as done.
what         Show tasks you gotta do.
```
Options:
```
-h, --help     output usage information
-V, --version  output the version number
```
So for instance, if i gotta write some tests for gotta, i would go:
```
$ gotta do "write some tests for gotta"
```
Or do the laundry:
```
$ gotta do "the laundry"
```
Whatever you gotta do man.
Later, when i want to see what i gotta do, i would go:
```
$ gotta what
```
And if the laundry's done, i would go:
```
$ gotta done "laundry"
```
Removing a task doesn't need the full task, just a part of it.
Now if i want to clear my done tasks, i would go:
```
$ gotta clear
```

Side note: gotta is awesome when you call it from .bashrc, to show what
you gotta do today.

Things i gotta add
------------------
A fancy user configuration utility, where you can specify what the commands
are and what sort of language to use.

Gotta should whine when you leave something not done for a while.

A special version of `gotta what` for when you're running it from .bashrc, 
aka when you want it to show anytime you log onto terminal.

If you have any more fun ideas, send them my way or make a pull request.

License
-------
Copyright (c) 2015 Uku Tammet

Licensed under MIT.